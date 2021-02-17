async function fetchChatMessages() {
    const container = document.querySelector('#chat-messages');
    container.innerHTML = '<p>Loading...</p>';

    const response = await fetch('/chats/456');
    const messages = await response.json();
    container.innerHTML = '';

    for (const message of messages) {
        const element = document.createElement('p');
        element.innerText = message;
        container.appendChild(element);
    }
}

async function addChatMessage() {
    const textInput = document.querySelector('#chat-form-message');
    await fetch('/chats/456', {
        method: 'post',
        body: JSON.stringify({
            message: textInput.value,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    textInput.value = '';
    await fetchChatMessages();
}

window.addEventListener('load', fetchChatMessages);
document.querySelector('#chat-form').addEventListener('submit', event => {
    event.preventDefault();
    addChatMessage();
});

window.addEventListener('load', () => {
    const socket = io();
    socket.on('connect', () => {
        socket.emit('join', {id: '456'});
    });
    socket.on('refresh', () => {
        fetchChatMessages();
    });
});
