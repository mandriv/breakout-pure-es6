import GameController from '../Game.controller';
import Model from '../Game.model';
import template from '../Game.template';
import Selectors from '../Game.selectors';

export default class SinglePlayerController extends GameController {

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
    super();
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

    this.start();
  }

}
