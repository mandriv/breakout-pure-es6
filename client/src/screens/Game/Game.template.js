const GameTemplate = model => (`
  <canvas
    id="game-canvas"
    width="${model.canvasWidth}"
    height="${model.canvasHeight}"
  >
  </canvas>
  <div id="end-game-modal">
    <div class="container">
      <h2 id="end-game-message">Test Message</h2>
      <button id="end-game-button">Return to main menu</button>
    </div>
  </div>
`);

export default GameTemplate;
