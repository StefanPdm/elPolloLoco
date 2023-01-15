class StatusBar extends DrawableObject {
  percentage = 100;


  IMAGES_HEALTH_BLUE = [
    '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
  ];

  constructor() {
    super().loadImage(this.IMAGES_HEALTH_BLUE[5]);
    this.loadAllImages(this.IMAGES_HEALTH_BLUE);
    this.setPercentage(this.percentage);
    this.x = 50;
    this.y = 0;
    this.width = 170;
    this.height = 40;
  }

  // set percentage
  setPercentage(percentage) {
    this.percentage = percentage;
    setInterval(() => {
      let path = this.IMAGES_HEALTH_BLUE[this.resolveImageIndex()];// => aus % muss Zahl von 0-5 ermittelt werden(IMAGES.length)
      this.img = this.imageCache[path];
    }, 1000 / 20);
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }
}
