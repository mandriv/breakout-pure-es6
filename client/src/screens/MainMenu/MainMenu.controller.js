import Model from './MainMenu.model';
import template from './MainMenu.template';
import Selectors from './MainMenu.selectors';

export default class MainMenuController {

  router = null;
  model = null;
  selectors = null;
  template = null;

  constructor(router) {
    this.router = router;
    this.template = template;
    this.model = new Model();
  }

  init = () => {
    this.selectors = new Selectors();

    this.selectors.topButton.addEventListener('click', () => {
      this.router.navigate(this.router.singlePlayer);
    });

    this.selectors.bottomButton.addEventListener('click', () => {
      this.router.navigate(this.router.multiPlayerLobby);
    });
  }

}
