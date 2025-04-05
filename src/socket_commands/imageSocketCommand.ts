import { Socket } from "socket.io";
import { Message } from "../types";
import { getUsername } from "../utils/params";
import { ImageListenerEvent, ImageEmitterEvent } from "../socket/event";

export function ListenOnGetImageRequest({ socket }: { socket: Socket }) {
    socket.on(ImageListenerEvent.GET_IMAGE_REQUEST, async ({ image_url }: { image_url: string }) => {
        responseGetImageRequest({ socket, image_url });
    });
}

export function ListenOnUploadImage({ socket }: { socket: Socket }) {
    socket.on(ImageListenerEvent.UPLOAD_IMAGE, async ({ image_url }: { image_url: string }) => {
        responseUploadImage({ socket, image_url });
    });
}

export function responseGetImageRequest({ socket, image_url }: { socket: Socket, image_url: string }) {
    socket.emit(ImageEmitterEvent.GET_IMAGE_RESPONSE, {
        content: image_url,
        sender: getUsername(socket),
        timestamp: new Date().toISOString()
    } as Message);
}   

export function responseUploadImage({ socket, image_url }: { socket: Socket, image_url: string }) {
    socket.emit(ImageEmitterEvent.UPLOAD_IMAGE_RESPONSE, {
        content: image_url,
        sender: getUsername(socket),
        timestamp: new Date().toISOString()
    } as Message);
}