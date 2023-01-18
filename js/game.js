let canvas;
let world;
let keyboard = new Keyboard();
let currentKey;
let ctx;
let screen;
let playbutton;

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  // world = new World(canvas, keyboard);
  // console.log('My enemies are:', world.level.enemies);
  screen = new Image();
  screen.src = './assets/img/9_intro_outro_screens/start/startscreen_1.png';
  playbutton = new Image();
  playbutton.src = './assets/img/9_intro_outro_screens/start/play-button.png';
  setTimeout(() => {
    ctx.drawImage(screen, 0, 0, 720, 480);
    ctx.drawImage(playbutton, 350, 50, 50, 50);
  }, 100);
  console.log('end of init');
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

function gameOver() {
  clearAllIntervals();
  ctx.drawImage('./assets/img/5_background/first_half_background.png', 0, 0);
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}