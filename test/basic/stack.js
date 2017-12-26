const chai = require('chai');
const { expect } = chai;

const Stack = require('../../basic/stack');

describe('stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  describe('properties', () => {
    it('should have a length property initialized to 0', () => {
      expect(stack.length).to.equal(0);
    });

    it('should have a storage property initialized as an empty array', () => {
      expect(stack.storage).to.eql([]);
    });

    describe('methods', () => {
      describe('push', () => {
        it('should increase in length every time a value is pushed', () => {
          for (let i = 1; i <= 10; i += 1) {
            stack.push(i);
            expect(stack.length).to.equal(i);
          }
        });

        it('should add values to the end of the storage', () => {
          for (let i = 0; i < 10; i += 1) {
            stack.push(i);
            expect(stack.storage[i]).to.equal(i);
          }
        });

        it('should push multiple arguments in order they were provided', () => {
          stack.push(0, 1, 2, 3, 4);
          
          for (let i = 0; i <= 4; i += 1) {
            expect(stack.storage[i]).to.equal(i);
          }
        });
      });
    });
  });
});
