console.log("Welcome to Spotify");

//Intialise the variables
let songIndex =0;
let audioElement = new Audio('song1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById("myProgressBar");
let gif= document.getElementById('gif');
let masterSongName = document.getElementById('nasterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songname: "Goosestaf & Timothy Infinite - Bumblebee", filePath: "song1.mp3", coverPath: "cover1.jpg"},
    {songname: "Warriyo - Mortals [NCS Release]", filePath: "song2.mp3", coverPath: "cover2.jpg"},
    {songname: "Glass Animals - Heat Waves", filePath: "song3.mp3", coverPath: "cover3.jpg"},
    {songname: "The KID LAROI - STAY", filePath: "song4.mp3", coverPath: "cover4.jpg"},
    {songname: "BTS - Dynamite", filePath: "song5.mp3", coverPath: "cover5.jpg"},
    {songname: "BTS - Fake Love", filePath: "song6.mp3", coverPath: "cover6.jpg"},
    {songname: "You Me At Six - Bite My Tongue", filePath: "song7.mp3", coverPath: "cover7.jpg"},
    {songname: "Jimin - Filter", filePath: "song8.mp3", coverPath: "cover8.jpg"},
    {songname: "You Me At Six - Beautiful Way", filePath: "song9.mp3", coverPath: "cover9.jpg"},
    {songname: "SEVENTEEN - Rock With You", filePath: "song10.mp3", coverPath: "cover10.jpg"},
    
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByTagName("songname" )[0].innerText = songs[i].songName;

})

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
})
else{
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
}

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;

})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `song${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    
    })
})


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;

    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex =0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})
