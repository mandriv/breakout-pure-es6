const MainMenuTemplate = model => (`
  <div class="main-menu">
    <div class="title-container">
      <h1 class="title">Breakout</h1>
    </div>
    <div class="menu-buttons">
      <button id="main-menu-top-button">${model.topButton.text}</button>
      <button id="main-menu-bottom-button">${model.bottomButton.text}</button>
    </div>
    <div class="footer">
      <p>Made with <3 by <a href="https://github.com/mandriv/" target="_blank">@mandriv</a></p>
    </div>
  </div>
`);

export default MainMenuTemplate;
