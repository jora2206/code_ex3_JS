var fadeDirections = {
  In: 0,
  Out: 1
};

class FadeToggler {
  constructor(el, stepMs, minOpacity, maxOpacity, stepOpacity) {
    this.el = el;
    this.stepMs = stepMs;
    this.minOpacity = minOpacity;
    this.maxOpacity = maxOpacity;
    this.stepOpacity = stepOpacity;
  }

  el;
  stepMs;
  minOpacity;
  maxOpacity;
  stepOpacity;

  _currentDirection = null;
  _currentOpacity = this.maxOpacity;

  _currentInterval = null;
  _currentTimeout = null;

  fade(direction = fadeDirections.In) {
    this.stopFade();
    this._currentDirection = direction;

    var neededStepsCount = this._calculateNeededStepsCount(direction);

    if (neededStepsCount === 0) {
      return;
    }

    this._currentInterval = setInterval(() => {
      var newOpacity =
        direction === fadeDirections.In
          ? this._currentOpacity - this.stepOpacity
          : this._currentOpacity + this.stepOpacity;

      this._setElOpacity(newOpacity);
    }, this.stepMs);

    this._currentTimeout = setTimeout(() => {
      if (direction === fadeDirections.In) {
        this._setElOpacity(this.minOpacity);
      } else {
        this._setElOpacity(this.maxOpacity);
      }

      this.stopFade();
    }, this.stepMs * neededStepsCount);
  }

  fadeIn() {
    this.fade(fadeDirections.In);
  }

  fadeOut() {
    this.fade(fadeDirections.Out);
  }

  stopFade() {
    this._currentDirection = null;
    this._clear();
  }

  _calculateNeededStepsCount(direction = fadeDirections.In) {
    var currentOpacity = this._getElOpacity();

    if (
      (direction === fadeDirections.In && currentOpacity === this.minOpacity) ||
      (direction === fadeDirections.Out && currentOpacity === this.maxOpacity)
    ) {
      return 0;
    }

    var opacityToReach = Math.abs(
      direction === fadeDirections.In
        ? currentOpacity - this.minOpacity
        : this.maxOpacity - currentOpacity
    );
    var neededStepsCount = opacityToReach / this.stepOpacity;

    return neededStepsCount < 0 ? 0 : neededStepsCount;
  }

  _getElOpacity() {
    this._currentOpacity = parseFloat(this.el.style.opacity);

    return this._currentOpacity;
  }

  _setElOpacity(opacity) {
    this.el.style.opacity = opacity.toString();

    this._currentOpacity = opacity;
  }

  _clear() {
    clearInterval(this._currentInterval);
    clearTimeout(this._currentTimeout);
  }
}
