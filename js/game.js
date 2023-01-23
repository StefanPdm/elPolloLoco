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
  showGameButtons();

}

function toogleViewofElements() {
  document.getElementById('coinsCollected').classList.toggle('d-none');
  document.getElementById('bottlesCollected').classList.toggle('d-none');
  document.getElementById('pause-button').classList.toggle('d-none');
  document.getElementById('start-button').classList.toggle('d-none');
}

function showGameButtons() {

  document.getElementById('left-button').classList.remove('d-none');
  document.getElementById('right-button').classList.remove('d-none');
  document.getElementById('jump-button').classList.remove('d-none');
  document.getElementById('throw-button').classList.remove('d-none');
}

function hideGameButtons() {
  // document.getElementById('start-button').classList.add('d-none');
  document.getElementById('left-button').classList.add('d-none');
  document.getElementById('right-button').classList.add('d-none');
  document.getElementById('jump-button').classList.add('d-none');
  document.getElementById('throw-button').classList.add('d-none');
}



function setButtonListener() {
  setStartButtonListener();
  setHelpButtonListener();
  setRightButtonListener();
  setLeftButtonListener();
  setJumpButtonListener();
  setThrowButtonListener();
  setPauseButtonListener();
}

function setStartButtonListener() {
  start = document.getElementById('start-button');
  start.addEventListener('click', startGame);
}

function setPauseButtonListener() {
  pause = document.getElementById('pause-button');
  pause.addEventListener('click', pauseAllIntervals);
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
    // console.log('Event:', event)
    world.keyboard.RIGHT = true;
  })
  goRight.addEventListener('touchend', function (event) {
    // console.log('Event:', event)
    world.keyboard.RIGHT = false;
  })
}

function setLeftButtonListener() {
  goLeft = document.getElementById('left-button');
  goLeft.addEventListener('touchstart', function (event) {
    // console.log('Event:', event)
    world.keyboard.LEFT = true;
  })
  goLeft.addEventListener('touchend', function (event) {
    // console.log('Event:', event)
    world.keyboard.LEFT = false;
  })
}

function setJumpButtonListener() {
  jump = document.getElementById('jump-button');
  jump.addEventListener('touchstart', function (event) {
    // console.log('Event:', event)
    world.keyboard.SPACE = true;
  })
  jump.addEventListener('touchend', function (event) {
    // console.log('Event:', event)
    world.keyboard.SPACE = false;
  })
}

function setThrowButtonListener() {
  throwed = document.getElementById('throw-button');
  throwed.addEventListener('touchstart', function (event) {
    // console.log('Event:', event)
    world.keyboard.D = true;
  })
  throwed.addEventListener('touchend', function (event) {
    // console.log('Event:', event)
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
  // console.log('Taste gedrückt:', KeyboardEvent.code);
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
  // console.log('Taste losgelassen:', KeyboardEvent.code);
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

