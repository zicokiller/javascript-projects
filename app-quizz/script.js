const quizzData = [
  {
    question: "How old is Marc?",
    a: "27",
    b: "15",
    c: "51",
    d: "62",
    correct: "c",
  },
  {
    question: "What is the most use programming language in 2020?",
    a: "Javascript",
    b: "Python",
    c: "Java",
    d: "C",
    correct: "a",
  },
  {
    question: "How is the president of USA?",
    a: "D.Trump",
    b: "J.Biden",
    c: "Obiwan Kenobi",
    d: "Tom Cruise",
    correct: "b",
  },
  {
    question: "What does HTML stands for?",
    a: "Hypertext Markup Language",
    b: "Cascading Style Sheet",
    c: "Jason Object Notation",
    d: "Helicopters Terminals Motorboats Lamborghinis",
    correct: "a",
  },
  {
    question: "What year was Javascript launched?",
    a: "1995",
    b: "1997",
    c: "None of the above",
    d: "2002",
    correct: "a",
  },
];

const quizz = document.getElementById("quizz");
const answerEls = document.querySelectorAll(".answer");

const questionEl = document.getElementById("question");

const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuizz = 0;
let score = 0;

loadQuizz();

function getAnswerSelected() {
  let answer = undefined;
  // Je crée une boucle qui va vérifier s'il y a plusieurs réponses cochées
  let answersCount = 0;
  for (let i = 0; i < answerEls.length; i++) {
    const data = answerEls[i];
    if (data.checked) answersCount += 1;
  }
  // si oui, un msg alert sera émis et remise à zéro des btns
  if (answersCount > 1) {
    deselectAnswers();
    return alert("You must select only one response;");
  }
    
  // Je crée une boucle pour catch la réponse (id) cochée
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) answer = answerEl.id;
  });
  return answer;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

function loadQuizz() {
  deselectAnswers();

  const currentQuizzData = quizzData[currentQuizz];

  questionEl.innerText = currentQuizzData.question;
  a_text.innerText = currentQuizzData.a;
  b_text.innerText = currentQuizzData.b;
  c_text.innerText = currentQuizzData.c;
  d_text.innerText = currentQuizzData.d;
}

submitBtn.addEventListener("click", () => {
  // check to see the answer
  const answer = getAnswerSelected();
  console.log(answer);
  if (answer) {
    if (answer === quizzData[currentQuizz].correct) {
      score++;
    }

    currentQuizz++;
    if (currentQuizz < quizzData.length) {
      loadQuizz();
    } else {
      quizz.innerHTML = `<h2>You answered correctly at ${score} / ${quizzData.length} questions.</h2><button onClick="location.reload()">Reload</button>`;
    }
  }
});
