class StatusBarEndboss extends DrawableObject {
  percentage = 100;

  IMAGES_ENDBOSS = [
    './assets/img/7_statusbars/2_statusbar_endboss/100.png',
    './assets/img/7_statusbars/2_statusbar_endboss/80.png',
    './assets/img/7_statusbars/2_statusbar_endboss/60.png',
    './assets/img/7_statusbars/2_statusbar_endboss/40.png',
    './assets/img/7_statusbars/2_statusbar_endboss/20.png',
    './assets/img/7_statusbars/2_statusbar_endboss/0.png',

  ]

  constructor() {
    super().loadImage(this.IMAGES_ENDBOSS[0]);
    this.loadAllImages(this.IMAGES_ENDBOSS);
    this.setPercentage(this.percentage);
    this.x = (720 - 30 - 170);
    this.y = -3;
    this.width = 170;
    this.height = 40;
  }

  // set percentage
  setPercentage(percentage) {
    this.percentage = percentage;
    setInterval(() => {
      let path = this.IMAGES_ENDBOSS[this.resolveImageIndex()];// => aus % muss Zahl von 0-5 ermittelt werden(IMAGES.length)
      this.img = this.imageCache[path];
    }, 1000 / 20);
  }

  resolveImageIndex() {
    this.percentage = world.level.enemies[0].energy;
    if (this.percentage == 100) {
      return 0;
    } else if (this.percentage >= 80) {
      return 1;
    } else if (this.percentage >= 60) {
      return 2;
    } else if (this.percentage >= 40) {
      return 3;
    } else if (this.percentage > 0) {
      return 4;
    } else {
      return 5;
    }
  }
}