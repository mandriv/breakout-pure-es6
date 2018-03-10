import MainMenuController from '../screens/MainMenu/MainMenu.controller';
import SinglePlayerController from '../screens/Game/SinglePlayer/SinglePlayer.controller';
import MultiPlayerController from '../screens/Game/MultiPlayer/MultiPlayer.controller';

export default class Router {

  mainMenu = '/';
  singlePlayer = '/game';
  multiPlayer = '/multiplayer';

  root = document.getElementById('root');

  updateRoot = (controller) => {
    this.root.innerHTML = controller.template(controller.model);
    controller.init();
  }

  navigate = (route) => {
    switch (route) {
      case this.mainMenu:
        this.updateRoot(new MainMenuController(this));
        break;
      case this.singlePlayer:
        this.updateRoot(new SinglePlayerController(this));
        break;
      case this.multiPlayer:
        this.updateRoot(new MultiPlayerController(this));
        break;
      default:
        console.error('Invalid route param!');
    }
  }

}
