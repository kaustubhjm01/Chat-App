const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector(".chat-messages");

//  get UserName and room from URL
const {username,room} = Qs.parse(location.search, {
    ignoreQueryPrefix : true
});

// console.log(username, room);


const socket = io();
// join chatroom

socket.emit("joinRoom", {username,room});
// Message from server
socket.on('message', message=>{
    console.log("Message is " +message);
    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit',(e)=>{

    e.preventDefault();
    // get message text
    const msg = e.target.elements.msg.value;
    // Emit message to server
    socket.emit('chatMessage',msg);
    // console.log(msg);

    // clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
    
})

function outputMessage(message){
    const div = document.createElement("div");
    div.classList.add('message');
    div.innerHTML = `	<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div);
}