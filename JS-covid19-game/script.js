// const canvas = document.getElementById("canvas");
// const score = document.getElementById("score");
// const days = document.getElementById("days");
// const endScreen = document.getElementById("endScreen");

// let daysLeft = 60;
// let gameOverNumber = 50;
// loopPlay = false;

// function start() {
//   count = 0;
//   // défini le fait que les virus vont poper de + en + vite
//   getFaster = 6000;

//   daysRemaining = daysLeft;

//   // remise à zéro du canvas
//   canvas.innerHTML = "";
//   // remise à zéro du compteur
//   score.innerHTML = count;
//   // remise à niveau des jours restants (= daysLeft)
//   days.innerHTML = daysRemaining;

//   // je m'assure de ne pas jouer la loop en boucle
//   loopPlay ? "" : game();
//   loopPlay = true;
//   // fonction avec toute la mécanique du jeu
//   function game() {
//     let randomTime = Math.round(Math.random() * getFaster);

//     // si getFaster est > à 7ms alors tu descends de 10% (sinon ça va pop trop vite)
//     getFaster > 700 ? getFaster = (getFaster * 0.90) : "";

//     setTimeout(() => {
//       if (daysRemaining === 0) {
//         youWin();
//       } else if (canvas.childElementCount < gameOverNumber) {
//         virusPop();
//         game();
//       } else {
//         gameOver();
//       }
//     }, randomTime);
//   }
// }

// const gameOver = () => {
//   endScreen.innerHTML = `<div class="gameOver">Game over <br />score: ${count}</div>`;
//   endScreen.style.visibility = "visible";
//   endScreen.style.opacity = "1";
//   loopPlay = false;
// }

// function virusPop() {
//   let virus = new Image(); // je crée des éléments avec balises img
//   virus.src = "media/basic-pics/pngwave.png";

//   virus.classList.add("virus"); // chaque fois qu'un virus est crée je lui applique la classe .virus

//   // va pop aléatoirement chaque nx virus sur le canvas entre 0 et 500 (500 px = width et height du canvas)
//   virus.style.top = Math.random() * 500 + "px";
//   virus.style.left = Math.random() * 500 + "px";

//   // définition de la taille aléatoire des virus
//   let x, y;

//   // je randomise la taille des éléments entre 1 et 45px
//   // sauf que la taille min sera de 30px (car 1px sera invisible)
//   x = y = (Math.random() * 45) + 30;

//   // là je dis : là ou tu as la var x et y tu injectes le résultat (ds le template string)
//   virus.style.setProperty("--x", `${x}px`);
//   virus.style.setProperty("--y", `${y}px`);

//   // défini le mouvement des virus
//   let plusMinus = Math.random() < 0.5 ? -1 : 1;

//   // je calcule un résultat pour les var x, y que l'on set soit en + ou soit en -
//   let trX = Math.random() * 500 * plusMinus;
//   let trY = Math.random() * 500 * plusMinus;

//   // je set le résultat en injectant ds le css la valeur du template string
//   virus.style.setProperty("--trX", `${trX}%`);
//   virus.style.setProperty("--trY", `${trY}%`);

//   // je crée un enfant de canvas pour pop les virus sur le canvas
//   canvas.appendChild(virus);
// }

// // supprimer les virus au click
// document.addEventListener("click", function (e) {
//   let targetElement = e.target || e.srcElement;
//   if (targetElement.classList.contains("virus")) {
//     targetElement.remove();
//     count++;
//     score.innerHTML = count;
//   }
// });



// fichier source
const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const days = document.getElementById('days');
const endScreen = document.getElementById('endScreen');

daysLeft = 60;
gameOverNumber = 50;
loopPlay = false;



function start() {
  count = 0;
  getFaster = 6000;
  daysRemaining = daysLeft; 

  canvas.innerHTML = '';
  score.innerHTML = count;
  days.innerHTML = daysRemaining;

  // make sure to not play loop several times
  loopPlay ? '' : game();   
  loopPlay = true;

  function game() {
    let randomTime = Math.round(Math.random() * getFaster);
    getFaster > 700 ? getFaster = (getFaster * 0.90) : '';
  
    setTimeout(() => {
      if (daysRemaining === 0){
        youWin();
      } else if (canvas.childElementCount < gameOverNumber){
        virusPop();
        game();
      } else {
        gameOver();
      }
    }, randomTime);  
  };

  const gameOver = () => {
  endScreen.innerHTML = `<div class="gameOver">Game over <br/>score : ${count} </div>`;
  endScreen.style.visibility = 'visible';
  endScreen.style.opacity = '1';
  loopPlay = false;
};

  const youWin = () => {
    let accuracy = Math.round(count / daysLeft * 100);
    endScreen.innerHTML = `<div class="youWin">Well done ! You overcome this motherfucker<br/><span>Accuracy : ${accuracy} %</span></div>`;
    endScreen.style.visibility = 'visible';
    endScreen.style.opacity = '1';
    loopPlay = false; 
  };
};

// create random element
function virusPop() {
  let virus = new Image();

  virus.src = "https://i.ibb.co/9TYZnLB/pngwave.png"

  virus.classList.add('virus');
  virus.classList.add('virus-bis');
  virus.style.top = Math.random() * 500 + 'px';
  virus.style.left = Math.random() * 500 + 'px';

  let x, y;
  x = y = (Math.random() * 45) + 30;
  virus.style.setProperty('--x', `${ x }px`);
  virus.style.setProperty('--y', `${ y }px`);

  let plusMinus = Math.random() < 0.5 ? -1 : 1;
  let trX = Math.random() * 500 * plusMinus;
  let trY = Math.random() * 500 * plusMinus;
  virus.style.setProperty('--trX', `${ trX }%`);
  virus.style.setProperty('--trY', `${ trY }%`);

  canvas.appendChild(virus);
};

// remove element clicked
document.addEventListener("click", function(e){
  let targetElement = e.target || e.srcElement;

  if (targetElement.classList.contains('virus')) {
    targetElement.remove();
    count++;
    score.innerHTML = count;
  };
});

// countdown on click
canvas.addEventListener('click', () => {
  if (daysRemaining > 0) {
    daysRemaining--;
    days.innerHTML = daysRemaining;
  }
});

// hide screen on click
// endScreen.addEventListener('click', () => {
//   start();
//   setTimeout(() => {
//     endScreen.style.visibility = 'hidden';
//   }, 3500)
// });
