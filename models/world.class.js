class World {
  character = new Character();
  statusBarHealthBlue = new StatusBarHealth();
  statusBarCoinGreen = new StatusBarCoins();
  statusBarBottleOrange = new StatusBarBottles();
  level = level1;
  worldCanvas;
  ctx;
  keyboard;
  camera_x = 0;
  bottles = [];
  coinsCollected = 0;
  bottlesCollected = 0;


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
    }, 100);
  }

  checkThrowObject() {
    // check throwing bottles
    if (this.keyboard.D && this.bottlesCollected > 0) {
      let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100);
      this.bottles.push(bottle);
      this.bottlesCollected -= 1;
      document.getElementById('bottlesCollected').innerHTML = /*html*/ `${this.bottlesCollected}`;
    }
  }

  checkCollision() {
    this.checkCollisionEnemy();
    this.checkCollisionCollectable();
    this.checkCollisionBottleWithEndboss();
  }

  checkCollisionEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit(5);
        this.statusBarHealthBlue.setPercentage(this.character.energy);
      };
    });
  }

  checkCollisionCollectable() {
    this.level.collectables.forEach((collectable) => {
      if (this.character.isColliding(collectable)) {

        if (collectable.type === 'coin') {
          this.increaseCoinAmount(collectable);
        }
        if (collectable.type === 'bottle') {
          this.increaseBottleAmount(collectable);
        }
      };
    });
  }

  checkCollisionBottleWithEndboss() {
    this.bottles.forEach((flyingBottle) => {
      if (this.level.enemies[0].isColliding(flyingBottle)) {
        console.log('Endboss hidden!!!!');
        this.level.enemies[0].hit(4);
        console.log('Energy:', this.level.enemies[0].energy);
      }
    });
  }

  increaseCoinAmount(collectable) {
    collectable.y = -100;
    this.coinsCollected += 1;
    document.getElementById('coinsCollected').innerHTML = /*html*/ `${this.coinsCollected} / 10 `;
  }

  increaseBottleAmount(collectable) {
    collectable.y = -100;
    this.bottlesCollected += 1;
    document.getElementById('bottlesCollected').innerHTML = /*html*/ `${this.bottlesCollected}`;
    // console.log('Bottles collected: ', this.bottlesCollected);
  }

  draw() {
    // Clear Canvas before draw (again)
    this.ctx.clearRect(0, 0, this.worldCanvas.width, this.worldCanvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObject);

    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.collectables);


    this.addToMap(this.character);
    this.addObjectsToMap(this.bottles);
    this.ctx.translate(-this.camera_x, 0);
    // ab hier elemente die sich nicht verschieben
    this.addToMap(this.statusBarHealthBlue);
    this.addToMap(this.statusBarCoinGreen);
    this.addToMap(this.statusBarBottleOrange);
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

