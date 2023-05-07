'use strict'

const playButton = document.querySelector('#play');
const myVideo = document.querySelector('video'); 
const progressbar = document.querySelector('.progressbar'); 
const durationDiv = document.querySelector('.duration'); 
const currenttime = document.querySelector('.currenttime'); 
const progressbarrange = document.querySelector('.progressbar-range'); 
const volumerange = document.querySelector('.volume-range'); 
const volumebar = document.querySelector('.volume-bar'); 
const volume = document.querySelector('#volume');
const speed = document.querySelector('#speed');
const fullscreen = document.querySelector('#fullscreen');
const playerContainer = document.querySelector('.player-container');

let isFullScreen = false;
let isPlaying = false;
speed.value = 1;

const playVideo = ()=>
{
    isPlaying = true;
    myVideo.play();
    playButton.classList.replace('fa-play','fa-pause');
}
const pauseVideo = ()=>
{
    isPlaying = false;
    myVideo.pause();
    playButton.classList.replace('fa-pause','fa-play');
}

const controlVideo = ()=>
{
    if(!isPlaying)
    {
        playVideo();
    }
    else
    {
        pauseVideo();
    }
}

playButton.addEventListener('click',controlVideo);

myVideo.addEventListener('timeupdate',()=>
{
    const currentTime = myVideo.currentTime;
    const duration = myVideo.duration;

    const progessPercentage = (currentTime/duration)*100;
    progressbar.style.width = `${progessPercentage}%`;

    let durationInMinute = Math.floor(duration/60);
    let durationInSeconds = Math.floor(duration%60);
    if(durationInSeconds<10)
    {
        durationInSeconds = `0${durationInSeconds}`;
    }
    let totalDuration = `${durationInMinute}:${durationInSeconds}`;
    durationDiv.innerText = totalDuration;


   let currentTimeInMinute = Math.floor(currentTime/60);
    let currentTimeInSeconds = Math.floor(currentTime%60);
    if(currentTimeInSeconds<10)
    {
        currentTimeInSeconds = `0${currentTimeInSeconds}`;
    }
    let currentDuration = `${currentTimeInMinute}:${currentTimeInSeconds}/`;
    currenttime.innerText = currentDuration;
})
progressbarrange.addEventListener('click',(e)=>
{
   let totalWidth = e.srcElement.offsetWidth;
   let totalWidthFromStart = e.offsetX;
   let clickPercentage = (totalWidthFromStart/totalWidth)*100;
   progressbar.style.width = `${clickPercentage}%`;
   myVideo.currentTime = ((totalWidthFromStart/totalWidth)*myVideo.duration);
});
volumerange.addEventListener('click',(e)=>
{
    let totalWidth = e.srcElement.offsetWidth;
    let totalWidthFromStart = e.offsetX;
    let clickPercentage = (totalWidthFromStart/totalWidth)*100;
    volumebar.style.width = `${clickPercentage}%`;
    myVideo.volume = (totalWidthFromStart/totalWidth);
})
let isMuted = false;
const mute = ()=>
{
    isMuted = true;
    myVideo.muted = true;
    volume.classList.replace('fa-volume-up','fa-volume-mute');
    volumebar.style.width = `${0}%`;
}
const unMute = ()=>
{
    isMuted = false;
    myVideo.muted = false;
    volume.classList.replace('fa-volume-mute','fa-volume-up');
    volumebar.style.width = `${50}%`;
}

volume.addEventListener('click',()=>
{
    if(!isMuted)
    {
        mute();
    }
    else
    {
        unMute();
    }
});

speed.addEventListener('change',()=>
{
    myVideo.playbackRate = speed.value;
})

fullscreen.addEventListener('click',()=>
{
    if(!isFullScreen)
    {
        displayFullScreen(playerContainer);
    }
    else
    {
        closeFullScreen(playerContainer);
    }
});

const displayFullScreen = (container)=>
{
    container.requestFullscreen();
}

const closeFullScreen = (container)=>
{
    container.exitFullscreen();
}