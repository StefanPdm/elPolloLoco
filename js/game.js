"use strict"

let canvas;
let world;
let keyboard = new Keyboard();
let currentKey;
let ctx;
let screen = new Image();
let endScreenOverlay = new Image();
let playbutton;
let start;
let help;
let goLeft;
let goRight;
let jump;
let gameOver = false;
let throwed;
let levelCounter = 0;
let pause;
let paused = false;
let fullScreenContainer;
let fullscreen;
let fullscreenOn = false;
let isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;
console.log('is touch device:', isTouchDevice);



function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  drawStartScreen();
  setButtonListener();
}

function drawStartScreen() {
  screen.src = './assets/img/9_intro_outro_screens/start/startscreen_1.png';
  setTimeout(() => {
    ctx.clearRect(0, 0, 720, 480);
    ctx.drawImage(screen, 0, 0, 720, 480);
  }, 200);
  ;
}

function drawEndScreen(img) {
  screen.src = './assets/img/5_background/first_half_background.png';
  endScreenOverlay.src = img;
  ctx.clearRect(0, 0, 720, 480);
  setTimeout(() => {
    ctx.drawImage(screen, 0, 0, 720, 480);
    ctx.drawImage(endScreenOverlay, 0, 0, 720, 480);
  }, 400);
}

function startGame() {
  world = '';
  gameOver = false;
  world = new World(canvas, keyboard);
  toogleViewofElements();
  if (isTouchDevice) { showGameButtons() };
}

function toogleViewofElements() {
  document.getElementById('coinsCollected').classList.toggle('d-none');
  document.getElementById('bottlesCollected').classList.toggle('d-none');
  document.getElementById('pause-button').classList.toggle('d-none');
  document.getElementById('start-button').classList.toggle('d-none');
  document.getElementById('fullscreen-button').classList.toggle('d-none');
}

function showGameButtons() {
  document.getElementById('left-button').classList.remove('d-none');
  document.getElementById('right-button').classList.remove('d-none');
  document.getElementById('jump-button').classList.remove('d-none');
  document.getElementById('throw-button').classList.remove('d-none');

}

function hideGameButtons() {
  document.getElementById('left-button').classList.add('d-none');
  document.getElementById('right-button').classList.add('d-none');
  document.getElementById('jump-button').classList.add('d-none');
  document.getElementById('throw-button').classList.add('d-none');
  document.getElementById('fullscreen-button').classList.add('d-none');
}

function setButtonListener() {
  setStartButtonListener();
  setHelpButtonListener();
  setRightButtonListener();
  setLeftButtonListener();
  setJumpButtonListener();
  setThrowButtonListener();
  setPauseButtonListener();
  setFullscreenButtonListener();
}

function setStartButtonListener() {
  start = document.getElementById('start-button');
  start.addEventListener('click', startGame);
}

function setPauseButtonListener() {
  pause = document.getElementById('pause-button');
  pause.addEventListener('click', pauseAllIntervals);
}

function setFullscreenButtonListener() {
  fullscreen = document.getElementById('fullscreen-button');
  fullscreen.addEventListener('click', toggleFullscreen);
  fullScreenContainer = document.getElementById('game__main-container');
  fullScreenContainer.addEventListener('fullscreenchange', toggleFullscreenStatus);
}

function toggleFullscreenStatus() {
  if (!fullscreenOn) {
    fullscreenOn = true;
    document.getElementById('fullscreen-button').style.backgroundImage = 'url(./assets/img/buttons/exit-fullscreen-button.png)';
  } else {
    fullscreenOn = false;
    document.getElementById('fullscreen-button').style.backgroundImage = 'url(./assets/img/buttons/fullscreen-button.png)';
  }
}

function toggleFullscreen() {
  if (fullscreenOn) {
    closeFullscreen();

  } else {
    openFullscreen(fullScreenContainer);
  }
}

function setHelpButtonListener() {
  help = document.getElementById('help-button');
  help.addEventListener('click', function () {
    document.getElementById('help-button').classList.toggle('showHelp');
  })
}

function setRightButtonListener() {
  goRight = document.getElementById('right-button');
  goRight.addEventListener('touchstart', function (event) {
    world.keyboard.RIGHT = true;
  })
  goRight.addEventListener('touchend', function (event) {
    world.keyboard.RIGHT = false;
  })
}

function setLeftButtonListener() {
  goLeft = document.getElementById('left-button');
  goLeft.addEventListener('touchstart', function (event) {
    world.keyboard.LEFT = true;
  })
  goLeft.addEventListener('touchend', function (event) {
    world.keyboard.LEFT = false;
  })
}

function setJumpButtonListener() {
  jump = document.getElementById('jump-button');
  jump.addEventListener('touchstart', function (event) {
    world.keyboard.SPACE = true;
  })
  jump.addEventListener('touchend', function (event) {
    world.keyboard.SPACE = false;
  })
}

function setThrowButtonListener() {
  throwed = document.getElementById('throw-button');
  throwed.addEventListener('touchstart', function (event) {
    world.keyboard.D = true;
  })
  throwed.addEventListener('touchend', function (event) {
    world.keyboard.D = false;
  })
}

function pauseAllIntervals() {
  if (paused) {
    paused = false;
    document.getElementById('pause-button').style.backgroundImage = 'url(./assets/img/buttons/pause-button.png)';
  } else {
    paused = true;
    document.getElementById('pause-button').style.backgroundImage = 'url(./assets/img/buttons/play-button.png)';
    world.character.walking_sound.pause();
  }
}



function exitGame(img) {
  gameOver = true;
  drawEndScreen(img);
  toogleViewofElements();
  hideGameButtons();
  world = '';
  document.getElementById('bottlesCollected').innerHTML = /*html*/ `0`;
  document.getElementById('coinsCollected').innerHTML = /*html*/ `0 / 10 `;
}

// Hinweis: Pfeiltasten werden nur bei keydown getriggert, NICHT bei keypress
window.addEventListener('keydown', (KeyboardEvent) => {
  currentKey = KeyboardEvent.code;
  if (currentKey === 'ArrowRight') {
    keyboard.RIGHT = true;
  }
  if (currentKey === 'ArrowLeft') {
    keyboard.LEFT = true;
  }
  if (currentKey === 'ArrowUp') {
    keyboard.UP = true;
  }
  if (currentKey === 'ArrowDown') {
    keyboard.DOWN = true;
  }
  if (currentKey === 'Space') {
    keyboard.SPACE = true;
  };
  if (currentKey === 'KeyD') {
    keyboard.D = true;
  }
});

window.addEventListener('keyup', (KeyboardEvent) => {
  currentKey = KeyboardEvent.code;
  if (currentKey === 'ArrowRight') {
    keyboard.RIGHT = false;
  }
  if (currentKey === 'ArrowLeft') {
    keyboard.LEFT = false;
  }
  if (currentKey === 'ArrowUp') {
    keyboard.UP = false;
  }
  if (currentKey === 'ArrowDown') {
    keyboard.DOWN = false;
  }
  if (currentKey === 'Space') {
    keyboard.SPACE = false;
  };
  if (currentKey === 'KeyD') {
    keyboard.D = false;
  }
});



function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}