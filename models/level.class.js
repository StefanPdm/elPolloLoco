class Level {
  enemies;
  clouds;
  backgroundObject;
  level_end_x = 719 * 3 + 115;

  constructor(enemies, clouds, backgroundObject) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObject = backgroundObject;
  }

}