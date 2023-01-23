class Cloud extends MovableObject {
  width = 500;
  height = 250;
  speed = 1;

  constructor(img) {
    super().loadImage(img);
    this.x = -720 + (Math.random() * 3500);
    this.y = 10 + Math.random() * 50;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.x < 0 - this.width - 720) { this.x = 720 * 4 };
      this.moveLeft();
    }, 1000 / 10);
  }


}