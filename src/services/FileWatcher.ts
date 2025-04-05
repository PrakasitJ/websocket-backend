import chokidar, { FSWatcher } from 'chokidar';
import { WebSocketServer } from '../core/WebSocketServer';
import { FilePayload } from '../types';
import { existsSync, mkdirSync } from 'fs';

export class FileWatcher {
  private static instance: FileWatcher;
  private watcher: FSWatcher;
  private wsServer: WebSocketServer;
  private isWatching: boolean = false;
  private readonly watchPath: string = 'src';
  private readonly ignorePatterns: string[] = [
    '**/node_modules/**',
    '**/.git/**',
    '**/dist/**',
    '**/build/**',
    '**/coverage/**',
    '**/*.log',
    '**/*.tmp',
    '**/*.swp',
    '**/.*',
    '**/package-lock.json',
    '**/yarn.lock',
    '**/bun.lockb'
  ];

  private constructor() {
    console.log('Initializing FileWatcher...');
    this.wsServer = WebSocketServer.getInstance();
    
    // Ensure the directory exists
    if (!existsSync(this.watchPath)) {
      console.log(`Creating directory: ${this.watchPath}`);
      mkdirSync(this.watchPath, { recursive: true });
    }

    console.log(`Watching directory: ${this.watchPath}`);
    this.watcher = chokidar.watch(this.watchPath, {
      ignored: this.ignorePatterns,
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100
      }
    });

    this.setupWatcher();
  }

  public static getInstance(): FileWatcher {
    if (!FileWatcher.instance) {
      FileWatcher.instance = new FileWatcher();
    }
    return FileWatcher.instance;
  }

  private setupWatcher(): void {
    console.log('Setting up file watcher...');
    console.log('Ignoring patterns:', this.ignorePatterns);
    
    // File added
    this.watcher.on('add', (path: string) => {
      console.log(`File added: ${path}`);
      this.notifyClients('add', path);
      throw new Error('File added');
    });

    // File changed
    this.watcher.on('change', (path: string) => {
      console.log(`File changed: ${path}`);
      this.notifyClients('change', path);
      throw new Error('File changed');
    });

    // File deleted
    this.watcher.on('unlink', (path: string) => {
      console.log(`File deleted: ${path}`);
      this.notifyClients('delete', path);
      throw new Error('File deleted');
    });

    // Directory added
    this.watcher.on('addDir', (path: string) => {
      console.log(`Directory added: ${path}`);
      throw new Error('Directory added');
    });

    // Directory deleted
    this.watcher.on('unlinkDir', (path: string) => {
      console.log(`Directory deleted: ${path}`);
      throw new Error('Directory deleted');
    });

    // Error handling
    this.watcher.on('error', (err: unknown) => {
      console.error('File watcher error:', err);
    });

    // Ready event
    this.watcher.on('ready', () => {
      console.log('File watcher is ready and watching:', this.watcher.getWatched());
      this.isWatching = true;
    });
  }

  private notifyClients(event: string, path: string): void {
    const fileName = path.split('/').pop() || '';
    const filePayload: FilePayload = {
      message: `File ${event}ed`,
      file_name: fileName,
      original_file_name: fileName,
      file_type: 'unknown',
      file_path: path
    };

    try {
      console.log(`Notifying clients about ${event} event for file: ${path}`);
      this.wsServer.getIO().emit('file_event', {
        event,
        ...filePayload
      });
    } catch (error) {
      console.error('Error notifying clients:', error);
    }
  }

  public start(): void {
    if (!this.isWatching) {
      console.log('Starting file watcher...');
      console.log('Current watched paths:', this.watcher.getWatched());
    } else {
      console.log('File watcher is already running');
    }
  }

  public stop(): void {
    try {
      console.log('Stopping file watcher...');
      this.watcher.close();
      this.isWatching = false;
      console.log('File watcher stopped');
    } catch (error) {
      console.error('Error stopping file watcher:', error);
    }
  }
} 