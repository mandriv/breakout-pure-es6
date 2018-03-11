import GameController from '../Game.controller';

export default class MultiPlayerController extends GameController {

  constructor(router, socket, roomID) {
    super(router);
    this.socket = socket;
    this.roomID = roomID;
  }

  init = () => {
    this.initialize();

    this.model.loadMultiPlayer();

    this.socket.on('angle', (angle) => {
      this.model.paddles[1].angle = angle;
    });

    window.addEventListener('deviceorientation', (ev) => {
      let angle;
      if (window.innerHeight > window.innerWidth) {
        angle = Math.round(ev.gamma);
      } else {
        angle = Math.round(ev.beta);
      }
      this.model.paddles[0].angle = angle;
      this.socket.emit('angle', {
        roomID: this.roomID,
        angle,
      });
    }, true);

    this.start();
  }

}
