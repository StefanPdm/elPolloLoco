class BackgroundObject extends MovableObject {

  width = 720;
  height = 480;


  constructor(imagePath, x, parallax) {
    super().loadImage(imagePath);
    this.x = x;
    this.parallax = parallax;
    this.y = 480 - this.height;
  }
}