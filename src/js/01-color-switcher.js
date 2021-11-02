const startBtnRef = document.querySelector('button[data-start]')
const stopBtnRef = document.querySelector('button[data-stop]')
let interval = null;
startBtnRef.addEventListener('click', onClickChangeColor);
stopBtnRef.addEventListener('click', onClickChangeBackground);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onClickChangeColor (event) {
    interval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtnRef.setAttribute('disabled', true);
}

function onClickChangeBackground (event) {
    clearInterval(interval);
    startBtnRef.removeAttribute('disabled');
}