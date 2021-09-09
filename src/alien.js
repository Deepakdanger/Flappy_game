import bird from './bird';
import { state, music } from './frame';

const cvs = document.getElementById('canavas');
const ctx = cvs.getContext('2d');

let count = 0;

const hit = new Audio();
hit.src = '../src/assets/audio/hit.wav';

const alienpic = new Image();
alienpic.src = '../src/assets/images/alien.png';
const fireballpic = new Image();
fireballpic.src = '../src/assets/images/fireball.png';

// for alien
const alien = {
  sX: 0,
  sY: 0,
  w: 464,
  h: 506,
  x2: cvs.width - 100,
  y2: 80,
  w2: 65,
  h2: 65,
  dx: 1,
  draw() {
    ctx.drawImage(alienpic, this.sX, this.sY, this.w, this.h, this.x2, this.y2, this.w2, this.h2);
  },
  update() {
    if (state.current === state.game) {
      if (count > 600) {
        count = 0;
      }
      if (count < 300) {
        this.y2 += this.dx;
        count += 1;
      } else {
        this.y2 -= this.dx;
        count += 1;
      }
    }
  },
};
  // for fireball
const ball = {
  ball_position: [],
  w: 45,
  h: 20,
  sX: 0,
  sY: 0,
  dx: 4,
  draw() {
    for (let i = 0; i < this.ball_position.length; i += 1) {
      const p = this.ball_position[i];
      ctx.drawImage(fireballpic, this.sX, this.sY, 64, 64, p.x, p.y, this.w, this.h);
    }
  },
  update(frames) {
    if (state.current !== state.game) {
      return;
    }
    if (frames % 100 === 0) {
      this.ball_position.push({
        x: cvs.width - 100,
        y: alien.y2,
      });
    }
    for (let i = 0; i < this.ball_position.length; i += 1) {
      const p = this.ball_position[i];
      p.x -= this.dx;

      if (p.x + this.width <= 0) {
        this.ball_position.shift();
      }
      // collison
      if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w
                  && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h) {
        hit.play();
        music.pause();
        state.current = state.gameOver;
      }
    }
  },
  reset() {
    this.ball_position = [];
  },
};

export { alien, ball };
