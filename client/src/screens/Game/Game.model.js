export const BACKGROUND_COLOR = '#0F0F16';

export const BRICK_HEIGHT = 1;
export const BRICK_WIDTH = 1;
export const BRICK_OUTLINE_COLOUR = '#0F0F16';
export const BRICK_RED_COLOUR = '#ff3838';
export const BRICK_GREEN_COLOUR = '#3ae374';
export const BRICK_BLUE_COLOUR = '#3498db';
export const BRICK_YELLOW_COLOUR = '#fff200';

export const PADDLE_COLOUR = '#ff9f1a';
export const PADDLE_HEIGHT = 1;
export const PADDLE_WIDTH = 4;

export const G = 9.81; // Gravitational constant
export const MU = 0.0005; // Friction coefficient

export const UNIT = 20;
export const UNITS_PER_ROW = 20;
export const UNITS_PER_COL = 36;

export const FPS = 60; // PC master race

export default class GameModel {

  constructor() {
    this.backgroudColour = BACKGROUND_COLOR;

    this.canvasWidth = UNIT * UNITS_PER_ROW;
    this.canvasHeight = UNIT * UNITS_PER_COL;

    // Set dimensions of gizmos
    this.brickWidth = BRICK_WIDTH * UNIT;
    this.brickHeight = BRICK_HEIGHT * UNIT;

    this.paddleWidth = PADDLE_WIDTH * UNIT;
    this.paddleHeight = PADDLE_HEIGHT * UNIT;

    this.deltaT = Math.floor(1000 / FPS);

    this.bricks = [];
    this.balls = [];
    this.paddles = [];
  }

  loadSinglePlayer = () => {
    // Add bricks
    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < UNITS_PER_ROW; j += 1) {
        let colour;
        switch (i) {
          case 0:
            colour = BRICK_RED_COLOUR;
            break;
          case 1:
            colour = BRICK_BLUE_COLOUR;
            break;
          case 2:
            colour = BRICK_GREEN_COLOUR;
            break;
          case 3:
            colour = BRICK_YELLOW_COLOUR;
            break;
          default:
            colour = BRICK_RED_COLOUR;
        }
        this.bricks.push({
          colour,
          outline: BRICK_OUTLINE_COLOUR,
          x: j * UNIT,
          y: i * UNIT,
          width: this.brickWidth,
          height: this.brickHeight,
        });
      }
    }
    // Add paddles
    this.paddles.push({
      x: Math.floor(((UNITS_PER_ROW - PADDLE_WIDTH) / 2) * UNIT),
      y: (UNITS_PER_COL - 2) * UNIT,
      width: this.paddleWidth,
      height: this.paddleHeight,
      colour: PADDLE_COLOUR,
      velocity: 0,
      angle: 0,
    });
  }

  update = () => {
    this.updatePaddles();
  }

  updatePaddles = () => {
    this.paddles = this.paddles.map((paddle) => {
      // Move
      let x1 = paddle.x + (paddle.velocity * this.deltaT);
      if (x1 < 0) {
        x1 = 0;
      }
      if (x1 > this.canvasWidth - this.paddleWidth) {
        x1 = this.canvasWidth - this.paddleWidth;
      }
      console.log(x1);
      console.log('-------');
      // Calculate acceleration
      const a = G * (Math.sin(paddle.angle) - (MU * Math.cos(paddle.angle)));
      console.log(a);
      // Set new velocity
      const v1 = paddle.velocity + (a * this.deltaT);
      console.log(v1);
      return {
        ...paddle,
        x: x1,
        velocity: v1,
      };
    });
  }

  setPaddleAngle = (index, degrees) => {
    this.paddles[index].angle = degrees * (Math.PI / 180);
  }

}
