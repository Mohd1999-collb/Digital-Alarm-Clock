// DOM selectors
const clockDisplay = document.querySelector("#clock");
const setAlarmButton = document.querySelector(".set-alarm");
const clearAlarmButton = document.querySelector(".clear-alarm");
const timeInput = document.querySelector("input");

// URL for playing BEEP audio
// const audioUrl = "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3";
const beepAudio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
beepAudio.loop = true;

// Adding event listeners to the buttons to set alarm od clear alarm it
setAlarmButton.addEventListener("click", setAlarm, {passive:true});
clearAlarmButton.addEventListener("click", clearAlarm, {passive:true});

let alarmTime = null;
let alarmTimeout = null;

// Formatting the clockDisplay
const formatTime = time => {
    if (time < 10) 
        return `${time}`;
        return time;     
}

// Updating clockdisplay
const updateTime = async => {
    const date = new Date();
    const hours =  formatTime(date.getHours());
    const minutes = formatTime(date.getMinutes());
    const seconds = formatTime(date.getSeconds());
    clockDisplay.innerHTML = `${hours} : ${minutes} : ${seconds}`;
}
    
// Settings the alarmTime when we get the value from the input
timeInput.addEventListener("change", () => alarmTime = timeInput.value);

function setAlarm() {
    if (!alarmTime) {
        return alert("Enter the alarm to the input and then submit.");        
    }
    const currentTime = new Date();
    const timeToAlarm = new Date(alarmTime);

    // Checking whether the input alarm value is greater then the current time
    if (timeToAlarm < currentTime) {
        return alert("The time entered is gone and presumbly wouldn't come again.");        
    }

    const timeout = timeToAlarm.getTime() - currentTime.getTime();
    alarmTimeout = setTimeout(async() => await beepAudio.play(), timeout);    
}

// Clear the alarm here
function clearAlarm() {
    beepAudio.pause()
    if (alarmTimeout) {
        alert("Alarm cleard!");        
    }
}
setInterval(updateTime, 999);
