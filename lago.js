// -------- FUNCIÓN PARA ONDAS -------------
function dibujarOndas(base) {
  let pasos = 40;
  let amplitud = 6;
  let velocidad = millis() * 0.005;

  fill(base);
  beginShape();
  for (let x = 0; x <= width; x += width / pasos) {
    let y = sin((x * 0.02) + velocidad) * amplitud;
    vertex(x, (height - alturaLago) + y);
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}


function dibujarLago() {
  // Limita el valor entre 0 y 1
  t = constrain(t, 0, 1);

  // Calculamos el color actual del lago
  let tonoActual = lerpColor(aguaProfunda, aguaSuperficie, t);

  // Dibujamos el agua
  fill(tonoActual);
  rect(0, height - alturaLago, width, alturaLago);

  // Dibujamos ondas
  dibujarOndas(tonoActual);
  
  /*
  for (let i = 0; i < 3; i++) {
     let tonoActual = lerpColor(aguaProfunda, aguaSuperficie, t + i);
     // Dibujamos el agua
    fill(tonoActual);
    rect(0, height - alturaLago + i * 100, width, alturaLago * i * 100);
  
    // Dibujamos ondas
    dibujarOndas(tonoActual);
  }
  */
}  
