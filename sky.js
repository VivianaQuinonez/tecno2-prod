function drawSky(fondoOscuro, fondoClaro) {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);   
    let c = lerpColor(fondoOscuro, fondoClaro, inter);
    stroke(c);
    line(0, y, width, y);
  }
}
