class MovableObject extends DrawableObject {
  otherDirection = false;
  speed;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (!paused) {
        if (this.isAboveGround()) {
          this.y -= this.speedY;
          this.speedY -= this.acceleration;
        }
      }
    }, 1000 / 25)
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 190 || this.speedY > 0;
    }
  }

  hit(hitRate) {
    this.energy -= hitRate;
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Difference in milliseconds
    timePassed = timePassed / 1000; // Difference in seconds
    return timePassed < .5;
  }

  isDead() {
    return this.energy <= 0;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }
}