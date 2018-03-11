import MainMenuController from '../screens/MainMenu/MainMenu.controller';
import SinglePlayerController from '../screens/Game/SinglePlayer/SinglePlayer.controller';
import MultiPlayerController from '../screens/Game/MultiPlayer/MultiPlayer.controller';
import MultiplayerLobbyController from '../screens/MultiplayerLobby/MultiplayerLobby.controller';

export default class Router {

  mainMenu = '/';
  singlePlayer = '/game';
  multiPlayer = '/multiplayer';
  multiPlayerLobby = '/mp_lobby';

  root = document.getElementById('root');

  currentController = null;

  updateView = (controller, forceInit) => {
    if (controller) {
      this.currentController = controller;
    }
    this.root.innerHTML = this.currentController.template(this.currentController.model);
    if (forceInit) {
      controller.init();
    }
  }

  navigate = (route, navigationParams) => {
    switch (route) {
      case this.mainMenu:
        this.updateView(new MainMenuController(this), true);
        break;
      case this.singlePlayer:
        this.updateView(new SinglePlayerController(this), true);
        break;
      case this.multiPlayer:
        this.updateView(new MultiPlayerController(this, navigationParams.socket, navigationParams.roomID), true);
        break;
      case this.multiPlayerLobby:
        this.updateView(new MultiplayerLobbyController(this));
        break;
      default:
        console.error('Invalid route param!');
    }
  }

}
