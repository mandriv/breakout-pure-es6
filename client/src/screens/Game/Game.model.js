const BACKGROUND_COLOR = '#0F0F16';

const BRICK_HEIGHT = 1;
const BRICK_WIDTH = 1;
const BRICK_OUTLINE_COLOUR = '#0F0F16';
const BRICK_RED_COLOUR = '#ff3838';
const BRICK_GREEN_COLOUR = '#3ae374';
const BRICK_BLUE_COLOUR = '#3498db';
const BRICK_YELLOW_COLOUR = '#fff200';

const PADDLE_COLOUR = '#ff9f1a';
const PADDLE_HEIGHT = 1;
const PADDLE_WIDTH = 6;
const PADDLE_MAX_SPEED = 600;
const PADDLE_TYPE_MINE = 'mine';
const PADDLE_TYPE_OPPONENT = 'opponent';

const BALL_RADIUS = 0.5;
const BALL_INITIAL_SPEED = 400;
const BALL_COLOUR = '#f7f1e3';

const UNIT = 20;
const UNITS_PER_ROW = 20;
const UNITS_PER_COL = 36;

const FPS = 60; // PC master race

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

    this.deltaT = Math.round(1000 / FPS);

    this.bricks = [];
    this.balls = [];
    this.paddles = [];

    this.endGameCallback = () => null;
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
      x: Math.round(((UNITS_PER_ROW - PADDLE_WIDTH) / 2) * UNIT),
      y: (UNITS_PER_COL - 2) * UNIT,
      width: this.paddleWidth,
      height: this.paddleHeight,
      colour: PADDLE_COLOUR,
      velocity: 0,
      angle: 0,
      type: PADDLE_TYPE_MINE,
    });

    // Add ball
    this.balls.push({
      x: Math.round((UNITS_PER_ROW * UNIT) / 2),
      y: 10 * UNIT,
      radius: BALL_RADIUS * UNIT,
      vx: 0,
      vy: BALL_INITIAL_SPEED,
      colour: BALL_COLOUR,
    });
  }

  loadMultiPlayer = () => {
    // Add bricks
    for (let i = 16; i < 20; i += 1) {
      for (let j = 0; j < UNITS_PER_ROW; j += 1) {
        let colour;
        switch (i) {
          case 16:
            colour = BRICK_RED_COLOUR;
            break;
          case 17:
            colour = BRICK_BLUE_COLOUR;
            break;
          case 18:
            colour = BRICK_GREEN_COLOUR;
            break;
          case 19:
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
      x: Math.round(((UNITS_PER_ROW - PADDLE_WIDTH) / 2) * UNIT),
      y: (UNITS_PER_COL - 2) * UNIT,
      width: this.paddleWidth,
      height: this.paddleHeight,
      colour: PADDLE_COLOUR,
      velocity: 0,
      angle: 0,
      type: PADDLE_TYPE_MINE,
    });

    this.paddles.push({
      x: Math.round(((UNITS_PER_ROW - PADDLE_WIDTH) / 2) * UNIT),
      y: 1 * UNIT,
      width: this.paddleWidth,
      height: this.paddleHeight,
      colour: PADDLE_COLOUR,
      velocity: 0,
      angle: 0,
      type: PADDLE_TYPE_OPPONENT,
    });

    // Add balls
    this.balls.push({
      x: Math.round((UNITS_PER_ROW * UNIT) / 2),
      y: 14 * UNIT,
      radius: BALL_RADIUS * UNIT,
      vx: 0,
      vy: -BALL_INITIAL_SPEED,
      colour: BALL_COLOUR,
    });

    this.balls.push({
      x: Math.round((UNITS_PER_ROW * UNIT) / 2),
      y: 21 * UNIT,
      radius: BALL_RADIUS * UNIT,
      vx: 0,
      vy: BALL_INITIAL_SPEED,
      colour: BALL_COLOUR,
    });
  }

  update = () => {
    this.updatePaddles();
    this.updateBalls();
  }

  updatePaddles = () => {
    this.paddles = this.paddles.map((paddle) => {
      let v1 = Math.round((paddle.angle / 45) * PADDLE_MAX_SPEED);
      let x1 = Math.round(paddle.x + (v1 / this.deltaT));
      // Check for colision with the wall
      if (x1 <= 0) {
        x1 = 0;
        v1 = 0;
      }
      if (x1 >= this.canvasWidth - this.paddleWidth) {
        x1 = this.canvasWidth - this.paddleWidth;
        v1 = 0;
      }
      return {
        ...paddle,
        x: x1,
        velocity: v1,
      };
    });
  }

  updateBalls = () => {
    this.balls = this.balls.map((ball) => {
      const x1 = Math.round(ball.x + (ball.vx * (this.deltaT / 1000)));
      const y1 = Math.round(ball.y + (ball.vy * (this.deltaT / 1000)));
      let vx1 = ball.vx;
      let vy1 = ball.vy;
      // Track one collision at the time
      let found = false;
      // Left or right wall collision
      if ((x1 - ball.radius) <= 0 || (x1 + ball.radius) >= this.canvasWidth) {
        vx1 = -vx1;
        found = true;
      }
      // Paddles collision
      if (!found) {
        for (let i = 0; i < this.paddles.length; i += 1) {
          const paddle = this.paddles[i];
          if ((x1 >= paddle.x
            && x1 <= paddle.x + this.paddleWidth
            && y1 + ball.radius >= paddle.y
            && paddle.type === PADDLE_TYPE_MINE)
            ||
            (x1 >= paddle.x
            && x1 <= paddle.x + this.paddleWidth
            && y1 - ball.radius <= paddle.y + this.paddleHeight
            && paddle.type === PADDLE_TYPE_OPPONENT
            )) {
            vx1 = -(vx1 + paddle.velocity); // add paddle vector
            vy1 = -vy1; // just reverse vector
            found = true;
            break;
          }
        }
      }

      // Bricks collision
      if (!found) {
        for (let i = 0; i < this.bricks.length; i += 1) {
          const collision = this.getBallCollisionWithBrick(
            { ...ball, x: x1, y: y1, vx: vx1, vy: vy1 },
            this.bricks[i],
          );
          if (collision.occurs) {
            // Bounce ball
            switch (collision.type) {
              case 'x':
                vx1 = -vx1;
                break;
              case 'y':
                vy1 = -vy1;
                break;
              default:
                vx1 = -vx1;
                vy1 = -vy1;
            }
            // Remove brick
            this.bricks = this.bricks.filter((b, index) => index !== i);
            if (this.bricks.length === 0 && this.paddles.length !== 1) {
              this.endGameCallback(true);
            }
            found = true;
            break;
          }
        }
      }
      // Top wall collision, sorry for nesting
      if (!found) {
        if (this.paddles.length === 1) {
          if ((y1 - ball.radius) <= 0) {
            vy1 = -vy1;
            found = true;
          }
        } else {
          this.endGameCallback(true);
        }
      }

      // Bottom wall collision
      if (!found) {
        if ((y1 + ball.radius) >= this.canvasHeight) {
          this.endGameCallback(false);
        }
      }

      return {
        ...ball,
        x: x1,
        y: y1,
        vx: vx1,
        vy: vy1,
      };
    });
  }

  getBallCollisionWithBrick = (ball, brick) => {
    const brickHalfWidth = (brick.width / 2);
    const brickHalfHeight = (brick.height / 2);
    const distX = Math.abs(ball.x - brick.x - brickHalfWidth);
    const distY = Math.abs(ball.y - brick.y - brickHalfHeight);
    if (distX > (brickHalfWidth + ball.radius)) {
      return {
        occurs: false,
        type: '',
      };
    }
    if (distY > (brickHalfHeight + ball.radius)) {
      return {
        occurs: false,
        type: '',
      };
    }
    if (distX <= brickHalfWidth) {
      return {
        occurs: true,
        type: 'y',
      };
    }
    if (distY <= brickHalfHeight) {
      return {
        occurs: true,
        type: 'x',
      };
    }
    const dx = distX - brickHalfWidth;
    const dy = distY - brickHalfHeight;
    const cornerCollision = ((dx * dx) + (dy * dy) <= (ball.radius * ball.radius));
    if (cornerCollision) {
      return {
        occurs: true,
        type: 'xy',
      };
    }
    return {
      occurs: false,
      type: '',
    };
  }

  onGameEnd = (callback) => {
    this.endGameCallback = callback;
  }

}
