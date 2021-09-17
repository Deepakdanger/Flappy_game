/**
 * @jest-environment jsdom
 */
import {
  score, getReady, gameOver, cvs,
} from '../frame';

expect(cvs.height).toEqual(655);
expect(cvs.width).toEqual(1349);

describe('It describe state', () => {
  test('return actual property of getReady', () => {
    expect(getReady.y).toEqual(200);
    expect(getReady.sX).toEqual(0);
    expect(getReady.sY).toEqual(228);
    expect(getReady.w).toEqual(173);
    expect(getReady.h).toEqual(152);
  });

  test('return actual property of gameOver', () => {
    expect(gameOver.y).toEqual(240);
    expect(gameOver.sX).toEqual(175);
    expect(gameOver.sY).toEqual(228);
    expect(gameOver.w).toEqual(225);
    expect(gameOver.h).toEqual(48);
  });

  test('return actual property of score', () => {
    expect(score.bestscore).toEqual(0);
    expect(score.value).toEqual(0);
    score.reset();
    expect(score.value).toEqual(0);
  });
});