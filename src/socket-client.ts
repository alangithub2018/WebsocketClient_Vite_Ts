import { Manager, Socket } from "socket.io-client";

let socket: Socket;

export const connectToServer = (token: string) => {
    // http://localhost:3000/socket.io/socket.io.js
    const manager = new Manager("http://localhost:3000/socket.io/socket.io.js", {
        extraHeaders: {
            Authorization: `${token}`
        }
    });

    socket?.removeAllListeners();
    socket = manager.socket('/');

    // console.log({socket});

    addListeners();

}

const addListeners = () => {
    const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;
    const clientsUl = document.querySelector<HTMLUListElement>('#clients-ul')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;

    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    // emit is used to send events to the server
 
    // on is used to listen to events from the server
    socket.on('connect', () => {
        serverStatusLabel.innerText = 'online';
    });

    socket.on('disconnect', () => {
        serverStatusLabel.innerText = 'offline';
    });

    socket.on('clients-updated', (clients: string[]) => {
        clientsUl.innerHTML = '';
        clients.forEach(client => {
            const li = document.createElement('li');
            li.innerText = client;
            clientsUl.appendChild(li);
        });
    });

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // evaluates the value of the input field
        if (messageInput.value.trim().length <= 0) return;

        // console.log({id: 'Yo!!', message: messageInput.value});

        const message = messageInput.value;
        socket.emit('message-from-client', {
            id: 'Yo!!',
            message
        });
        messageInput.value = '';
    });

    socket.on('message-from-server', (payload: { fullName: string, message: string }) => {
        const newMessage = `
            <li>
                <strong>${payload.fullName}</strong> 
                <strong>${payload.message}</strong>
            </li>`;

        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.appendChild(li);
    });
}