const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway= document.querySelector('.giveaway');
const deadline= document.querySelector('.deadline');
const items= document.querySelectorAll('.deadline-format h4');
//console.log(items); //nodelist

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();
//let futureDate = new Date(2020,11,24,11,30,0);//months start at 0, this is may

//console.log(futureDate);
const futureDate = new Date(tempYear,tempMonth,tempDay+10,11,30); //this way the counter never gets to zero every time you open the page
let month = months[futureDate.getMonth()];
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const date=futureDate.getDate();
const weekday=weekdays[futureDate.getDay()]; //day starts a 0 as well

giveaway.textContent=`Giveaway ends on ${weekday}, ${year} ${month} ${date}  ${hours}:${minutes}am`;

//futuretime in ms

const futureTime= futureDate.getTime();
//console.log(futureTime);

function getRemainingTime(){
  const today = new Date().getTime();
  const t = futureTime-today;
  //console.log(t);
  /* 1s=1000ms
  1m=60s
  1h=60min
  1d=24hr */
  const oneDay=24*60*60*1000; //ms in  day
  const oneHour=60*60*1000;
  const oneMin=60*1000;

  let days=Math.floor(t/oneDay);
  let hours=Math.floor((t % oneDay)/oneHour);
  let minutes=Math.floor((t % oneHour)/oneMin);
  let seconds=Math.floor((t % oneMin)/1000);
  function format(item){
    if (item<10){
      return `0${item}`
    }else{
      return item
    }
  }
  const values = [days,hours,minutes,seconds];
  items.forEach(function(item,index){
    item.innerHTML=format(values[index]);
  })

  if (t<0){
    clearInterval(countdown);
    deadline.innerHTML=`<h4 class='expired'>Sorry, this giveaway has expired</h4>`
  }
}
//countdown
let countdown = setInterval(getRemainingTime,1000);//refresh every one second

getRemainingTime();