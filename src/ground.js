import { state } from './frame';

const cvs = document.getElementById('canavas');
const ctx = cvs.getContext('2d');

const sprite = new Image();
sprite.src = 'src/assets/images/sprite.png';
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
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h,
      this.x + this.w, this.y, this.w, this.h);
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h,
      this.x + 2 * (this.w), this.y, this.w, this.h);
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h,
      this.x + 3 * (this.w), this.y, this.w, this.h);
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h,
      this.x + 4 * (this.w), this.y, this.w, this.h);
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
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h,
      this.x + this.w, this.y, this.w, this.h);
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h,
      this.x + 2 * (this.w), this.y, this.w, this.h);
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h,
      this.x + 3 * (this.w), this.y, this.w, this.h);
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h,
      this.x + 4 * (this.w), this.y, this.w, this.h);
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h,
      this.x + 5 * (this.w), this.y, this.w, this.h);
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h,
      this.x + 6 * (this.w), this.y, this.w, this.h);
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