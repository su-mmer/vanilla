const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

// 변수에 toDos 넣기
const TODOS_LS = "toDos";

// 할 일 생성 시 이 배열에 추가
let toDos = [];

function deleteToDo() {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);  // <li>의 리스트 삭제
    // filter: 배열의 모든 item에서 함수를 실행하고 true인 아이템들만 가지고 새로운 배열을 만든다.
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

// toDos를 storage에 저장하는 함수
function saveToDos() {
    // localStorage에 Key값은 'toDos'로 Value는 toDos 배열을 저장
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));  // string으로 toDos를 바꿔서 저장
    // (TODOS_LS, toDos)로 하면 localStorage에 object Object가 저장됨.
    //localStorage는 js의 string만 저장할 수 있기 때문
}

function paintToDo(text) {
    // 태그 생성
    const li = document.createElement("li");  // <li> tag create
    const delBtn = document.createElement("button"); // <button> tag create
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "X";  // value of <button>
    delBtn.addEventListener("click", deleteToDo);  // click하면 함수 실행
    span.innerText = text;
    li.appendChild(delBtn);  // <delBtn> value input to <li>
    li.appendChild(span);  // <span> value input to <li>
    li.id = newId;  // li에 1씩 늘어나면서 속성 달아줌
    toDoList.appendChild(li);  // <li> input to <ul>
    // 객체를 만들어 toDos를 저장
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

// event 처리
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;  // input 값을 변수에 저장
    paintToDo(currentValue); // 변수를 인자로 함수를 실행
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);  // localStorage에서 toDos 가져오기
    if( loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);  // JS Object로 변환
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);  // toDo를 화면에 출력
        });
    }// 각각 한 번씩 실행시켜주는 forEach
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();