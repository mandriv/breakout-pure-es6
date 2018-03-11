import io from 'socket.io-client';

import Model from './MultiplayerLobby.model';
import template from './MultiplayerLobby.template';

export default class MutliplayerLobbyController {

  router = null;
  model = null;
  selectors = null;
  template = null;

  constructor(router) {
    this.router = router;
    this.template = template;
    this.model = new Model();
    this.socket = io('https://breakout-game-cs317.herokuapp.com');
    this.socket.on('waitlist-empty', this.onEmptyWaitlist);
    this.socket.on('game-found', this.onGameFound);
    this.socket.emit('join-matchmaking');
  }

  onEmptyWaitlist = () => {
    this.model.text = 'You are the only one waiting.';
    this.router.updateView();
  }

  onGameFound = (roomID) => {
    this.router.navigate(this.router.multiPlayer, {
      socket: this.socket,
      roomID,
    });
  }

}
