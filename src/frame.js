const cvs = document.createElement('canvas');
cvs.setAttribute('height', '655');
cvs.setAttribute('width', '1349');
document.body.appendChild(cvs);
const ctx = cvs.getContext('2d');

const sprite = new Image();
sprite.src = '../src/assets/images/sprite.png';

const music = new Audio();
music.src = '../src/assets/audio/dreams.mp3';

const hit = new Audio();
hit.src = '../src/assets/audio/hit.wav';

const swooshing = new Audio();
swooshing.src = '../src/assets/audio/swooshing.wav';

const state = {
  current: 0,
  getReady: 0,
  game: 1,
  gameOver: 2,
};

const score = {
  bestscore: (parseFloat(localStorage.getItem('bestscore')) || 0),
  value: 0,
  draw() {
    ctx.fillStyle = '#000000';
    if (state.current === state.game) {
      ctx.font = '40px teko';
      ctx.fillText(this.value, 100, 80);
    } else if (state.current === state.gameOver) {
      ctx.font = '25px teko';
      ctx.fillText(this.value, cvs.width / 2 + 65, 300);

      ctx.font = '25px teko';
      ctx.fillText(this.bestscore, cvs.width / 2 + 65, 340);
    }
  },
  reset() {
    this.value = 0;
  },

};

const getReady = {
  sX: 0,
  sY: 228,
  w: 173,
  h: 152,
  x: cvs.width / 2 - (173 / 2),
  y: 200,
  draw() {
    if (state.current === state.getReady) {
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
  },
};

// last page
const gameOver = {
  sX: 175,
  sY: 228,
  w: 225,
  h: 202,
  x: cvs.width / 2 - (225 / 2),
  y: 200,
  draw() {
    if (state.current === state.gameOver) {
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
  },
};

export {
  state, score, getReady, gameOver, music, sprite, cvs, ctx, hit, swooshing,
};
