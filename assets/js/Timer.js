var time = 0;
var myTimer;

function StartTimer() {
    myTimer = setInterval(Timer, 1000);
}

function Timer() {
    time++;
    sessionStorage.setItem('Time', time);
}

function StopTimer() {
    var times = sessionStorage.getItem('Time');
    clearTimeout(myTimer);
    document.getElementById('TheTime').innerHTML = times;
}

function playAgain() {
    window.location.href = "Hospital.html";
}