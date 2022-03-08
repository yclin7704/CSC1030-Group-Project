var tempDecrease = 2;
let temperature = 40;

function decreaseTemp() {
    temperature -= tempDecrease;
    if (temperature <= -21) {
        sessionStorage.setItem("Temperature", temperature);
        window.location.href = "EndStatistics.html";
    }
}

function returnTemp () {
    document.getElementById("TheTemperature").innerHTML = sessionStorage.getItem("Temperature");
}