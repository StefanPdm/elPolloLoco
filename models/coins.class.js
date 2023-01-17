class Coin extends DrawableObject {
  type;
  IMAGES_COIN = [
    './assets/img/8_coin/coin_1.png',
    './assets/img/8_coin/coin_2.png'
  ]

  constructor() {
    super();
    this.loadImage('./assets/img/8_coin/coin_1.png');
    this.loadAllImages(this.IMAGES_COIN);
    this.x = -200 + (Math.random() * 1800); // Zahl zwischen 200 und 2000
    this.y = 180 + (Math.random() * 200);   // Zahl zwischen 180 und 380 
    this.width = 50;
    this.height = 50;
    this.offset.top = 10;
    this.offset.bottom = 10;
    this.offset.left = 10;
    this.offset.right = 10;
    this.animate();
    this.type = 'coin'
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 1000 / 2)

  }

}