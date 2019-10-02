const weather = document.querySelector(".js-weather");

const API_KEY = "fbf7ad6be913c836ee2df2b95a71f9db";
const COORDS = 'coords';

function getwWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
        .then(function (response) {  // 서버로부터 데이터가 완전히 들어올 때까지 기다려야 해서 then을 씀
            return response.json();
    })
        .then(function (json) {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
    });
}

function  saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude =  position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,  // latitude = latitude
        longitude  // longitude = longitude 이름이 같을 때는 가능
    };
    saveCoords(coordsObj);
    getwWeather(latitude, longitude);
}
``
function handleGeoError() {
    console.log("can't access geo location!");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        // 좌표가 없으니까좌표를 요청함
        askForCoords();
    } else {
        // get Weather
        const parseCoords = JSON.parse(loadedCoords);
        getwWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();