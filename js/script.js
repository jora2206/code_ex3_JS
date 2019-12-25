var timeBlockEl = document.querySelector("#showtime");
var hiddenBlockEl = document.querySelector(".box");

function revealBlock() {
  hiddenBlockEl.classList.remove("hide");
}

function hideBlock() {
  hiddenBlockEl.classList.add("hide");
}

function onTimerStep(startDate, currentTime) {
  console.log("step", currentTime);

  timeBlockEl.innerHTML = currentTime;
}

function onTimerStart(startDate, currentTime) {
  console.log("start", currentTime);

  timeBlockEl.innerHTML = currentTime;
  hideBlock();
}

function onTimerEnd(startDate, currentTime) {
  console.log("end");

  revealBlock();

  window.open("http://google.com");
}

var timerStepMs = 1000;

var timerTimeoutMs = timerStepMs * 3;

var timer = createTimer(
  1000,
  timerTimeoutMs,
  onTimerStart,
  onTimerStep,
  onTimerEnd
);

function onStartTimerClick() {
  startDate = new Date();
  currentTime = createCurrentTime(startDate);
  timer.startTimer();
}

var startBtnEl = document.querySelector("#start");
startBtnEl.onclick = onStartTimerClick;
