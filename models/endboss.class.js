class Endboss extends MovableObject {
  width = 250;
  height = 400;


  IMAGES_ALERT = [
    './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
    './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
    './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
    './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
    './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
    './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
    './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
    './assets/img/4_enemie_boss_chicken/2_alert/G12.png'
  ];

  IMAGES_HURT = [
    './assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
    './assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
    './assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
  ];

  IMAGES_DEAD = [
    './assets/img/4_enemie_boss_chicken/5_dead/G24.png',
    './assets/img/4_enemie_boss_chicken/5_dead/G25.png',
    './assets/img/4_enemie_boss_chicken/5_dead/G26.png'
  ];


  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadAllImages(this.IMAGES_ALERT);
    this.loadAllImages(this.IMAGES_HURT);
    this.loadAllImages(this.IMAGES_DEAD);
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
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.loadImage(this.IMAGES_DEAD[2]);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else {
        this.playAnimation(this.IMAGES_ALERT);
      }
    }, 1000 / 10)







  }
}