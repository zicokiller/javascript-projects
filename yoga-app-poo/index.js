const main = document.querySelector("main");

const basicArray = [
  { pic: 0, min: 1 },
  { pic: 1, min: 1 },
  { pic: 2, min: 1 },
  { pic: 3, min: 1 },
  { pic: 4, min: 1 },
  { pic: 5, min: 1 },
  { pic: 6, min: 1 },
  { pic: 7, min: 1 },
  { pic: 8, min: 1 },
  { pic: 9, min: 1 },
];

let exerciceArray = [];

// Stockage des data ds "exercices" ds localStorage
(() => {
  const exercs = localStorage.getItem("exercices");
  if (exercs) exerciceArray = JSON.parse(exercs);
  else exerciceArray = basicArray;
})();

/* Class pour générer les exercices, sera instanciée 
pour lancer le minutage des exercices */
class Exercice {
  constructor() {
    this.index = 0;
    this.minutes = exerciceArray[this.index].min;
    this.seconds = 0;
  }
  updateCountdown() {
    this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;

    setTimeout(() => {
      if (this.minutes === 0 && this.seconds === "00") {
        this.index++;
        this.ring();
        if (this.index < exerciceArray.length) {
          this.minutes = exerciceArray[this.index].min;
          this.seconds = 0;
          this.updateCountdown();
      } else {
        return page.finish();
      }

      } else if (this.seconds === "00") {
        this.minutes--;
        this.seconds = 59;
        this.updateCountdown();
      } else {
        this.seconds--;
        this.updateCountdown();
      }
    }, 1000);
    return (main.innerHTML = `
      <div class="exercice-container">
        <p>${this.minutes}:${this.seconds}</p>
        <img src="./img/${exerciceArray[this.index].pic}.png" />
        <div>${this.index + 1} / ${exerciceArray.length}</div>
      </div>
    `);
  }
  ring() {
    const audio = new Audio();
    audio.src ="ring.mp3";
    audio.play();
  }
}

/* Objet pour contenir toutes les 
fonctions utiles au projet */
const utils = {
  // gère la selection des balises HTML
  pageContent: function (title, content, btn) {
    document.querySelector("h1").innerHTML = title;
    main.innerHTML = content;
    document.querySelector(".btn-container").innerHTML = btn;
  },
  // gère l' event de l'input "minutes" dynamiquement
  handleEventMinutes: function () {
    document.querySelectorAll('input[type="number"]').forEach((input) => {
      input.addEventListener("input", (e) => {
        exerciceArray.map((exo) => {
          if (exo.pic == e.target.id) {
            exo.min = parseInt(e.target.value);
            this.store();
          }
        });
      });
    });
  },
  // gère le déplacement des cartes
  handleEventArrow: function () {
    document.querySelectorAll(".arrow").forEach((arrow) => {
      arrow.addEventListener("click", (e) => {
        let position = 0;
        exerciceArray.map((exo) => {
          if (exo.pic == e.target.dataset.pic && position != 0) {
            [exerciceArray[position], exerciceArray[position - 1]] = [
              exerciceArray[position - 1],
              exerciceArray[position],
            ];
            page.lobby();
            this.store();
          } else {
            position++;
          }
        });
      });
    });
  },

  deleteItem: function () {
    document.querySelectorAll(".deleteBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let newArray = [];
        exerciceArray.map((exo) => {
          if (exo.pic != e.target.dataset.pic) {
            newArray.push(exo);
          }
        });
        exerciceArray = newArray;
        page.lobby();
        this.store();
      });
    });
  },

  reboot: function () {
    exerciceArray = basicArray;
    page.lobby();
    this.store();
  },

  store: function () {
    localStorage.exercices = JSON.stringify(exerciceArray);
  },
};

/* Objet pour contenir toutes les vues
du projet */
const page = {
  lobby: function () {
    let mapArray = exerciceArray
      .map(
        (exo) =>
          `
        <li>
        <div class="card-header">
          <input type="number" id=${exo.pic} min="1" max="10" value=${exo.min}>
            <span>min</span>
        </div>
        <img src="./img/${exo.pic}.png" />
        <i class="fas fa-arrow-alt-circle-left arrow" data-pic=${exo.pic}></i>
        <i class="fas fa-times-circle deleteBtn" data-pic=${exo.pic}></i>
        </li>
      `
      )
      .join();

    utils.pageContent(
      "Settings<i id='reboot'class='fas fa-undo'></i>",
      "<ul>" + mapArray + "</ul>",
      "<button id='start'>Start now<i class='far fa-play-circle'></i></button>"
    );
    utils.handleEventMinutes();
    utils.handleEventArrow();
    utils.deleteItem();
    reboot.addEventListener("click", () => utils.reboot());
    start.addEventListener("click", () => this.routine());
  },

  routine: function () {
    const exercice = new Exercice();
    utils.pageContent("Routine", exercice.updateCountdown(), null);
  },

  finish: function () {
    utils.pageContent(
      "You have finished!",
      "<button id='start'>Restart Training Session</button>",
      "<button id='reboot' class='btn-reboot'>Reset<i class='fas fa-times-circle'</i></button>"
    );
    start.addEventListener("click", () => this.routine());
    reboot.addEventListener("click", () => utils.reboot());

  
  },
};

page.lobby();
