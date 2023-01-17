const level1 = new Level(

  [
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle()
  ],
  [
    // new Chicken(),
    // new Chicken(),
    // new Chicken(),
    new Chicken(),
    new Endboss()
  ],
  [
    new Cloud('./assets/img/5_background/layers/4_clouds/1.png'),
    new Cloud('./assets/img/5_background/layers/4_clouds/2.png')
  ],
  [
    new BackgroundObject('./assets/img/5_background/layers/air.png', -719, 0),
    new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', -719, 6),
    new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', -719, 3),
    new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', -719, 0),

    new BackgroundObject('./assets/img/5_background/layers/air.png', 0, 0),
    new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 0, 6),
    new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 0, 3),
    new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 0, 0),

    new BackgroundObject('./assets/img/5_background/layers/air.png', 719, 0),
    new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 719, 6),
    new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 719, 3),
    new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 719, 0),

    new BackgroundObject('./assets/img/5_background/layers/air.png', 719 * 2, 0),
    new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 719 * 2, 6),
    new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 719 * 2, 3),
    new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 719 * 2, 0),

    new BackgroundObject('./assets/img/5_background/layers/air.png', 719 * 3, 0),
    new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 719 * 3, 6),
    new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 719 * 3, 3),
    new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 719 * 3, 0)
  ]
);
