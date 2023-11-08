class ChatService {
    constructor() {
        this.messages = [];
    }

    // Agrega un nuevo mensaje al registro de mensajes
    addMessage(username, message) {
        this.messages.push({ username, message });
    }

    //Obtiene todos los mensajes almacenados
    getMessages(){
        return this.messages;
    }
}

export default ChatService;