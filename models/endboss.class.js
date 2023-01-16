class Endboss extends MovableObject {
  width = 250;
  height = 400;


  IMAGES_WALKING = [
    './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
    './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
    './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
    './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
    './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
    './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
    './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
    './assets/img/4_enemie_boss_chicken/2_alert/G12.png'
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadAllImages(this.IMAGES_WALKING);
    this.x = 2200;
    this.y = 50;
    this.offset.top = 120;
    this.offset.bottom = 30;
    this.offset.left = 40;
    this.offset.right = 40;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);

    }, 1000 / 6)
  }
}