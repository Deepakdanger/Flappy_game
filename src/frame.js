const cvs = document.createElement('canvas');
cvs.setAttribute('height', '655');
cvs.setAttribute('width', '1349');
document.body.appendChild(cvs);
const ctx = cvs.getContext('2d');

const form1 = document.getElementById('form1');
form1.classList.add('removev');

const sprite = new Image();
sprite.src = '../src/assets/images/sprite.png';

const boardpic = new Image();
boardpic.src = '../src/assets/images/leaderboard.png';

const music = new Audio();
music.src = '../src/assets/audio/dreams.mp3';

const hit = new Audio();
hit.src = '../src/assets/audio/hit.wav';

const swooshing = new Audio();
swooshing.src = '../src/assets/audio/swooshing.wav';

const state = {
  current: 0,
  formName: 0,
  getReady: 1,
  game: 2,
  gameOver: 3,
  board: 4,
};

const score = {
  bestscore: (parseFloat(localStorage.getItem('bestscore')) || 0),
  value: 0,
  sX: 0,
  sY: 0,
  w: 536,
  h: 464,
  x: cvs.width / 2 - (537 / 2),
  y: 50,
  dataArray: {},
  nameX: cvs.width / 2 - 70,
  scoreX: cvs.width / 2 + 150,
  scoreY: 290,
  //username: localStorage.getItem('user'),
  draw() {
    if (state.current === state.game) {
      ctx.fillStyle = '#000000';
      ctx.font = '40px teko';
      ctx.fillText(this.value, 100, 80);
    } else if (state.current === state.board) {
      ctx.drawImage(boardpic, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
      ctx.fillStyle = '#ffffff';
      ctx.font = '30px teko';
      ctx.fillText(this.value, cvs.width / 2 - 10, 185);
      ctx.fillStyle = '#000000';
      for (let i = this.dataArray.result.length - 1; i > this.dataArray.result.length - 6; i -= 1) {
        ctx.fillText(this.dataArray.result[i].user, this.nameX, this.scoreY);
        ctx.fillText(this.dataArray.result[i].score, this.scoreX, this.scoreY);
        this.scoreY += 50;
      }
      this.scoreY = 290;
    }
  },
  draw1(data) {
    console.log(data);
    this.dataArray = data;
  },
  update() {
    const addData = { user: localStorage.getItem('user'), score: score.value };
    this.dataArray.result.push(addData);
    for (let i = 0; i < this.dataArray.result.length; i += 1) {
      for (let j = 0; j < (this.dataArray.result.length - i - 1); j += 1) {
        if (this.dataArray.result[j].score > this.dataArray.result[j + 1].score) {
          const temp = this.dataArray.result[j];
          this.dataArray.result[j] = this.dataArray.result[j + 1];
          this.dataArray.result[j + 1] = temp;
        }
      }
    }
    console.log(this.dataArray);
  },
  reset() {
    this.value = 0;
  },

};

const leaderboard = {
  key: '3EzsYnpgOQKdZOndzcO5',
  url: 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/3EzsYnpgOQKdZOndzcO5/scores/',
  post(get = true, data) {
    return fetch(this.url, {
      method: get ? 'GET' : 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    })
      .then((data) => data.json());
  },
  postScore() {
    const data = { user: localStorage.getItem('user'), score: score.value };
    this.post(false, data)
      .then(() => console.log('succesfully send'))
      .catch((e) => console.log(e.message));
  },
  getScore() {
    this.post()
      .then((data) => score.draw1(data))
      .catch((e) => console.log(e.message));
  },

};

const formName = {
  draw() {
    if (state.current === state.formName) {
      form1.classList.remove('removev');
      form1.classList.add('addv');
    }
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
      ctx.fillStyle = '#000000';
    }
  },
};

// last page
const gameOver = {
  sX: 175,
  sY: 228,
  w: 225,
  h: 48,
  x: cvs.width / 2 - (225 / 2),
  y: 240,
  draw() {
    if (state.current === state.gameOver) {
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
  },
};

export {
  state, score, getReady, gameOver, music, sprite, cvs, ctx, hit, swooshing,
  leaderboard, form1, formName,
};
