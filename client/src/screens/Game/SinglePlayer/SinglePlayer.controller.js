import Model from '../Game.model';
import template from '../Game.template';
import Selectors from '../Game.selectors';

export default class SinglePlayerController {

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

  constructor(router) {
    this.router = router;
    this.template = template;
    this.model = new Model();
  }

  init = () => {
    this.selectors = new Selectors();
    this.canvas = this.selectors.canvas;
    this.ctx = this.canvas.getContext('2d', { alpha: false });
    this.ctx.fillStyle = this.model.backgroudColour;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.model.loadSinglePlayer();

    this.currentAngle = 0;

    window.addEventListener('deviceorientation', (ev) => {
      if (window.innerHeight > window.innerWidth) {
        this.model.paddles[0].angle = Math.round(ev.gamma);
      } else {
        this.model.paddles[0].angle = Math.round(ev.beta);
      }
    }, true);



    this.start();
    this.model.onGameEnd((win) => {
      this.stop();
      if (win) {
        this.selectors.modalMsg.textContent = 'You won the game!';
      } else {
        this.selectors.modalMsg.textContent = 'You lost :(';
      }
      this.selectors.modelBtn.addEventListener('click', () => {
        this.router.navigate(this.router.mainMenu);
      });
      this.selectors.modal.style.visibility = 'visible';
    });
  }

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
