class Level {
  enemies;
  clouds;
  backgroundObject;
  collectables;
  level_end_x = 719 * 3 + 115;
  bottles;

  constructor(collectables, enemies, clouds, backgroundObject) {
    // this.bottles = bottles;
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObject = backgroundObject;
    this.collectables = collectables;

  }

}   