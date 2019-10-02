const form = document.querySelector(".js-form"),
    input = document.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

// user local storage
const USER_LS = "currentUser",
    SHOWING_CN = "showing";

// 이름을 localstorage에 저장
function savedName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    // event prevent default
    event.preventDefault();  // event 초기화, 여기서는 엔터쳤을 때 화면이 새로고침 되는 걸 막기 위함
    const currentValue = input.value;  // 입력받은 값을 변수에 입력
    paintGreeting(currentValue);  // 변수를 인자로 넣어서 Hello currentUser 출력하게
    savedName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;  // greeting 안의 text를 바꿈
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        // user is not -> 이름 요청
        askForName();
    } else {
        // user is  here -> Hello {currentUser}
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();