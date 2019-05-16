import { expect } from 'chai';
import add from '../src/index';

describe('add', () => {
  it('should add 2 integers', () => {
    expect(add(2, 3)).to.be.equal(5);
  });
});
