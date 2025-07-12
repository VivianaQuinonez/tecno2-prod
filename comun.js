function drawWaves(y, amp, freq, time) {
  beginShape();
  vertex(0, height);
  vertex(0, y);
  for (let x = 0; x <= width; x += 10) {
    let yOffset = sin((x * freq) + time) * amp;
    vertex(x, y + yOffset);
  }
  vertex(width, y);
  vertex(width, height);
  endShape(CLOSE);
}
