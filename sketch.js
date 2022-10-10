//variáveis bolinh
let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 18;
let raio = diametroBolinha/2;

let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis minha raquete
let xMinhaRaquete = 5;
let yMinhaRaquete = 160;

let raqueteAltura = 85;
let raqueteComprimento = 8;
let velocidadeRaquete = 10;

//variáveis raquete do oponente
let xRaqueteOp = 585;
let yRaqueteOp = 160;
let velocidadeYOp;

let chanceDeErrar = 0;

//pontuação
meusPontos = 0;
pontosOp = 0;

let colidiu = 0;

//sons do jogo
let raquetada;
let somPonto;
let trilha;

function preload(){
  raquetada = loadSound("raquetada.mp3");
  somPonto = loadSound("ponto.mp3");
  trilha = loadSound("trilha.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

/////////////////////////////////////////////////////////////////////////////////////////

function draw() {
  background(0);
  desenhaBolinha();
  
  movimentaBolinha();
  verificaColisaoBordas();
  
  desenhaRaquete(xMinhaRaquete, yMinhaRaquete);
  movimentaMinhaRaquete();
  
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xMinhaRaquete, yMinhaRaquete);
  verificaColisaoRaquete(xRaqueteOp, yRaqueteOp);
  
  desenhaRaquete(xRaqueteOp, yRaqueteOp);
  movimentaRaqueteAI();
  //movimentaRaqueteOp();
  
  mostraPontos();
  calculaPontos();
  
}

/////////////////////////////////////////////////////////////////////////////////////////

function desenhaBolinha(){
  circle(xBolinha, yBolinha, diametroBolinha);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBordas(){
  if(xBolinha + raio > width ||
      xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if(yBolinha + raio > height ||
      yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function desenhaRaquete(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(87)){
    yMinhaRaquete -= velocidadeRaquete;
  }
  if (keyIsDown(83)){
    yMinhaRaquete += velocidadeRaquete;
  }
}

function movimentaRaqueteAI(){
  velocidadeYOp = yBolinha - yRaqueteOp - (raqueteComprimento/2) - 30;
  yRaqueteOp += velocidadeYOp + chanceDeErrar;
  
  calculaChanceDeErrar();
}

function movimentaRaqueteOp(){
  if (keyIsDown(UP_ARROW)){
    yRaqueteOp -= velocidadeRaquete;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaqueteOp += velocidadeRaquete;
  }
}

function calculaChanceDeErrar(){
  if(pontosOp >= meusPontos){
    chanceDeErrar += 1;
    if(chanceDeErrar >= 39){
      chancedeErrar = 40;
    }
  } else{
    chanceDeErrar -= 1;
    if(chanceDeErrar <= -1){
      chanceDeErrar = 0;
    }
  }
}

function verificaColisaoRaquete(){
  if((xBolinha - raio) < (xMinhaRaquete + raqueteComprimento) &&
     (yBolinha - raio) < (yMinhaRaquete + raqueteAltura) &&
     (yBolinha + raio) > (yMinhaRaquete)){
    raquetada.play();
    velocidadeXBolinha *= -1;
  }
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, diametroBolinha);
  
  if(colidiu){
    raquetada.play();
    velocidadeXBolinha *= -1;
  } 
}

function mostraPontos(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,105,180));
  rect(150, 10, 40, 20);
  fill(255); //preenchendo com a cor branca o texto
  text(meusPontos, 170, 26);
  fill(color(255,105,180));
  rect(450, 10, 40, 20);
  fill(255); //preenchendo com a cor branca o texto
  text(pontosOp, 470, 26);
}

function calculaPontos(){
  if(xBolinha < 10){
    somPonto.play();
    pontosOp += 1;
  }
  
  if(xBolinha > 590){
    somPonto.play();
    meusPontos += 1;
  }
}







