// For bird

import {
  state, music, cvs, ctx,
} from './frame';
import { ground } from './ground';

const birdpic = new Image();
birdpic.src = '../src/assets/images/frame.png';

const die = new Audio();
die.src = '../src/assets/audio/die.wav';

const bird = {
  animation: [
    { sX: 0, sY: 0 },
    { sX: 282, sY: 1 },
    { sX: 0, sY: 234 },
    { sX: 282, sY: 1 },
  ],
  die: [
    { sX: 272, sY: 231 },
  ],
  x: 70,
  y: 150,
  w1: 275,
  h1: 213,
  w: 36,
  h: 28,
  frame: 0,
  period: 5,
  speed: 0,
  gravity: 0.20,
  jump: 4.6,
  radius: 13,
  draw() {
    if (state.current !== state.gameOver) {
      const bird = this.animation[this.frame];
      ctx.drawImage(birdpic, bird.sX, bird.sY, this.w1, this.h1,
        this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }
    if (state.current === state.gameOver) {
      ctx.drawImage(birdpic, this.die[0].sX, this.die[0].sY, this.w1,
        this.h1, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }
  },
  update(frames) {
    this.period = state.current === state.getReady ? 10 : 5;
    this.frame += frames % this.period === 0 ? 1 : 0; // flapping the bird
    this.frame %= this.animation.length; // resetting the frame
    // gravity
    if (state.current === state.getReady) {
      this.y = 150;
    } else {
      this.y += this.speed;
      this.speed += this.gravity;
    }
    if ((this.y + this.h / 2 >= cvs.height - ground.h) || this.y < 0) {
      this.speed = 0;
      this.frame = 0;
      if (state.current === state.game) {
        music.pause();
        state.current = state.gameOver;
        die.play();
      }
    }
  },
  move() {
    this.speed = -this.jump;
  },
};
export { bird as default };