// Custom Pointer Variables --- Starts Here
const outerCursor = document.querySelector(".pointer-outer");
const innerCursor = document.querySelector(".pointer-inner");
const outerCursorBox = outerCursor.getBoundingClientRect();
const hover = document.getElementsByTagName("a");
let outerCursorSpeed = 0.5;
let clientX = -100;
let clientY = -100;
let showCursor = false;
let isStuck = false;

const cursorHidden = false;

// Custom Pointer Variables --- Ends Here
window.addEventListener("DOMContentLoaded", init);

function initCursor() {
  if (cursorHidden) {
    document.body.classList.add("cursor-hidden");
  }

  const unveilCursor = () => {
    TweenMax.set(innerCursor, {
      x: clientX,
      y: clientY,
    });

    TweenMax.set(outerCursor, {
      x: clientX - outerCursorBox.width / 2,
      y: clientY - outerCursorBox.height / 2,
    });

    showCursor = true;
  };

  document.addEventListener("mousemove", unveilCursor, false);

  for (var i = hover.length - 1; i >= 0; --i) {
    hover[i].addEventListener("mouseenter", (e) => {
      outerCursor.classList.add("is-hover");
      innerCursor.classList.add("is-hover");
    });
    hover[i].addEventListener("mouseleave", (e) => {
      outerCursor.classList.remove("is-hover");
      innerCursor.classList.remove("is-hover");
    });
  }

  document.addEventListener("mousemove", e => {
  	clientX = e.clientX;
  	clientY = e.clientY;
  }, false);

  const render = () => {
    TweenMax.set(innerCursor, {
      x: clientX,
      y: clientY,
    });

    if (!isStuck) {
      TweenMax.to(outerCursor, outerCursorSpeed, {
        x: clientX - outerCursorBox.width / 2,
        y: clientY - outerCursorBox.height / 2,
      });
    }

    if (showCursor) {
      document.removeEventListener("mousemove", unveilCursor);
    }

    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
}

function init() {
  initCursor();
}
