const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");


// Position de la souris
let posX = 0,
    posY = 0;

canvas.addEventListener("mousemove", e => {
    posX = e.offsetX;
    posY = e.offsetY;
    //console.log(posY, posX);
})

function anim() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.beginPath();
    ctx.rect(posX - 175, 0, 350, 750);

    // Détourage du rectangle
    ctx.clip();

// Intégration de la vidéo ds le canvas
    ctx.drawImage(document.querySelector("video"), 0, 0, canvas.width, canvas.height)
    ctx.restore(); // pointe sur "ctx.save()" qui save l'état de base
    requestAnimationFrame(anim);
}
anim();

