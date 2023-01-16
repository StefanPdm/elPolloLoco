class StatusBarCoins extends DrawableObject {
  percentage = 0;

  IMAGES_COIN_GREEN = [
    './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
    './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
    './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
    './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
  ]

  constructor() {
    super().loadImage(this.IMAGES_COIN_GREEN[0]);
    this.loadAllImages(this.IMAGES_COIN_GREEN);
    this.width = 170;
    this.height = 40;
    this.x = 30;
    this.y = 30;
    this.setPercentage(this.percentage);
  }

  // set percentage
  setPercentage(percentage) {
    this.percentage = percentage;

    setInterval(() => {
      let path = this.IMAGES_COIN_GREEN[this.resolveImageIndex()];// => aus % muss Zahl von 0-5 ermittelt werden(IMAGES.length)
      this.img = this.imageCache[path];
    }, 1000 / 20);
  }

  resolveImageIndex() {
    this.percentage = world.coinsCollected;
    if (this.percentage * 10 == 100) {
      return 5;
    } else if (this.percentage * 10 >= 80) {
      return 4;
    } else if (this.percentage * 10 >= 60) {
      return 3;
    } else if (this.percentage * 10 >= 40) {
      return 2;
    } else if (this.percentage * 10 > 0) {
      return 1;
    } else {
      return 0;
    }
  }

}
