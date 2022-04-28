let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {

    //clear any existing timers
    clearInterval(countdown);
    // amount of time you want to have
    //elapse the time over how over many seconds
    // figure out when the timer starts
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    // every single second, set amount of time left. use interval
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        //check when to stop - before it turns negative
        if(secondsLeft <= 0) {
            clearInterval(countdown);
            return;
        }
        //display
        displayTimeLeft(secondsLeft);

    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`; // adds a 0 before the second
    document.title = display;
    timerDisplay.textContent = display; 
    
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    // endTime.textContent = `Be Back at ${hour > 12 ? hour - 12 : hour}:${minutes}`;
    endTime.textContent = `be back at ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`
}


function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}
buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
});