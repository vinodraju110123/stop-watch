const timerEl = document.getElementById("timer");
const startButtonEl = document.getElementById("start");
const stopButtonEl = document.getElementById("stop");
const resetButtonEl = document.getElementById("reset");
const lapButtonEl = document.getElementById("lap");
const shareButtonEl = document.getElementById("share");
const themeToggleEl = document.getElementById("theme-toggle");
const lapsContainer = document.getElementById("laps");

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let lapCounter = 1;

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timerEl.textContent = formatTime(elapsedTime);
    }, 10);
    startButtonEl.disabled = true;
    stopButtonEl.disabled = false;
    timerEl.classList.add("running");
}

function formatTime(elapsedTime) {
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    return (
        (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
        (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") + "." +
        (milliseconds > 9 ? milliseconds : "0" + milliseconds)
    );
}

function stopTimer() {
    clearInterval(timerInterval);
    startButtonEl.disabled = false;
    stopButtonEl.disabled = true;
    timerEl.classList.remove("running");
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    timerEl.textContent = "00:00:00.00";
    startButtonEl.disabled = false;
    stopButtonEl.disabled = true;
    timerEl.classList.remove("running");
    lapsContainer.innerHTML = "";
    lapCounter = 1;
}

function recordLap() {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.innerHTML = `<span>Lap ${lapCounter}</span><span>${lapTime}</span>`;
    lapsContainer.appendChild(lapItem);
    lapCounter++;
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

function shareTime() {
    const time = timerEl.textContent;
    navigator.clipboard.writeText(`My stopwatch time: ${time}`).then(() => {
        alert("Time copied to clipboard! Share it anywhere.");
    });
}

startButtonEl.addEventListener("click", startTimer);
stopButtonEl.addEventListener("click", stopTimer);
resetButtonEl.addEventListener("click", resetTimer);
lapButtonEl.addEventListener("click", recordLap);
shareButtonEl.addEventListener("click", shareTime);
themeToggleEl.addEventListener("click", toggleTheme);