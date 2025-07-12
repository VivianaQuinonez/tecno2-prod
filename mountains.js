function drawMountains() {
  let levels = 5;
  let baseY = height * 0.35;
  let heightStep = 30;

  for (let i = 0; i < levels; i++) {
    let yOffset = baseY + i * heightStep;
    let col = lerpColor(color(47, 83, 115), color(132, 164, 191), i / levels);
    stroke(col);
    strokeWeight(7);
    fill(col);
    drawWaves(yOffset, 70, 0.0050 * (i + 1), t);
  }
}
