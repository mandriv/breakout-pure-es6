export default class GameController {

  // Set up in constructor
  router = null;
  template = null;
  model = null;
  // Set up on init()
  selectors = null;
  canvas = null;
  ctx = null;
  // Game loop
  gameLoop = null;

  start = () => {
    this.gameLoop = setInterval(() => {
      this.clear();
      this.model.update();
      this.draw();
    }, this.model.deltaT);
  }

  stop = () => {
    clearInterval(this.gameLoop);
  }

  draw = () => {
    this.model.bricks.forEach(brick => this.drawBrick(brick));
    this.model.paddles.forEach(paddle => this.drawPaddle(paddle));
    this.model.balls.forEach(ball => this.drawBall(ball));
  }

  clear = () => {
    this.model.bricks.forEach(brick => this.clearBrick(brick));
    this.model.paddles.forEach(paddle => this.clearPaddle(paddle));
    this.model.balls.forEach(ball => this.clearBall(ball));
  }

  drawBrick = (brick) => {
    this.ctx.fillStyle = brick.colour;
    this.ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
    this.ctx.strokeStyle = brick.outline;
    this.ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
  }

  drawPaddle = (paddle) => {
    this.ctx.fillStyle = paddle.colour;
    this.ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  }

  drawBall = (ball) => {
    this.ctx.beginPath();
    this.ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = ball.colour;
    this.ctx.fill();
  }

  clearBrick = (brick) => {
    this.ctx.fillStyle = this.model.backgroudColour;
    this.ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
  }

  clearPaddle = (paddle) => {
    this.ctx.fillStyle = this.model.backgroudColour;
    this.ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  }

  clearBall = (ball) => {
    this.ctx.beginPath();
    this.ctx.arc(ball.x, ball.y, ball.radius + 1, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.model.backgroudColour;
    this.ctx.fill();
  }

}
