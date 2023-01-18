class StatusBarEndboss extends DrawableObject {
  percentage = 100;

  IMAGES_ENDBOSS = [
    './assets/img/7_statusbars/2_statusbar_endboss/green.png',
    './assets/img/7_statusbars/2_statusbar_endboss/blue.png',
    './assets/img/7_statusbars/2_statusbar_endboss/orange.png'
  ]

  constructor() {
    super().loadImage(this.IMAGES_ENDBOSSE[0]);
    this.loadAllImages(this.IMAGES_ENDBOSS);
    this.setPercentage(this.percentage);
    this.x = calc(720 - 30 - 170);
    this.y = -3;
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