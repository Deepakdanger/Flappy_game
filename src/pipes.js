import bird from './bird';
import { state, score, music } from './frame';

const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

const sprite = new Image();
sprite.src = '../src/assets/images/sprite.png';

const hit = new Audio();
hit.src = '../src/assets/audio/hit.wav';

const point = new Audio();
point.src = '../src/assets/audio/point.wav';

// pipes

const pipes = {
  position: [],
  top: {
    sX: 553,
    sY: 0,
  },
  bottom: {
    sX: 502,
    sY: 0,
  },
  w: 53,
  h: 400,
  gap: 150,
  maxYPos: -150,
  dx: 3,
  draw() {
    for (let i = 0; i < this.position.length; i += 1) {
      const p = this.position[i];
      const topYPos = p.y;
      const bottomYPos = p.y + this.h + this.gap;
      // top pipe
      ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);
      ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x,
        bottomYPos, this.w, this.h);
    }
  },
  update(frames) {
    if (state.current !== state.game) {
      return;
    }
    if (frames % 100 === 0) {
      this.position.push({
        x: cvs.width,
        y: this.maxYPos * (Math.random() + 1),
      });
    }
    for (let i = 0; i < this.position.length; i += 1) {
      const p = this.position[i];
      p.x -= this.dx;

      // remove pipes
      if (p.x + this.w <= 0) {
        this.position.shift();
        // scoring
        point.play();
        score.value += 1;
        score.bestscore = Math.max(score.value, score.bestscore);
        localStorage.setItem('bestscore', score.bestscore);
      }
      // collision with the pipe
      if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w
                  && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h) {
        hit.play();
        music.pause();
        state.current = state.gameOver;
      }
      const tobp = p.y + this.h + this.gap;
      if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w
                  && bird.y + bird.radius > tobp && bird.y - bird.radius < tobp + this.h) {
        hit.play();
        music.pause();
        state.current = state.gameOver;
      }
    }
  },
  reset() {
    this.position = [];
  },

};

export { pipes as default, music };