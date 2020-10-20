const btn =document.getElementById('btn');
const container =document.getElementById('container');

btn.addEventListener('click',()=>{
    createNotif();
})


function createNotif(){
    const notif = document.createElement('div');
    notif.classList.add('toast');
    notif.innerText="this challange is crazy";
    container.appendChild(notif);
    setTimeout(()=>{
        notif.remove();
    },3000);
}