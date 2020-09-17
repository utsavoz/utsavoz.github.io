(function () {
  var index = 0,
    bars = document.querySelectorAll(".set>.bar"),
    numBars = bars.length;
  (function step() {
    bars[(index - 1 + numBars) % numBars].classList.remove("active");
    bars[index].classList.add("active");
    index = (index + 1) % numBars;
    setTimeout(step, 250);
  })();
})();
