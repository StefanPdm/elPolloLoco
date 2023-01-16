class World {
  character = new Character();
  // enemies = level1.enemies;
  // clouds = level1.clouds;
  // backgroundObject = level1.backgroundObject;
  statusBarHealthBlue = new StatusBarHealth();
  statusBarCoinGreen = new StatusBarCoins();
  level = level1; // greift auf die o.g. Variablen zu 
  worldCanvas;
  ctx;
  keyboard;
  camera_x = 0;
  bottles = [];
  coinsCollected = 0;


  constructor(canvasGame, keyboard) {
    this.ctx = canvasGame.getContext('2d');
    this.worldCanvas = canvasGame;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkActivities();
  }

  setWorld() {
    this.character.world = this;
  }

  checkActivities() {
    setInterval(() => {
      // check throwing bottle
      this.checkThrowObject();
      // Check collisions ///////////////////////////////
      this.checkCollision();
    }, 200);
  }

  checkThrowObject() {
    // check throwing bottles
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100);
      this.bottles.push(bottle);
    }

  }

  checkCollision() {
    this.checkCollisionEnemy();
    this.checkCollisionCoin();
  }


  checkCollisionEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBarHealthBlue.setPercentage(this.character.energy);
      };
    });
  }

  checkCollisionCoin() {
    this.level.coins.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        console.log('Character is colliding with coin:', this.level.coins[i], 'Index:', i);
        coin.y = -100;
        this.coinsCollected += 1;
        document.getElementById('coinsCollected').innerHTML = /*html*/ `${this.coinsCollected} / 10 `;
      };
    });
  }





  draw() {
    // Clear Canvas before draw (again)
    this.ctx.clearRect(0, 0, this.worldCanvas.width, this.worldCanvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObject);

    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);

    this.addToMap(this.character);
    this.addObjectsToMap(this.bottles);
    this.ctx.translate(-this.camera_x, 0);
    // ab hier elemente die sich nicht verschieben
    this.addToMap(this.statusBarHealthBlue);
    this.addToMap(this.statusBarCoinGreen);
    // Draw wird immer wieder aufgerufen, je nach 
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach(object => {
      this.addToMap(object);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    } else {
      mo.draw(this.ctx);
    }

    mo.drawFrame(this.ctx);

  };

  flipImage(mo) {
    this.ctx.save();
    this.ctx.scale(-1, 1);
    this.ctx.translate(-mo.width, 0);
    mo.x = mo.x * -1;
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }
}

