class Bottle extends DrawableObject {
  type;

  IMAGES_BOTTLE = [
    './assets/img/6_salsa_bottle/salsa_bottle.png'

  ]

  constructor() {
    super();
    this.loadImage(this.IMAGES_BOTTLE[0]);

    this.loadAllImages(this.IMAGES_BOTTLE);
    this.x = -600 + (Math.random() * 1800) + (Math.random() * 1000); // Zahl zwischen -600 und 1800
    this.y = 180 + (Math.random() * 200);   // Zahl zwischen 180 und 380 
    this.width = 50;
    this.height = 50;
    this.offset.top = 10;
    this.offset.bottom = 10;
    this.offset.left = 20;
    this.offset.right = 20;
    this.type = 'bottle';
  }
}