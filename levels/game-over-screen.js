const gameOverScreen = new Level(
  [
    ''
  ],
  [
    ''
  ],
  [
    new Cloud('./assets/img/5_background/layers/4_clouds/1.png'),
    new Cloud('./assets/img/5_background/layers/4_clouds/2.png')
  ],
  [
    new BackgroundObject('./assets/img/5_background/layers/air.png', 0, 0),
    new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 0, 6),
    new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 0, 3),
    new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 0, 0),
  ]
);