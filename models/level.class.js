class Level {
  enemies;
  clouds;
  backgroundObject;
  collectables;
  level_end_x = 719 * 3 + 115;
  bottles;
  coin_sound = new Audio('./assets/audio/coin.mp3');
  bottle_sound = new Audio('./assets/audio/bottle.mp3');
  chicken_sound = new Audio('./assets/audio/chicken.mp3');
  gameover_sound = new Audio('./assets/audio/gameover.mp3');

  victory_sound = new Audio('./assets/audio/victory.mp3');
  throw_sound = new Audio('./assets/audio/throw.mp3');

  constructor(collectables, enemies, clouds, backgroundObject) {
    // this.bottles = bottles;
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObject = backgroundObject;
    this.collectables = collectables;

  }

}   