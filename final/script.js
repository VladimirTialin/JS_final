const videoEL = document.querySelector('.video-box__element');
let progressBar = document.getElementById('video__progress-bar');
const currTime = document.getElementById('video__current-time');
const durationTime = document.getElementById('video__duration');
const actionButton = document.getElementById('video__action');
const playEl = document.querySelector('.video__play');
const muteButton = document.querySelector('.video__mute');
const volumeScale = document.getElementById('video__volume');
const speedSelect = document.getElementById('video__speed');
const fullScreen = document.querySelector('.video__full-screen');

function videoAct() {
  const imgEL = document.querySelector('img');
  if (videoEL.paused) {
    imgEL.src = 'img/pause.png';
    videoEL.play();
    actionButton.setAttribute('class', 'video__element video__action video__action_play');
  } else {
    imgEL.src = 'img/play.png';
    videoEL.pause();
    actionButton.setAttribute('class', 'video__element video__action video__action_pause');
  }
  if (durationTime.innerHTML == '00:00') {
    durationTime.innerHTML = videoTime(videoEL.duration);
  }
}

actionButton.addEventListener('click', videoAct);

videoEL.addEventListener('click', videoAct);
playEl.addEventListener('click', videoAct);
fullScreen.addEventListener('click', function () {
  videoEL.requestFullscreen();
})
function videoTime(time) {
  time = Math.floor(time);
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);
  let minutesVal = minutes;
  let secondsVal = seconds;
  if (minutes < 10) {
    minutesVal = '0' + minutes;
  }
  if (seconds < 10) {
    secondsVal = '0' + seconds;
  }
  return minutesVal + ':' + secondsVal;
}
function videoProgress() {
  progress = (Math.floor(videoEL.currentTime) / (Math.floor(videoEL.duration) / 100));
  progressBar.value = progress;
  currTime.innerHTML = videoTime(videoEL.currentTime);
}
function videoChangeTime(e) {
  let mouseX = Math.floor(e.pageX - progressBar.offsetLeft);
  let progress = mouseX / (progressBar.offsetWidth / 100);
  videoEL.currentTime = videoEL.duration * (progress / 100);
}

videoEL.addEventListener('timeupdate', videoProgress);
progressBar.addEventListener('click', videoChangeTime);

function videoChangeVolume() {
  let volume = volumeScale.value / 100;
  videoEL.volume = volume;

  if (videoEL.volume == 0) {
    muteButton.src = "img/volume-off.png";
  } else {
    muteButton.src = "img/volume-on.png";
  }
}
function videoMute() {
  if (videoEL.volume == 0) {
    videoEL.volume = volumeScale.value / 100;
    muteButton.src = "img/volume-on.png";
  } else {
    videoEL.volume = 0;
    muteButton.src = "img/volume-off.png";
  }
}
function videoChangeSpeed() {
  let speed = speedSelect.value / 100;
  videoEL.playbackRate = speed;
}

muteButton.addEventListener('click', videoMute);
volumeScale.addEventListener('change', videoChangeVolume);
speedSelect.addEventListener('change', videoChangeSpeed);
