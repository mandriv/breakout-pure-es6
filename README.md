# Breakout Game
Classic breakout game written using pure ES6 in one day.

You need a mobile device with accelerometer to play.
Feel free to check it out on [heroku](https://breakout-game-cs317.herokuapp.com).

## Tech stack
Client - ES6 for logic, SASS for styling, ES6 templates for views. Gulp takes care of connecting it all together.

Multiplayer Server - simple Express app with socket.io (Express is also hosting the app on heroku).

### Dev environment
```bash
npm install && gulp
```
### Deploy
```bash
gulp build
```
