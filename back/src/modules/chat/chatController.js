import { Server } from "socket.io";

class ChatController {
    constructor(io) {
        this.io = io;
        this.messages = [];
    }

    onConnection(socket) {

        console.log("new user connected");
        
        socket.on('new-message', (data) => {
            const { username, message } = data;
            this.messages.push({ username, message });
            this.io.emit('new-message', { username, message });
        });


        socket.on('get-messages', () => {
            socket.emit('messages', this.messages);
        });

        socket.on('set-username', (username) => {
            socket.username = username;
            socket.emit('username', socket.username);
        });

        socket.on('typing', (data) => {
            socket.broadcast.emit('typing', socket.username);
        });

        socket.on('disconnect', () => {
            console.log("user disconnected");
        });
    }
}

export default ChatController;