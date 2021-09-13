import {
  state, sprite, cvs, ctx,
} from './frame';

// setting cloud

const cloud = {
  sX: 0,
  sY: 0,
  w: 275,
  h: 220,
  x: 0,
  y: cvs.height - 280,
  draw() {
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h,
      this.x, this.y, this.w, this.h);
  },
};

// setting ground

const ground = {
  sX: 276,
  sY: 0,
  w: 224,
  h: 112,
  x: 0,
  y: cvs.height - 112,
  dx: 3,
  draw() {
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
  },
  update() {
    if (state.current === state.game) {
      this.x -= this.dx;
      if (this.x % 50 === 0) {
        this.x = 0;
      }
    }
  },
};

export { cloud, ground };