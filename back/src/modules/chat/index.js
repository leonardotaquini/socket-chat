import { Server } from "socket.io";
import ChatController from "./chatController.js";
import ChatService from "./chatService.js";


export default (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    const chatService = new ChatService();
    const chatController = new ChatController(io, chatService);

    //Configura las interacciones de WebSocket
    io.on('connection', chatController.onConnection.bind(chatController));
};