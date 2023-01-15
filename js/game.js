let canvas;
let world;
let keyboard = new Keyboard();
let currentKey;


function init() {
  canvasGame = document.getElementById('canvas');
  world = new World(canvasGame, keyboard);
  // console.log('My enemies are:', world.level.enemies);
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