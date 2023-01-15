class Level {
  enemies;
  clouds;
  backgroundObject;
  coins;
  level_end_x = 719 * 3 + 115;

  constructor(coins, enemies, clouds, backgroundObject) {

    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObject = backgroundObject;
    this.coins = coins;
  }

}   