class World {
  character = new Character();
  // enemies = level1.enemies;
  // clouds = level1.clouds;
  // backgroundObject = level1.backgroundObject;
  statusBarHealthBlue = new StatusBar();
  level = level1; // greift auf die o.g. Variablen zu 
  worldCanvas;
  ctx;
  keyboard;
  camera_x = 0;
  bottles = [];


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
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        // console.log('Character is colliding with enemy:', enemy);
        this.character.hit();
        this.statusBarHealthBlue.setPercentage(this.character.energy);
        console.log('Character energy:', this.character.energy);
        // console.log('Dead', this.character.isDead());
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
    this.addToMap(this.character);
    this.addObjectsToMap(this.bottles);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarHealthBlue);
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
}

