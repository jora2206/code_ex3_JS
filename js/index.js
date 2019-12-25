var fadeEl = document.querySelector("#d1");
var fadeInBtnEl = document.querySelector("#btn-up");
var fadeOutBtnEl = document.querySelector("#btn-out");

var fadeToggler = new FadeToggler(fadeEl, 50, 0, 1, 0.05);

fadeInBtnEl.onclick = function() {
  fadeToggler.fadeIn();
};

fadeOutBtnEl.onclick = function() {
  fadeToggler.fadeOut();
};
