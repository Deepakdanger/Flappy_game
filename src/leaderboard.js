// const postdata = async (url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games', data = {name: 'Flappy_Bird'}) => {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json',
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer',
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// };

// import { score } from './frame';

// // result: "Game with ID: 3EzsYnpgOQKdZOndzcO5 added."

// const leaderboard = {
//   key: '3EzsYnpgOQKdZOndzcO5',
//   url: 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/3EzsYnpgOQKdZOndzcO5/scores/',
//   username: 'Namee',
//   post(get = true, data) {
//     return fetch(this.url, {
//       method: get ? 'GET' : 'POST',
//       mode: 'cors',
//       cache: 'no-cache',
//       credentials: 'same-origin',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       redirect: 'follow',
//       referrerPolicy: 'no-referrer',
//       body: JSON.stringify(data),
//     })
//       .then((data) => data.json());
//   },
//   postScore() {
//     const data = { user: this.username, score: score.value };
//     this.post(false, data)
//       .then(() => this.getScore())
//       .catch((e) => console.log(e.message));
//   },
//   getScore() {
//     let posting= await this.post()
//     return posting;
//     //   .then((data) => board.draw(data))
//     //   .catch((e) => console.log(e.message));
//   },

// };

// export { leaderboard as default };