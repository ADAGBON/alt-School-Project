// Select Elements
const timerDisplay = document.querySelector(".timer-display");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const themeToggle = document.getElementById("theme-toggle");
const lapsContainer = document.querySelector(".laps");

let hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0;
let timer = null;
let running = false;
let lapCount = 0;

// 🕒 Update the display
function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds < 100 ? (milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds) : milliseconds;
  timerDisplay.textContent = `${h}:${m}:${s}:${ms}`;
}

// ▶️ Start
function startTimer() {
  if (running) return;
  running = true;
  timer = setInterval(() => {
    milliseconds += 10;
    if (milliseconds === 1000) {
      milliseconds = 0;
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
      }
    }
    updateDisplay();
  }, 10);
}

// ⏸ Stop
function stopTimer() {
  clearInterval(timer);
  running = false;
}

// 🔄 Reset
function resetTimer() {
  clearInterval(timer);
  running = false;
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  lapCount = 0;
  lapsContainer.innerHTML = "";
  updateDisplay();
}

// 🧾 Lap
function recordLap() {
  if (!running) return;
  lapCount++;
  const li = document.createElement("li");
  li.textContent = `Lap ${lapCount}: ${timerDisplay.textContent}`;
  lapsContainer.prepend(li);
}

// 🌗 Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeToggle.textContent =
    document.body.classList.contains("light-mode") ? "☀️" : "🌙";
});

// Event Listeners
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);

// Initial display
updateDisplay();
