import 'phaser';
import bird from './bird';
import { cloud, ground } from './ground';
import { alien, ball } from './alien';
import {
  state, score, getReady, gameOver, music, cvs, ctx, swooshing, leaderboard, form1, formName,
} from './frame';
import pipes from './pipes';

let frames = 0;

cvs.addEventListener('click', () => {
  switch (state.current) {
    case state.formName:
      break;
    case state.getReady:
      if (state.current === state.getReady) {
        music.play();
        music.volume = 0.2;
      }
      state.current = state.game;
      swooshing.play();
      leaderboard.getScore();
      break;
    case state.game:
      bird.move();
      break;
    case state.gameOver:
      state.current = state.board;
      music.load();
      pipes.reset();
      ball.reset();
      score.update();
      break;
    case state.board:
      leaderboard.postScore();
      score.reset();
      state.current = state.formName;
      break;
    default:
  }
});

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
  formName.draw();
};

const update = () => {
  ground.update();
  bird.update(frames);
  pipes.update(frames);
  alien.update();
  ball.update(frames);
};

const loop = () => {
  draw();
  update();
  frames += 1;
  requestAnimationFrame(loop);
};

form1.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputName = document.getElementById('fname');
  localStorage.setItem('user', inputName.value);
  form1.classList.remove('addv');
  form1.classList.add('removev');
  state.current = state.getReady;
});

loop();