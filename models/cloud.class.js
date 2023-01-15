class Cloud extends MovableObject {
  width = 500;
  height = 250;
  speed = .1;

  constructor(img) {
    super().loadImage(img);
    this.x = Math.random() * 720;
    this.y = 10 + Math.random() * 50;
    this.animate();
  }

  animate() {
    this.moveLeft();
  }


}