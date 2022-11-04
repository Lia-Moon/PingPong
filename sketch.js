//variáveis bolinha
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

//botões
let botaoLocal;
let botaoAI;
let botaoRetorno;
let cliqueBotaoLocal = 0;
let cliqueBotaoAI = 0;
let cliqueBotaoRetorno = 0;

function preload(){
  raquetada = loadSound("raquetada.mp3");
  somPonto = loadSound("ponto.mp3");
  trilha = loadSound("trilha.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
  
  botoes();
}

/////////////////////////////////////////////////////////////////////////////////////////

function draw() {
  background(0);
  
  
  if(cliqueBotaoLocal == 0 && cliqueBotaoAI == 0){
    meusPontos = 0;
    pontosOp = 0;
    textoBoasVindas();
    botaoLocal.draw();
    botaoAI.draw(); 
  } else if(cliqueBotaoLocal >= 1){
     iniciaJogoContraAmigo();
  } else if(cliqueBotaoAI >= 1){
     iniciaJogoContraAI();
  }
  
  ganhaPlayer();

}

/////////////////////////////////////////////////////////////////////////////////////////

function textoBoasVindas(){
  textAlign(CENTER);
  textSize(18);
  //text_font: 'Courier New';
  fill(255); //preenchendo com a cor branca o texto
  text('Bem-vindo(a) ao jogo de Ping Pong', 300, 40);
  textSize(14);
  text('Criado por Júlia Vieira', width/2, 355);
  text('Projeto de curso Alura', width/2, 375);
}

function botoes(){

  botaoLocal = new Button({
    x: width/2, y: height/2,
    width: 170, height: 50,
    align_x: 0, align_y: 2,
    content: 'Jogo local',
    on_press() {
      cliqueBotaoLocal++;
    }
  });
  
  botaoAI = new Button({
    x: width/2, y: height/2,
    width: 170, height: 50,
    align_x: 0, align_y: -3,
    content: 'Jogue contra o PC',
    on_press() {
      cliqueBotaoAI++;
    }
  });
  
  botaoRetorno = new Button({
    x: width/2, y: height/2,
    width: 250, height: 50,
    align_x: 0, align_y: 0,
    content: 'Retornar para tela inicial',
    on_press() {
      cliqueBotaoRetorno++;
      cliqueBotaoLocal = 0;
      cliqueBotaoAI = 0;
    }
  });
}

function iniciaJogoContraAI(){
  desenhaBolinha();  
  movimentaBolinha();
  verificaColisaoBordas();  
  desenhaRaquete(xMinhaRaquete, yMinhaRaquete);
  movimentaMinhaRaquete();  
  verificaColisaoRaquete(xMinhaRaquete, yMinhaRaquete);
  verificaColisaoRaquete(xRaqueteOp, yRaqueteOp);  
  desenhaRaquete(xRaqueteOp, yRaqueteOp);
  movimentaRaqueteAI(); 
  mostraPontos();
  calculaPontos();  
  bolinhaNaoFicaPresa();
}

function iniciaJogoContraAmigo(){
  desenhaBolinha();  
  movimentaBolinha();
  verificaColisaoBordas();  
  desenhaRaquete(xMinhaRaquete, yMinhaRaquete);
  movimentaMinhaRaquete();  
  verificaColisaoRaquete(xMinhaRaquete, yMinhaRaquete);
  verificaColisaoRaquete(xRaqueteOp, yRaqueteOp);  
  desenhaRaquete(xRaqueteOp, yRaqueteOp);
  movimentaRaqueteOp();  
  mostraPontos();
  calculaPontos();  
  bolinhaNaoFicaPresa();
}

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
  if (pontosOp >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
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
  rect(150, 14, 40, 20);
  fill(255); //preenchendo com a cor branca o texto
  text(meusPontos, 170, 26);
  fill(color(255,105,180));
  rect(450, 14, 40, 20);
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

function bolinhaNaoFicaPresa(){
  if (xBolinha - raio < 0){
    xBolinha = 23;
  }
  if (xBolinha + raio > 600){
    xBolinha = 577;
  }
}

function ganhaPlayer(){
  if(pontosOp >= 5){
    botaoRetorno.draw();
    fill(255);
    textAlign(CENTER);
    textSize(20);
    text('O player dois acaba de ganhar o jogo.', 300, 110);
    text('Parabéns!!', 300, 145);
  } else if (meusPontos >= 5){
    botaoRetorno.draw();
    fill(255);
    textAlign(CENTER);
    textSize(20);
    text('O player um acaba de ganhar o jogo.', 300, 110);
    text('Parabéns!!', 300, 145);
  }
}
