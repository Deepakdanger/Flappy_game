/**
 * @jest-environment jsdom
 */
import { cloud, ground } from '../ground';
import { cvs } from '../frame';

describe('It describe background', () => {
  test('return actual property of ground', () => {
    expect(ground.sX).toEqual(276);
    expect(ground.sY).toEqual(0);
    expect(ground.w).toEqual(224);
    expect(ground.h).toEqual(112);
    expect(ground.y).toEqual(cvs.height - 112);
    expect(ground.dx).toEqual(3);
  });

  test('return actual property of cloud', () => {
    expect(cloud.y).toEqual(cvs.height - 280);
    expect(cloud.sX).toEqual(0);
    expect(cloud.sY).toEqual(0);
    expect(cloud.w).toEqual(275);
    expect(cloud.h).toEqual(220);
  });
});