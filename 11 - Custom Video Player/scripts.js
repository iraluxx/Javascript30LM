// 1. GET OUR ELEMENTS
const player = document.querySelector('.player');
// within the player, grab everything else
const video = player.querySelector('.viewer'); // viewer is the class that the video has

//progress bar
const progress = player.querySelector('.progress');

// progress filler
const progressBar = player.querySelector('.progress__filled');

// toggle
const toggle = player.querySelector('.toggle');

// player silder
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// 2. BUILD OUT FUNCTIONS
function togglePlay() {
    
    // if(video.paused) { 
    // video.play();
    // } else {
    //     video.pause();
    // } MOVED TO TERNARY OPERATOR:
    
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    
}

// 4b. get the play button changes from play to pause - but for whenever the video 

function updateButton() {
// 5. when event listeners in 4. are clicked
const icon = this.paused ? '►' : '❚ ❚';
toggle.textContent = icon;

}

function skip() {
    // 6. understand how much needs to be skipped. look at the dom element data-skip
    video.currentTime += parseFloat(this.dataset.skip);

}

function handleRangeUpdate() {
    console.log(this.value);
    console.log(this.value);
}

// 9. update progress bar 

function handleProgress () {
    // flex basis value on a percentage basis. calculate how long the vide is and how far 
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

// scrub - move specifically to a point in the vid

function scrub (e) {
    const scrubTime = (e.offsetX / progress.offsetWidth ) * video.duration; // do math to figure out width of progress bar
    video.currentTime = scrubTime;
    console.log(e);
}


// click and drag

// 3. HOOK UP EVENT LISTENERS - when clicking video AND when clicking play button
video.addEventListener('click', togglePlay);
// 4a. get the play button changes from play to pause - but for whenever the video 
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate)); //update in realtime rather than just mouseup
//8. listen for time update
video.addEventListener('timeupdate', handleProgress);
let mousedown = false;
progress.addEventListener('click', scrub);
// click and drag
// progress.addEventListener('mousemove', ( => {
//     if(mousedown) {
//         scrub()
//     }
// }));

progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // when someone moves their mouse, we say mousedown and scrub. it first checks the mousedown variable, and if thats true, moves on to the scrub variable. 
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mouseup= false);

