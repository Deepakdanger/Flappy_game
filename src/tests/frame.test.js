/**
 * @jest-environment jsdom
 */
 import {
    score, getReady, gameOver, music,
    sprite, cvs, ctx, hit, swooshing,
  } from '../frame';
  
  describe('It describe state', () => {
    test('return project name', () => {
      expect(getReady.y).toEqual(200);
    });
  });