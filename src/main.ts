import { connectToServer } from './socket-client'
import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websocket - Client</h1>
    <input id="jwtToken" placeholder="jwtToken" type="text" />
    <button id="btn-connect">Connect</button>
    <br />
    <span id="server-status">offline</span>

    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input placeholder="message" type="text" id="message-input" />
      <button type="submit">Send</button
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`

// connectToServer();
// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const inputJwtToken = document.querySelector<HTMLInputElement>('#jwtToken')!;
const connectButton = document.querySelector<HTMLButtonElement>('#btn-connect')!;

connectButton.addEventListener('click', () => {
  const jwtToken = inputJwtToken.value;

  if (jwtToken.trim().length <= 0) return alert('Please enter a jwtToken');

  connectToServer(jwtToken);
});
