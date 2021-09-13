import bird from './bird';
import { cloud, ground } from './ground';
import { alien, ball } from './alien';
import {
  state, score, getReady, gameOver, music,
} from './frame';
import pipes from './pipes';

const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

let frames = 0;

// Loading Images
const sprite = new Image();
sprite.src = '../src/assets/images/sprite.png';

// loading audio
const die = new Audio();
die.src = '../src/assets/audio/die.wav';

const hit = new Audio();
hit.src = '../src/assets/audio/hit.wav';

const swooshing = new Audio();
swooshing.src = '../src/assets/audio/swooshing.wav';

cvs.addEventListener('click', () => {
  switch (state.current) {
    case state.getReady:
      if (state.current === state.getReady) {
        music.play();
        music.volume = 0.2;
      }
      state.current = state.game;
      swooshing.play();
      break;
    case state.game:
      bird.move();
      break;
    case state.gameOver:
      state.current = state.getReady;
      music.load();
      pipes.reset();
      ball.reset();
      score.reset();
      break;
    default:
  }
});

// for drawing
const draw = () => {
  ctx.fillStyle = '#70c5ce';
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  cloud.draw();
  pipes.draw();
  ball.draw();
  ground.draw();
  bird.draw();
  alien.draw();
  getReady.draw();
  gameOver.draw();
  score.draw();
};

// for update
const update = () => {
  ground.update();
  bird.update(frames);
  pipes.update(frames);
  alien.update();
  ball.update(frames);
};

// Loop fuction
const loop = () => {
  draw();
  update();
  frames += 1;
  requestAnimationFrame(loop);
};
loop();
