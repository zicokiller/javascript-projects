let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume-show');
let slider = document.querySelector('#duration-slider');
let show_duration = document.querySelector('#show-duration');
let track_image = document.querySelector('#track-image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');

let timer;
let autoplay = 0;

let index_no =0;
let playing_song = false;

// create an audio element
let track = document.createElement('audio');

// All songs list
const All_song = [
    {
        name: "Redneck",
        path: "music/song1.mp3",
        img: "img/img1.webp",
        singer: "Lamb of God"
    },
    {
        name: "Turn-up",
        path: "music/song2.mp3",
        img: "img/img2.webp",
        singer: "Nekfeu & Kalash Criminel"
    },
    {
        name: "Compte les hommes",
        path: "music/song3.mp3",
        img: "img/img3.webp",
        singer: "Nekfeu & Alpha wann"
    },
    {
        name: "Thunderstruck",
        path: "music/song4.mp3",
        img: "img/img4.webp",
        singer: "AC/DC"
    },
    {
        name: "Spit out the bone",
        path: "music/song5.mp3",
        img: "img/img5.webp",
        singer: "Metallica"
    }
]; 

// All functions

// function to load the track
function loadTrack(index_no) {
    clearInterval(timer);
    resetSlider();
    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name;
    track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();

    total.innerHTML = All_song.length;
    present.innerHTML = index_no + 1;
    timer = setInterval(rangeSlider, 1000);

}
loadTrack(index_no);

// mute sound
function muteSound() {
    track.volume = 0;
    track.value = 0;
    volume_show.innerHTML = 0;

}

// reset song slider
function resetSlider() {
    slider.value = 0;
}

//checking the song is playing or not
function justPlay() {
    if(playing_song == false) {
        playSong();
    } else {
        pauseSong();
    }
}

// playSong
function playSong() {
    track.play();
    playing_song = true;
    play.innerHTML = `<i class="fa fa-pause"></i>`
}

// pause song
function pauseSong() {
    track.pause();
    playing_song = false;
    play.innerHTML = `<i class="fa fa-play"></i>`
}

// next song
function nextSong() {
    if(index_no < All_song.length - 1) {
        index_no += 1;
        loadTrack(index_no);
        playSong();
    } else {
        index_no = 0;
        loadTrack(index_no);
        playSong();
    }
}

// previous song
function previousSong() {
    if(index_no > 0) {
        index_no -= 1;
        loadTrack(index_no);
        playSong();
    } else {
        index_no = All_song.length;
        loadTrack(index_no);
        playSong();
    }
}

// change volume
function volumeChange() {
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

// change slider position
function changeDuration() {
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

// autoplay function
function autoplaySwitch() {
    if(autoplay == 1) {
        autoplay = 0;
        auto_play.style.background = "rgba(255, 255, 255, 0.2)";
    } else {
        autoplay = 1;
        auto_play.style.background = "#FF8A65";
    }
}

function rangeSlider() {
    let position = 0;

    // update slider position
    if(!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }

    // condition will run when the song is over
    if(track.ended) {
        play.innerHTML = `<i class="fa fa-play"></i>`;
        if(autoplay == 1) {
            index_no += 1;
            loadTrack(index_no);
            playSong();
        }
    }
}

    // toggle hamburger menu 
// const navToggle = document.querySelector(".nav-toggle");
// navToggle.addEventListener("click", function () {
//   links.classList.toggle('show-links');

// });




