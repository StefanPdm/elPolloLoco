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

  setWorld() {
    this.character.world = this;
  }

  checkActivities() {
    setInterval(() => {
      // Check collisions ///////////////////////////////
      this.checkCollision();
    }, 10);

    setInterval(() => {
      // check throwing bottle
      this.checkThrowObject();

    }, 200);




  }

  checkThrowObject() {
    // check throwing bottles
    if (this.keyboard.D && this.bottlesCollected > 0 && !this.character.otherDirection) {
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
      if (this.character.isColliding(enemy) && enemy.alive) {
        if (!this.jumpCollision(enemy) && enemy.alive) {
          this.character.hit(0.5);
          this.statusBarHealthBlue.setPercentage(this.character.energy);
        } else {
          console.log('Jumging Hit');
          enemy.alive = false;
          enemy.loadImage('./assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        }
      };
    });
  }

  jumpCollision(enemy) {
    let pepe = this.character.y + this.character.height - 10;
    let chicka = enemy.y + enemy.height - enemy.offset.bottom;
    console.log('Pepe:', pepe, ' Chicka:', chicka);
    return pepe < chicka;
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
        this.level.enemies[0].hit(20);
        flyingBottle.y = 600;
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

  addObjectsToMap(objects) {
    objects.forEach(object => {
      this.addToMap(object);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    else {
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

}

