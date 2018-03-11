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

    window.addEventListener('deviceorientation', (ev) => {
      // TODO: Observe orientation
      this.model.setPaddleAngle(0, ev.gamma);
    }, true);

    this.start();
  }

  start = () => {
    this.gameLoop = setInterval(() => {
      this.clear();
      this.model.update();
      this.draw();
    }, this.model.deltaT);
  }

  draw = () => {
    this.model.bricks.forEach(brick => this.drawBrick(brick));
    this.model.paddles.forEach(paddle => this.drawPaddle(paddle));
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

  clear = () => {
    this.model.bricks.forEach(brick => this.clearBrick(brick));
    this.model.paddles.forEach(paddle => this.clearPaddle(paddle));
  }

  clearBrick = (brick) => {
    this.ctx.fillStyle = this.model.backgroudColour;
    this.ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
  }

  clearPaddle = (paddle) => {
    this.ctx.fillStyle = this.model.backgroudColour;
    this.ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  }

}
