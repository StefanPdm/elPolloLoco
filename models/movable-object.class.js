class MovableObject extends DrawableObject {
  otherDirection = false;
  speed;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround()) {
        this.y -= this.speedY;  //195 - 30 = 165| 165 - 27.5 = 137,5 ....
        this.speedY -= this.acceleration;
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

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  isColliding(obj) {
    // console.log('Collision check', obj);
    // console.log('this.x', this.x);
    // console.log('this.width', this.width);
    return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
      (this.y + this.height) >= obj.y &&
      (this.y) <= (obj.y + obj.height);
    // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    // && obj.onCollisionCourse;
  }

  hit() {
    this.energy -= 5;
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


  playAnimation(images) {
    ///////// Walk Animation
    // Modulo % erzeugt Werte von 0-5 (5=IMAGES_WALKING.length)
    let i = this.currentImage % images.length; //Modulo
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
    // if (i == 5) { this.currentImage = 0 }; <-- nicht mehr nötig, da Modulo Fkt. oben
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