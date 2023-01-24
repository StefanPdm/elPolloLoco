class World {
  character = new Character();
  statusBarHealthBlue = new StatusBarHealth();
  statusBarCoinGreen = new StatusBarCoins();
  statusBarBottleOrange = new StatusBarBottles();
  statusBarEndboss = new StatusBarEndboss();
  levels = [setLevel1(), setLevel2()];
  level = this.levels[levelCounter];
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  bottles = [];
  coinsCollected = 0;
  bottlesCollected = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkActivities();
  }

  /** give Charater world variables */
  setWorld() {
    this.character.world = this;
  }

  /**
   * set check of collision and throwing activities of the Character 
   */
  checkActivities() {
    setInterval(() => {
      if (!paused) {
        this.checkCollision();
      }
    }, 10);
    setInterval(() => {
      if (!paused) {
        this.checkThrowObject();
      }
    }, 200);
  }

  /** check throwing of bottels */
  checkThrowObject() {
    if (this.keyboard.D && this.bottlesCollected > 0 && !this.character.otherDirection) {
      let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100);
      this.bottles.push(bottle);
      this.bottlesCollected -= 1;
      document.getElementById('bottlesCollected').innerHTML = /*html*/ `${this.bottlesCollected}`;
    }
  }

  /**
   * set check-collision functions
   */
  checkCollision() {
    this.checkCollisionEnemy();
    this.checkCollisionCollectable();
    this.checkCollisionBottleWithEndboss();
  }

  /** check collision with enemies */
  checkCollisionEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && enemy.alive) {
        if (!this.jumpCollision(enemy) && enemy.alive) {
          this.character.hit(0.5);
          this.statusBarHealthBlue.setPercentage(this.character.energy);
          this.character.hit_sound.play();
        } else {
          enemy.alive = false;
          enemy.loadImage('./assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
          this.level.chicken_sound.play();
        }
      };
    });
  }

  /** check if collision with an enemy was after jumping */
  jumpCollision(enemy) {
    let pepe = this.character.y + this.character.height - 10;
    let chicka = enemy.y + enemy.height - enemy.offset.bottom;
    return (pepe < chicka);
  }

  /** check collision with coin or bottle */
  checkCollisionCollectable() {
    this.level.collectables.forEach((collectable) => {
      if (this.character.isColliding(collectable)) {
        if (collectable.type === 'coin') {
          this.increaseCoinAmount(collectable);
          this.level.coin_sound.play();
        }
        if (collectable.type === 'bottle') {
          this.increaseBottleAmount(collectable);
          this.level.bottle_sound.play();
        }
      };
    });
  }

  /** check collision of throwed bottle with endboss */
  checkCollisionBottleWithEndboss() {
    this.bottles.forEach((flyingBottle) => {
      if (this.level.enemies[0].isColliding(flyingBottle)) {
        this.level.enemies[0].hit(20);
        flyingBottle.y = 600;
      }
    });
  }

  /** increase amount of coins */
  increaseCoinAmount(collectable) {
    collectable.y = -100;
    this.coinsCollected += 1;
    document.getElementById('coinsCollected').innerHTML = /*html*/ `${this.coinsCollected} / 10 `;
  }

  /** increase amount of bottles */
  increaseBottleAmount(collectable) {
    collectable.y = -100;
    this.bottlesCollected += 1;
    document.getElementById('bottlesCollected').innerHTML = /*html*/ `${this.bottlesCollected}`;
  }

  /** main draw function to call img-draw or array-img-draw  */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObject);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.collectables);
    this.addObjectsToMap(this.bottles);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
    // ab hier elemente die sich nicht verschieben
    this.addToMap(this.statusBarHealthBlue);
    this.addToMap(this.statusBarCoinGreen);
    this.addToMap(this.statusBarBottleOrange);
    this.addToMap(this.statusBarEndboss);
    // Draw wird immer wieder aufgerufen, je nach 
    self = this;
    requestAnimationFrame(function () {
      if (!gameOver) { self.draw(); }
    });
  }

  /** subdraw function for arrays */
  addObjectsToMap(objects) {
    objects.forEach(object => {
      this.addToMap(object);
    });
  }

  /** draw function with direction check */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    else {
      mo.draw(this.ctx);
    }

    // mo.drawFrame(this.ctx);
  };

  /** flip image when moving to left */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.scale(-1, 1);
    this.ctx.translate(-mo.width, 0);
    mo.x = mo.x * -1;
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}

