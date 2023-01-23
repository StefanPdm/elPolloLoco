class ThrowableObject extends MovableObject {

  IMAGES_BOTTLE_ROTATION = [
    './assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    './assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    './assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    './assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
  ]

  IMAGES_BOTTLE_SPLASH = [
    './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ]

  constructor(x, y) {
    super().loadImage(this.IMAGES_BOTTLE_ROTATION[0]);
    this.loadAllImages(this.IMAGES_BOTTLE_ROTATION);
    this.loadAllImages(this.IMAGES_BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.angle =
      this.width = 50;
    this.height = 50;
    this.throw();
    this.animate();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }

  animate() {
    setInterval(() => {
      if (!paused) {
        this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
      }
    }, 1000 / 25);
  }
}