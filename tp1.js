// ------ CONFIGURACIÓN BÁSICA ------
let aguaProfunda;
let aguaSuperficie;
let alturaLago;
let t = 0.5; // Interpolación inicial entre 0 (oscuro) y 1 (claro)

let montanaImgs = [];
let montanas = [];
let paletaImg;
let colores = [];
let velocidad = 0;
let xBase;
let imgWidth;


function preload() {
  montanaImgs[0] = loadImage('imagenes/montana1.png');
  montanaImgs[1] = loadImage('imagenes/montana2.png');
  paletaImg = loadImage('imagenes/paleta.png'); // Imagen a color para generar la paleta
}

function setup() {
  
  createCanvas(850, 600);
  background(150);
  
  noStroke();
  aguaProfunda = color(0, 105, 148);     // azul oscuro
  aguaSuperficie = color(25, 220, 150);  // turquesa claro
  alturaLago = height * 0.25;            // 25% del lienzo
  
  imageMode(CENTER);
  extraerPaleta();
  reiniciarMontanas();
}

function draw() {
  dibujarMontanas()
  dibujarLago()
}

// Detecta cuando se mantiene presionada una tecla
function keyPressed() {
  let velocidadCambio = 0.1; // Qué tanto cambia el color por cada pulsación

  // Interacciones para el Lago
  if (keyCode === LEFT_ARROW) {
    t -= velocidadCambio; // más azul oscuro
  } else if (keyCode === RIGHT_ARROW) {
    t += velocidadCambio; // más claro/turquesa
  }
  
  console.log(t);
  
  // Interacciones para la Montaña
  if (key === '1') velocidad = 0.5;
  if (key === '2') velocidad = 3;
  if (key === '3') agregarMontana();
  if (key === '4') {
    velocidad = 0;  // Deja de moverse
    reiniciarMontanas();
  }
}
