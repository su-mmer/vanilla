const body = document.querySelector("body");

const IMG_NUMBER =  3;

function paintImage(imgNumber) {
    // console.log(imgNumber);
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);  // Math.floor(): 인자의 소수점 버림
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();