const btn= document.getElementById('btn');
const nav= document.getElementById("nav");

console.log(document.getElementById('btn'));

btn.addEventListener('click',()=>{
    nav.classList.toggle("active");
    btn.classList.toggle("active");
})