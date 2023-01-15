class CollectableObject extends DrawableObject {

  IMAGES_COIN = [
    '../assets/img/8_coin/coin_1.png',
    '../assets/img/8_coin/coin_2.png'
  ]

  constructor() {
    super();
    this.loadImage('../assets/img/8_coin/coin_1.png');
    this.loadAllImages(this.IMAGES_COIN);
    this.x = 200 + (Math.random() * 1800); // Zahl zwischen 200 und 12 00
    this.y = 180 + (Math.random() * 200);   // Zahl zwischen 200 und 500 
    this.animate();
    this.width = 50;
    this.height = 50;
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 1000 / 2)

  }

}