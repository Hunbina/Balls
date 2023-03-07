function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

class Ball {
  constructor(canvas, context, text) {
    this.color = "rgb(" + Math.floor(Math.random()*256)+","+ Math.floor(Math.random()*256)+","+ Math.floor(Math.random()*256)+")";
    this.canvas = canvas;
    this.context = context;
    this.text = text;
    this.counter = 0;


    this.radius = getRndInteger(10, 50);
    this.x = getRndInteger(1, this.canvas.width);
    this.y = getRndInteger(1, this.canvas.height);
    this.vx = getRndInteger(1, 10) * (getRndInteger(1, 100) > 50 ? -1 : 1);
    this.vy = getRndInteger(1, 10) * (getRndInteger(1, 100) > 50 ? -1 : 1);
  }
  
    
  paint() {
    this.context.beginPath();
    this.context.fillStyle = "white";
    this.context.strokeStyle = this.color;
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

    this.context.stroke();
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.font = "20px Arial";
    this.context.fillText(this.text, this.x, this.y);
    this.context.lineWidth = 10;
  }
  
  calculatePosition() {
    this.x += this.vx;
    this.y += this.vy;
  }

  checkVelocity() {
    this.text = this.counter;
    this.checkVelocityX();
    this.checkVelocityY();
  }

  checkVelocityY() {
    if (this.y + this.radius >= this.canvas.height){
      this.vy = 0 - Math.abs(this.vy);
      this.counter++;
    }
    if (this.y - this.radius <= 0){ 
      this.vy = Math.abs(this.vy);
      this.counter++;
    }
  }

  checkVelocityX() {
    if (this.x + this.radius >= this.canvas.width){
      this.vx = 0 - Math.abs(this.vx);
      this.counter++;
    }
    if (this.x - this.radius <= 0){
       this.vx = Math.abs(this.vx);
       this.counter++;
    }   
  }
}

class Balls {
  constructor(){
    this.balls = []
  }

 newBall(canvas, context, text){
  let eachBall = new Ball(canvas, context, text)
  this.balls.push(eachBall)
  return eachBall
}
get allBalls(){
  return this.balls
}
}

class Scene {
  canvas = document.querySelector("#balls");
  
  constructor() {
    const body = document.querySelector("body");
   
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext("2d");

    this.party = new Balls()
    this.party.newBall(this.canvas, this.context, this.text)
    this.party.newBall(this.canvas, this.context, this.text)
    this.party.newBall(this.canvas, this.context, this.text)
    this.party.newBall(this.canvas, this.context, this.text)
    this.party.newBall(this.canvas, this.context, this.text)
    this.party.newBall(this.canvas, this.context, this.text)

  }

  paint() {
    this.context.fillStyle = "#000000";
    this.context.fillRect(0, 0, innerWidth, innerHeight);
  
    this.party.allBalls.forEach(ball => ball.paint())
    this.party.allBalls.forEach(ball => ball.calculatePosition())
    this.party.allBalls.forEach(ball => ball.checkVelocity())
  
  }
}

const scene = new Scene();

function move() {
  requestAnimationFrame(move);
  scene.paint();
}

move();
