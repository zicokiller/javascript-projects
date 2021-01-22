// setTimeout(() => {
//   const progress = document.querySelector(".progress-done");

//   progress.style.width = progress.getAttribute("data-done") + "%";
//   progress.style.opacity = 1;
// }, 500);

const progress = document.querySelector('.progress-done');
let numberComplete = progress.getAttribute('data-complete');
const slider = document.querySelector('.slider'); 
const button = document.querySelector('.btn');

button.addEventListener('click', tick);

function tick() {
    let width = 0;
    numberComplete = slider.value;

    let count = setInterval(() => {
        if(width != numberComplete) {
        width++;
        progress.style.opacity = 1;
        progress.style.width = width + "%";
        progress.innerHTML = width + "%";
        } else {
            clearInterval(count);
        }
    }, 10)

}


