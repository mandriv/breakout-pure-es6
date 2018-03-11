import GameController from '../Game.controller';

export default class MultiPlayerController extends GameController {

  init = () => {
    this.initialize();

    this.model.loadMultiPlayer();

    window.addEventListener('deviceorientation', (ev) => {
      if (window.innerHeight > window.innerWidth) {
        this.model.paddles[0].angle = Math.round(ev.gamma);
      } else {
        this.model.paddles[0].angle = Math.round(ev.beta);
      }
    }, true);

    this.start();
  }

}
