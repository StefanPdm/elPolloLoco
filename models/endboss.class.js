class Endboss extends MovableObject {
  width = 250;
  height = 400;
  alive = true;


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

  IMAGES_WALKING = [
    './assets/img/4_enemie_boss_chicken/1_walk/G1.png',
    './assets/img/4_enemie_boss_chicken/1_walk/G2.png',
    './assets/img/4_enemie_boss_chicken/1_walk/G3.png',
    './assets/img/4_enemie_boss_chicken/1_walk/G4.png'
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
    this.loadAllImages(this.IMAGES_WALKING);
    this.x = 2200;
    this.y = 50;
    this.offset.top = 120;
    this.offset.bottom = 30;
    this.offset.left = 40;
    this.offset.right = 40;
    this.animate();
    this.speed = 10;
  }

  animate() {
    setInterval(() => {
      if (!paused) {
        this.checkConstitution();
      }
    }, 1000 / 10);

    setInterval(() => {
      if (!paused && this.alive) {
        this.attackCharacter();
      }
    }, 1000 / 6);
  }

  stopTheGame() {
    world.level.gameover_sound.play();
    this.playAnimation(this.IMAGES_DEAD);
    this.loadImage(this.IMAGES_DEAD[2]);
    clearAllIntervals();
    if (levelCounter < world.levels.length - 1) {
      levelCounter += 1;
    }
    setTimeout(() => {
      exitGame('./assets/img/9_intro_outro_screens/game_over/game over.png');
    }, 1000);
  }

  attackCharacter() {
    if (this.energy < 100) {
      this.moveLeft();
      this.playAnimation(this.IMAGES_WALKING);
    };
  }

  checkConstitution() {
    if (this.isDead()) {
      this.stopTheGame();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      world.level.chicken_sound.play();
    } else if (this.energy < 100) {
      return
    } else {
      this.playAnimation(this.IMAGES_ALERT);
    }
  }
}