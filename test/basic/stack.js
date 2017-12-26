const chai = require('chai');
const { expect } = chai;

const Stack = require('../../basic/stack');

const hooks = {
  clearStack(stack) {
    stack.length = 0;
    stack.storage = [];
  }
};

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
        it('should be a function', () => expect(stack.push).to.be.a('function'));

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

      describe('pop', () => {
        it('should be a function', () => expect(stack.push).to.be.a('function'));

        it('should decrease in length everytime a value is popped', () => {
          const length = 10;

          for (let i = 0; i < length; i += 1) {
            stack.push(`value ${i}`);
          }

          for (let i = length - 1; i >= 0; i -= 1) {
            stack.pop();
            expect(stack.length).to.equal(i);
          }
        });

        it('should not decrease in length and return undefined if the stack is empty', () => {
          hooks.clearStack(stack);

          for (let i = 0; i < 10; i += 1) {
            const popped = stack.pop();
            expect(popped).to.equal(undefined);
            expect(stack.length).to.be.at.least(0);
          }
        });

        it('should return the top of the stack if it has items', () => {
          const length = 10;

          for (let i = 0; i < length; i += 1) {
            stack.push(i);
          }

          for (let i = length - 1; i >= 0; i -= 1) {
            expect(stack.pop()).to.equal(i);
          }
        });
      });

      describe('peek', () => {
        it('should be a function', () => expect(stack.peek).to.be.a('function'));

        it('should return undefined if the stack is empty', () => {
          hooks.clearStack(stack);
          expect(stack.peek()).to.equal(undefined);
        });

        it('should return the top of the stack if it has items', () => {
          stack.push(0);
          expect(stack.peek()).to.equal(0);
          const uniqueValue = {};
          stack.push(uniqueValue);
          expect(stack.peek()).to.equal(uniqueValue);
        });
      });

      describe('peekFront', () => {
        it('should be a function', () => expect(stack.peek).to.be.a('function'));

        it('should return undefined if the stack is empty', () => {
          hooks.clearStack(stack);
          expect(stack.peekFront()).to.equal(undefined);
        });

        it('should return the bottom of the stack if it has items', () => {
          const uniqueValue = {};
          stack.push(uniqueValue);
          expect(stack.peekFront()).to.equal(uniqueValue);
          stack.push(0);
          expect(stack.peekFront()).to.equal(uniqueValue);
        });
      });
    });
  });
});
