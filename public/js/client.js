
const socket = io('/');
const form = document.getElementById('send-container');
const messegeInput = document.getElementById('messageInp')
const messegecontainer = document.querySelector(".container")
const m = document.getElementById('middle')
var audio = new Audio('tune.mp3');

const append = (messege, position) => {
    const messegeElement = document.createElement('div');
    messegeElement.innerText = messege;
    messegeElement.classList.add('messege')
    messegeElement.classList.add(position)
    messegecontainer.append(messegeElement)
    scrollToBottom();
    if (position == 'left')
        audio.play();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    var messege = messegeInput.value
    console.log(messege)
    append(`${name}:${messege}`, 'right');
    console.log(messege)
    
    socket.emit('send', messege);
    messegeInput.value = '';

})
do{
var name = prompt("Enter your name to join")
console.log(name)
} while(!(/^\S{3,}$/.test(name))||name=="null"||name==""||name==" "||name=="  "||name=="   "||name=="    "||name=="     "||name=="     ")



socket.emit('joined-room', name)
m.append(`Welcome ${name}!`);

socket.on('user-joined', (name,count) => {
    // when some one first time join the room then will get the already joind user count
    console.log(count)
    document.getElementById('Active').innerHTML = "Online:"+count
    append(`${name} joined the chat`, 'right')
    scrollToBottom();
})
socket.on('receive', data => {
    append(`${data.name} :${data.messege} `, 'left')
    scrollToBottom();
})

socket.on('left', name => {
    append(`${name} left the chat`, 'left')
    scrollToBottom();
})

function scrollToBottom() {
    messegecontainer.scrollTop = messegecontainer.scrollHeight
}
socket.on('update-count', count => {
    // when sone one join or leave the chat room
    console.log(count)
    document.getElementById('Active').innerHTML = "Online:"+count
})

