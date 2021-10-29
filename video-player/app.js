const video = document.querySelector(".video");
const btnPausePlay = document.getElementById("play-pause");
const img = document.querySelector("#play-pause img");
const orangeBar = document.querySelector(".orange-bar");
const juice = document.querySelector(".juice");
const muteBtn = document.getElementById("mute");
const fullScreen = document.getElementById("fullscreen");
const volumeSlider = document.getElementById("volume-slider");


btnPausePlay.addEventListener("click", togglePlayPause);
video.addEventListener("click", togglePlayPause);

function togglePlayPause() {
    if (video.paused) {
        img.src = "ressources/pause.svg";
        video.play();
    } else {
        img.src = "ressources/play.svg";
        video.pause();
    }
}

// Barre orange de progression
    video.addEventListener("timeupdate", () => {

    let juicePosition = video.currentTime / video.duration;

// Etat d'avancement de la barre orange ds la video en instant T
    juice.style.width = juicePosition * 100 + "%";

    if (video.ended) {
        img.src = "ressources/play.svg";
    } else {
        img.src= "ressources/pause.svg";
    }
})

// Gestion du volume
volumeSlider.addEventListener("change", () => {

    // valeur en instant T du range
    video.volume = volumeSlider.value / 100;
    console.log(video.volume);
})

// Gestion du Mute
muteBtn.addEventListener("click", () =>{

    // Si la vidéo est sur Mute
    if (video.muted) {
        video.muted = false; // je déMute
        muteBtn.innerText = "Mute"; // et je display le bouton Mute
    } else {
        video.muted = true;
        muteBtn.innerText = "unmute";
    }
}) 

// Clic sur le barre de progression
    let rect = orangeBar.getBoundingClientRect(); /* méthode qui renseigne des dimensions et positions
                                                     de 'orangeBar' par rapport aux autres éléments */

    let largeur = rect.width;

    orangeBar.addEventListener("click", (e) => {
        let x = e.clientX - rect.left; /* donne la postion en px de notre click sur 
                                          la barre orange */
        let widthPercent = ((x * 100 / largeur)); /* donne le pourcentage de progression vidéo */
        console.log(widthPercent);
        let durationVideo = video.duration; // durée totale de la vidéo

        /* Position en seconde par rapport au % */
        video.currentTime = durationVideo * (widthPercent / 100); 
    });


    // Resizing
    window.addEventListener("resize", () => {
        let rect = orangeBar.getBoundingClientRect(); 
        let largeur = rect.width;
    });

    // Fullscreen
    video.addEventListener("dblclick", () => {
        video.webkitRequestFullScreen(); // permet de passer en plein écran
    });

    fullScreen.addEventListener("click", () => {
        video.webkitRequestFullScreen(); // permet de passer en plein écran
    });