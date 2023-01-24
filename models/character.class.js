class Character extends MovableObject {
  height = 240;
  y = -30;
  world;
  speed = 5;
  walking_sound = new Audio('./assets/audio/running2.mp3');
  hit_sound = new Audio('./assets/audio/hit.mp3');
  lost_sound = new Audio('./assets/audio/lost.mp3');
  screen;


  IMAGES_WAITING = [
    './assets/img/2_character_pepe/1_idle/idle/I-1.png',
    './assets/img/2_character_pepe/1_idle/idle/I-2.png',
    './assets/img/2_character_pepe/1_idle/idle/I-3.png',
    './assets/img/2_character_pepe/1_idle/idle/I-4.png',
    './assets/img/2_character_pepe/1_idle/idle/I-5.png',
    './assets/img/2_character_pepe/1_idle/idle/I-6.png',
    './assets/img/2_character_pepe/1_idle/idle/I-7.png',
    './assets/img/2_character_pepe/1_idle/idle/I-8.png',
    './assets/img/2_character_pepe/1_idle/idle/I-9.png',
    './assets/img/2_character_pepe/1_idle/idle/I-10.png'
  ];

  IMAGES_WALKING = [
    './assets/img/2_character_pepe/2_walk/W-21.png',
    './assets/img/2_character_pepe/2_walk/W-22.png',
    './assets/img/2_character_pepe/2_walk/W-23.png',
    './assets/img/2_character_pepe/2_walk/W-24.png',
    './assets/img/2_character_pepe/2_walk/W-25.png',
    './assets/img/2_character_pepe/2_walk/W-26.png'
  ];

  IMAGES_JUMPING = [
    'assets/img/2_character_pepe/3_jump/J-31.png',
    'assets/img/2_character_pepe/3_jump/J-32.png',
    'assets/img/2_character_pepe/3_jump/J-33.png',
    'assets/img/2_character_pepe/3_jump/J-34.png',
    'assets/img/2_character_pepe/3_jump/J-35.png',
    'assets/img/2_character_pepe/3_jump/J-36.png',
    'assets/img/2_character_pepe/3_jump/J-37.png',
    'assets/img/2_character_pepe/3_jump/J-38.png',
    'assets/img/2_character_pepe/3_jump/J-39.png',
  ];

  IMAGES_DEAD = [
    'assets/img/2_character_pepe/5_dead/D-51.png',
    'assets/img/2_character_pepe/5_dead/D-52.png',
    'assets/img/2_character_pepe/5_dead/D-53.png',
    'assets/img/2_character_pepe/5_dead/D-54.png',
    'assets/img/2_character_pepe/5_dead/D-55.png',
    'assets/img/2_character_pepe/5_dead/D-56.png',
    'assets/img/2_character_pepe/5_dead/D-57.png'
  ];

  IMAGES_HURT = [
    'assets/img/2_character_pepe/4_hurt/H-41.png',
    'assets/img/2_character_pepe/4_hurt/H-42.png',
    'assets/img/2_character_pepe/4_hurt/H-43.png',
  ];

  constructor() {
    super().loadImage('./assets/img/2_character_pepe/2_walk/W-21.png');
    this.offset.top = 110;
    this.offset.bottom = 30;
    this.offset.left = 30;
    this.offset.right = 30;
    this.loadAllImages(this.IMAGES_WAITING);
    this.loadAllImages(this.IMAGES_WALKING);
    this.loadAllImages(this.IMAGES_JUMPING);
    this.loadAllImages(this.IMAGES_DEAD);
    this.loadAllImages(this.IMAGES_HURT);
    this.animate();
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      if (!paused) {
        this.checkCharacterActivites();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!paused) {
        this.checkCharacterCondition();
      }
    }, 1000 / 10)
  }

  wantMovingRight() {
    return (world.keyboard.RIGHT && this.x < this.world.level.level_end_x)
  }

  letMovingRight() {
    this.otherDirection = false;
    this.moveRight();
    this.walking_sound.play();
  }

  wantMovingLeft() {
    return (world.keyboard.LEFT && this.x > -600);
  }

  letMovingLeft() {
    this.otherDirection = true;
    this.moveLeft();
    this.walking_sound.play();
  }

  dontWalkOrJump() {
    return (!world.keyboard.LEFT && !world.keyboard.RIGHT || this.y < 195);
  }

  stopWalkingSound() {
    // stop walking sound
    this.walking_sound.pause();
    this.walking_sound.currentTime = 0;
  }

  playDeathAnimation() {
    // if dead abort character
    this.playAnimation(this.IMAGES_DEAD);
    this.y += this.speed * 2;
  }

  outsideViewpoint() {
    return (this.y > 450);
  }

  stopTheGame() {
    clearAllIntervals();
    this.walking_sound.pause();
    this.walking_sound.currentTime = 0;
    exitGame('./assets/img/9_intro_outro_screens/game_over/you lost.png');
  }

  checkCharacterActivites() {
    if (this.wantMovingRight()) {
      this.letMovingRight();
    }
    if (this.wantMovingLeft()) {
      this.letMovingLeft();
    }
    if (this.dontWalkOrJump()) {
      this.stopWalkingSound();
    }
    if (world.keyboard.SPACE && !this.isAboveGround()) {
      // let Pepe jump
      this.jump();
    }
    // move camera position 
    this.world.camera_x = -this.x + 120;
  }

  checkCharacterCondition() {
    if (this.isDead()) {
      this.playDeathAnimation();
      this.lost_sound.play();
      if (this.outsideViewpoint()) {
        this.stopTheGame();
      }
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.playAnimation(this.IMAGES_WAITING);
    }
  }
}
