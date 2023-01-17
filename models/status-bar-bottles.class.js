class StatusBarBottles extends DrawableObject {
  percentage = 0;

  IMAGES_BOTTLE_ORANGE = [
    './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
    './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
    './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
    './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
    './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
    './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
  ]

  constructor() {
    super().loadImage(this.IMAGES_BOTTLE_ORANGE[0]);
    this.loadAllImages(this.IMAGES_BOTTLE_ORANGE);
    this.width = 170;
    this.height = 40;
    this.x = 30;
    this.y = 63;
    this.setPercentage(this.percentage);
  }

  // set percentage
  setPercentage(percentage) {
    this.percentage = percentage;

    setInterval(() => {
      let path = this.IMAGES_BOTTLE_ORANGE[this.resolveImageIndex()];// => aus % muss Zahl von 0-5 ermittelt werden(IMAGES.length)
      this.img = this.imageCache[path];
    }, 1000 / 20);
  }

  resolveImageIndex() {
    this.percentage = world.bottlesCollected;
    if (this.percentage * 10 == 120) {
      return 5;
    } else if (this.percentage * 10 >= 90) {
      return 4;
    } else if (this.percentage * 10 >= 70) {
      return 3;
    } else if (this.percentage * 10 >= 50) {
      return 2;
    } else if (this.percentage * 10 > 0) {
      return 1;
    } else {
      return 0;
    }
  }




}