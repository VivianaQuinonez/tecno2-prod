function drawSun(centerX, centerY) {
  
  // centerX y centerY son calculados en setup
  
  //let centerX = width / 2;
  //let centerY = height * 0.15;    // 600*0.15 = 90
  
  // Radios de cada uno de los círculos del Sol
  let radii = [70, 60, 50, 40, 30, 20];
  let colors = [
    color(242, 242, 242),
    color(242, 225, 216),
    color(217, 206, 150),
    color(242, 229, 160),
    color(242, 242, 242),
    color(204, 226, 190)
  ];

  noStroke();
  for (let i = 0; i < radii.length; i++) {
    fill(colors[i]);
    ellipse(centerX, centerY, radii[i] * 2 * solEscala);
  }
}
