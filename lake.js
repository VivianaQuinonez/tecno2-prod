function drawLake() {
  let levels = 3;
  let baseY = height * 0.6;
  let heightStep = 40;

  noStroke();
  for (let i = 0; i < levels; i++) {
    let yOffset = baseY + i * heightStep;

    let col = lagoClaro
      ? lerpColor(color(3, 140, 101), color(186, 217, 211), i / levels)
      : lerpColor(color(1, 77, 51), color(62, 142, 126), i / levels);

    fill(col);

    let tiempo = lagoAmplitud > 0 ? t * 3 : 0;
    drawWaves(yOffset, 20 + lagoAmplitud, 0.003 * (levels - i), tiempo);
  }
}
