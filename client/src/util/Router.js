import MainMenuController from '../screens/MainMenu/MainMenu.controller';
import SinglePlayerController from '../screens/Game/SinglePlayer/SinglePlayer.controller';
import MultiPlayerController from '../screens/Game/MultiPlayer/MultiPlayer.controller';

export default class Router {

  mainMenu = '/';
  singlePlayer = '/game';
  multiPlayer = '/multiplayer';

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

  navigate = (route) => {
    switch (route) {
      case this.mainMenu:
        this.updateView(new MainMenuController(this), true);
        break;
      case this.singlePlayer:
        this.updateView(new SinglePlayerController(this), true);
        break;
      case this.multiPlayer:
        this.updateView(new MultiPlayerController(this), true);
        break;
      default:
        console.error('Invalid route param!');
    }
  }

}
