class Chicken extends MovableObject {
  height = 75;
  width = 75;
  y = 348;
  alive = true;


  IMAGES_WALKING = ['./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ];

  IMAGES_DEAD = [
    './assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
  ]

  constructor() {
    super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.x = 1000 + (Math.random() * 1500); // Zahl zwischen 1000 und 2500
    this.loadAllImages(this.IMAGES_WALKING); // lädt Pfade in imageCache(MovableObject)
    this.speed = (5 + (Math.random() * 3));
    this.animate();
    this.offset.top = 10;
    this.offset.bottom = 10;
    this.offset.left = 0;
    this.offset.right = 0;

  }

  animate() {
    setInterval(() => {
      if (!paused && this.alive) {
        if (this.x < 0 - this.width - 720) { this.x = 720 * 4 };
        this.moveLeft();
      }
    }, 1000 / 6);

    setInterval(() => {
      if (!paused) {
        if (this.alive) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 1000 / 6);
  }


}