/**
 * @jest-environment jsdom
 */
 import pipes from '../pipes';
 import {cvs} from '../frame';

  
  describe('It describe pipes', () => {
    test('return actual property of pipes', () => {
      expect(pipes.top.sX).toEqual(553);
      expect(pipes.top.sY).toEqual(0);
      expect(pipes.w).toEqual(53);
      expect(pipes.h).toEqual(400);
      expect(pipes.gap).toEqual(150);
      expect(pipes.dx).toEqual(3);
      expect(pipes.maxYPos).toEqual(-150);
      pipes.reset();
      expect(pipes.position.length).toEqual(0);
    });

    
  });