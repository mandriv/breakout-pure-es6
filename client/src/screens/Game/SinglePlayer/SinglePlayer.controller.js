import GameController from '../Game.controller';

export default class SinglePlayerController extends GameController {

  init = () => {
    this.initialize();

    this.model.loadSinglePlayer();

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
