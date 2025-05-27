function extraerPaleta() {
  paletaImg.loadPixels();
  colores = [];
  for (let i = 0; i < 1000; i++) {
    let x = int(random(paletaImg.width));
    let y = int(random(paletaImg.height));
    let index = 4 * (y * paletaImg.width + x);
    let r = paletaImg.pixels[index];
    let g = paletaImg.pixels[index + 1];
    let b = paletaImg.pixels[index + 2];
    colores.push(color(r, g, b));
  }
}

function colorAleatorio() {
  return random(colores);
}

function agregarMontana() {
  let img = random(montanaImgs);
  montanas.push({ img: img, offset: 0, color: colorAleatorio() });
}

function reiniciarMontanas() {
  montanas = [];
  agregarMontana(); // empezar con una
}

function dibujarUnaMontana(m, y, tipo) {
  // Montaña principal (normal)
  push();
  tint(m.color);
  switch (tipo) {
    case 0:  // Montaña Principal
      translate(xBase, y);
    break;
    case 1:  // Montaña Izquierda espejada
      translate(xBase - imgWidth, y);
    scale(-1, 1);  // Volteo horizontal para espejo
    break;
    case 2:  // Montaña Derecha espejada
      translate(xBase + imgWidth, y);
      scale(-1, 1);  // Volteo horizontal para espejo
    break;
  }
  
  image(m.img, 0, 0);
  pop();
}

function dibujarMontanas() {

  for (let i = 0; i < montanas.length; i++) {
    let m = montanas[i];
    xBase = width / 2 + m.offset;
    let y = height / 1.5 + i * 50;
    imgWidth = m.img.width;

    // Montaña principal (normal)
    dibujarUnaMontana(m, y, 0);

    // Montaña izquierda (espejada)
    dibujarUnaMontana(m, y, 1);

    // Montaña derecha (espejada)
    dibujarUnaMontana(m, y, 2);

    // Actualiza posición
    m.offset += velocidad;

    // Wrap-around para movimiento continuo
    if (m.offset > imgWidth) {
      m.offset -= imgWidth;
    } else if (m.offset < -imgWidth) {
      m.offset += imgWidth;
    }
  }
}
