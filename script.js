
class Rect {
  constructor(canvas, context, x, y, xv, yv, bs, color) {
    this.canvas = canvas;
    this.context = context;
    this.x = x;
    this.y = y;
    this.xv = xv;
    this.yv = yv;
    this.bs = bs;
    this.color = color;
  }

  update() {
    // move the rectangle
    this.x += this.xv;
    this.y += this.yv;

    // bounce the rectangle off each wall
    if (this.x - this.bs / 2 < 0 && this.xv < 0) {
      this.xv = -this.xv;
    }
    if (this.x + this.bs / 2 > this.canvas.width && this.xv > 0) {
      this.xv = -this.xv;
    }
    if (this.y - this.bs / 2 < 0 && this.yv < 0) {
      this.yv = -this.yv;
    }
    if (this.y + this.bs / 2 > this.canvas.height && this.yv > 0) {
      this.yv = -this.yv;
    }

    // draw rectangle
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x - this.bs / 2, this.y - this.bs / 2, this.bs, this.bs);
  }
}

// load canvas
const canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;
const context = canvas.getContext("2d");


//set up interval (game Loop)
const FPS = 60;
const rects = [];

function setupRects() {
  const bs = 10;
  for (let i = 0; i < 1500; i++) {
    const xv = Math.floor(Math.random() * 76 + 25) / FPS;
    const yv = Math.floor(Math.random() * 76 + 25) / FPS;
    const x = Math.floor(Math.random() * (canvas.width - bs)) + bs / 2;
    const y = Math.floor(Math.random() * (canvas.height - bs)) + bs / 2;
    const color = "white";
    rects.push(new Rect(canvas, context, x, y, xv, yv, bs, color));
  }
}


function gameLoop() {
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  rects.forEach((rect) => rect.update());
}

setupRects();
setInterval(gameLoop, 1000 / FPS);


