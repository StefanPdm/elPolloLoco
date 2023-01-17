class ThrowableObject extends MovableObject {
  IMAGES_BOTTLE = ['./assets/img/6_salsa_bottle/salsa_bottle.png',
    './assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
  ]

  constructor(x, y) {
    super().loadImage(this.IMAGES_BOTTLE[0]);
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}