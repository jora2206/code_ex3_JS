function createCurrentTime(fromDate) {
  var currentDate = new Date();
  var timeDiffMs = currentDate.getTime() - fromDate.getTime();
  var timeDiffDate = new Date(timeDiffMs);

  var timeDiffSecs = timeDiffDate.getSeconds().toString();
  var timeDiffMins = timeDiffDate.getMinutes().toString();
  var timeDiffHs = timeDiffDate.getHours().toString();

  if (timeDiffSecs.length < 2) {
    timeDiffSecs = "0" + timeDiffSecs;
  }

  if (timeDiffMins.length < 2) {
    timeDiffMins = "0" + timeDiffMins;
  }

  var currentTime = timeDiffMins + ":" + timeDiffSecs;

  return currentTime;
}

function createTimer(stepMs, timeoutMs, onStartFn, onStepFn, onEndFn) {
  if (stepMs > timeoutMs) {
    throw new Error(
      "stepMs '" + stepMs + "' greater than timeoutMs'" + timeoutMs + "'"
    );
  }

  var stepInterval;
  var finalTimeout;

  var isRunning = false;
  var startDate;
  var currentTime;

  startDate = new Date();
  currentTime = createCurrentTime(startDate);

  function onStart(runOnStartFn) {
    if (runOnStartFn) {
      onStartFn(startDate, currentTime);
    }
  }

  function onStepInterval(runOnStepFn) {
    if (runOnStepFn) {
      onStepFn(startDate, currentTime);
    }
  }

  function onEndTimeout(runOnEndFn) {
    isRunning = false;

    clearInterval(stepInterval);
    clearTimeout(finalTimeout);

    if (runOnEndFn) {
      onEndFn(startDate, currentTime);
    }
  }

  function startTimer() {
    if (isRunning) {
      return;
    }

    isRunning = true;
    startDate = new Date();
    currentTime = createCurrentTime(startDate);

    onStart(true);

    stepInterval = setInterval(function() {
      currentTime = createCurrentTime(startDate);

      onStepInterval(true);
    }, stepMs);

    finalTimeout = setTimeout(function() {
      onEndTimeout(true);
    }, timeoutMs);
  }

  function stopTimer() {
    onEndTimeout(false);
  }

  return {
    startTimer,
    stopTimer
  };
}
