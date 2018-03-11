const GameTemplate = model => (`
  <canvas
    id="game-canvas"
    width="${model.canvasWidth}"
    height="${model.canvasHeight}"
  >
  </canvas>
`);

export default GameTemplate;
