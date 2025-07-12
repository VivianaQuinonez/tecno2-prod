let t = 0;
let velocidadMontanas = 0;
let solEscala = 1;
let lagoClaro = true;
let lagoAmplitud = 0;

let mic, fft;
let threshold = 20; 

let ultimoCambioColorLago = 0;
let tiempoEspera = 300;

let calibrando = true;
let tiempoInicioCalibracion;
let maxEnergyDuringCalibration = 0;

let canvasAnchoMax = 850;
let canvasAltoMax = 600;

// Variables para randomizar elementos
let sunCenterX;
let sunCenterY;

let skyColorPatterns;
let skyRandomColor;
let skyDarkColor;
let skyLightColor;


function setup() {
  createCanvas(canvasAnchoMax, canvasAltoMax);
  noStroke();

  mic = new p5.AudioIn();
  fft = new p5.FFT();
  
  // Definimos la posición inicial del Sol
  sunCenterX = random(35, canvasAnchoMax - 35);
  sunCenterY = random(35, canvasAltoMax/3 - 35);
  
  // Definimos la paleta de colores del cielo
  skyColorPatterns = [
    [color(10, 48, 84), color(63, 161, 179)],
    [color(63, 161, 179), color(10, 48, 84)],
    [color(255, 228, 133), color(0, 0, 0)]
  ];
  
  skyRandomColor = random(skyColorPatterns);
  console.log(skyRandomColor);
  skyDarkColor = skyRandomColor[0];
  skyLightColor = skyRandomColor[1];
}

function draw() {
  background(255);

  // Botón inicial para activar el micrófono
  if (!mic.enabled) {
    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Hacé clic para activar el micrófono", width / 2, height / 2);
    return;
  }

  let spectrum = fft.analyze();
  let lowEnergy = fft.getEnergy("bass");
  let midEnergy = fft.getEnergy("mid");
  let highEnergy = fft.getEnergy("treble");

  if (calibrando) {
    let ahora = millis();
    if (ahora - tiempoInicioCalibracion <= 3000) {
      maxEnergyDuringCalibration = max(maxEnergyDuringCalibration, midEnergy, highEnergy);
      return;
    } else {
      threshold = constrain(maxEnergyDuringCalibration + 10, 10, 50);
      console.log("Threshold calibrado automáticamente en:", threshold);
      calibrando = false;
    }
  }

  let ahora = millis();

  solEscala = map(lowEnergy, 0, 255, 0.5, 2);

  if (midEnergy > threshold) {
    velocidadMontanas = 0.02;
  } else {
    velocidadMontanas = 0;
  }

  let lagoEnergy = max(midEnergy, highEnergy); 

  if (lagoEnergy > threshold) {
    lagoAmplitud = map(lagoEnergy, threshold, 255, 10, 35, true);

    if (ahora - ultimoCambioColorLago > tiempoEspera) {
      lagoClaro = !lagoClaro;
      ultimoCambioColorLago = ahora;
    }
  } else {
    lagoAmplitud = 5; 
  }

  t += velocidadMontanas;

  drawSky(skyDarkColor, skyLightColor);
  drawSun(sunCenterX, sunCenterY);
  drawMountains();
  drawLake();
}

function mousePressed() {
  userStartAudio().then(() => {
    mic.start(() => {
      console.log("Micrófono activado correctamente.");
      fft.setInput(mic);
      calibrando = true;
      tiempoInicioCalibracion = millis();
      maxEnergyDuringCalibration = 0;
    }, (err) => {
      console.error("Error al activar el micrófono:", err);
    });
  });
}
