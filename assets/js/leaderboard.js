/*const TIME_SCORES_NO = 3;
const TIME_SCORES = 'timeArray';
const timeString = localStorage.getItem(TIME_SCORES);
function compareTime() {
    const time = sessionStorage.getItem("time");
    const timeArray = JSON.parse(timeString) ?? [];
    const lastPos = timeArray[TIME_SCORES_NO -1]?.time?? 0;

    if (time > lastPos) {
        saveTime(time, timeArray);
        showTimes();
    };
}

function saveTime(time, timeArray) {
    const name = sessionStorage.getItem('playerName');
    const player = {time, name};
    timeArray.push(player);

    timeArray.sort((a,b) => b.time - a.time);

    timeArray.splice(TIME_SCORES_NO);

    localStorage.setItem(TIME_SCORES, JSON.stringify(timeArray))
}

function showTimes() {
    const timeArray = JSON.parse(localStorage.getItem(TIME_SCORES)) ?? [];
    const timeScoreList = document.getElementById('timesList');

    timeScoreList.innerHTML = timeArray
    .map((time) => `<li>${time.time} - ${time.name}`)
    .join('');
}*/

const ARRAY_SIZE = 3;
const timeString = sessionStorage.getItem('Time');

function compareTime() {
    console.log(timeString);
    const time = JSON.parse(timeString);
    const timeArray = JSON.parse(localStorage.getItem('timeArray')) ?? [ARRAY_SIZE];
    const lastPos = timeArray[ARRAY_SIZE-1 ?? 2]

    if (time > lastPos) {
        saveTime(time, timeArray)
    }

    showTimes();
}

function saveTime(time, timeArray) {
    const name = localStorage.getItem('playerName');
    const playerData = {name, time};
    timeArray.push(playerData);
    timeArray.sort((a,b) => b.time - a.time);
    timeArray.splice(ARRAY_SIZE);
    console.log(timeArray[0]);
    localStorage.setItem('timeArray', JSON.stringify(timeArray));
}

function showTimes() {
    const timeArray = JSON.parse(localStorage.getItem('timeArray') ?? [ARRAY_SIZE]);
    const leaderboard = document.getElementsByClassName('record');

    for (i = 0; i < ARRAY_SIZE; i++) {
        leaderboard[i].innerHTML = timeArray[i];
    }
}