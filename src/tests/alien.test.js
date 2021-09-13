/**
 * @jest-environment jsdom
 */
import {alien} from '../alien';
 import {cvs} from '../frame';

  
  describe('It describe alien', () => {
    test('return actual property of alien', () => {
      expect(alien.sX).toEqual(0);
      expect(alien.sY).toEqual(0);
      expect(alien.w).toEqual(464);
      expect(alien.h).toEqual(506);
      expect(alien.x2).toEqual(cvs.width - 100);
    });

    
  });