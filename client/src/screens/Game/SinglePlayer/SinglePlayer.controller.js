import Model from './SinglePlayer.model';
import template from '../Game.template';
import Selectors from '../Game.selectors';

export default class MultiPlayerController {

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
    // Initialize listeners
  }

}
