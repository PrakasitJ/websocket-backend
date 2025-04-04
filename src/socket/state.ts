import { Socket } from 'socket.io';

export interface UserData {
  socket: Socket;
  username: string;
}

export interface RoomData {
  users: Map<string, UserData>;
}

export const state = {
  users: new Map<string, UserData>(),
  rooms: new Map<string, RoomData>()
}; 