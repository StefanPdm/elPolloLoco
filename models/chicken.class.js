class Chicken extends MovableObject {
  height = 75;
  width = 75;
  y = 348;


  IMAGES_WALKING = ['../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    '../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    '../assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ];




  constructor() {
    super().loadImage('../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.x = 400 + (Math.random() * 1500); // Zahl zwischen 400 und 1900
    this.loadAllImages(this.IMAGES_WALKING); // lädt Pfade in imageCache(MovableObject)
    this.speed = (Math.random() * (0.3 - 0.1) + 0.6);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.x < 0 - this.width - 720) { this.x = 720 * 4 };
      this.moveLeft();
    }), 1000 / 6;

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);

    }, 1000 / 6)
  }


}