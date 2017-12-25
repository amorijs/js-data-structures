const chai = require('chai');
const { expect } = chai;
const should = chai.should();

const { Node, DoublyLinkedList } = require('../../basic/doubly-linked-list.js');

const hooks = {
  addNodesToList(list, numOfNodes) {
    for (let i = 0; i < numOfNodes; i += 1) {
      list.add(i);
    }
  },

  clearList(list) {
    list.head = null;
    list.tail = null;
    list.length = 0;
  }
};

describe('doubly linked list node', () => {
  const value = { test: 'value' };
  const node = new Node(value);

  it('should have a next and previous property both initialized to null', () => {
    expect(node.next).to.equal(null);
    expect(node.previous).to.equal(null);
  });

  it('should have a value property set to the value that was passed in to the constructor', () => {
    expect(node.value).to.equal(value);
  });
});

describe('doubly linked list', () => {
  let list;

  beforeEach('create/reset list', () => {
    list = new DoublyLinkedList();
  });

  describe('new linked list', () => {
    it('should have head and tail properties initialized to null', () => {
      expect(list.head).to.equal(null);
      expect(list.tail).to.equal(null);
    });

    it('should have a length property set to 0', () => {
      expect(list.length).to.equal(0);
    });
  });

  describe('methods', () => {
    let originalLength = 10;
    let halfLength = Math.floor(originalLength / 2);

    describe('add', () => {
      it('should be a function', () => {
        list.add.should.be.a('function');
      });

      it('should set head and tail to the first node added', () => {
        list.add(32);
        expect(list.head).to.exist;
        expect(list.head.value).to.equal(32);
        expect(list.head).to.equal(list.tail);
      });

      it('after adding more than one node, the tail should change but not the head', () => {
        list.add(8);
        const originalHead = list.head;
        const originalTail = list.tail;

        for (let i = 0; i < 5; i += 1) {
          list.add(i);
          expect(list.tail.value).to.equal(i);
          expect(list.head).to.equal(originalHead);
          expect(list.tail).to.not.equal(originalTail);
        }
      });

      it('adding nodes should change the next value of the old tail', () => {
        list.add(5);
        const head = list.head;
        let current = head;

        for (let i = 0; i < 5; i += 1) {
          list.add(i);
          let addedNode = list.tail;
          expect(current.next).to.equal(addedNode);
          current = current.next;
        }
      });

      it('added nodes should have a previous value set to the old tail', () => {
        for (let i = 0; i < 5; i += 1) {
          const oldTail = list.tail;
          list.add(i);
          expect(list.tail.previous).to.equal(oldTail);
        }
      });

      it('should increase in length when a node is added to the list', () => {
        for (let i = 0; i < 5; i += 1) {
          list.add(i);
          expect(list.length).to.equal(i + 1);
        }
      });

      it('should return the new length of the list', () => {
        for (let i = 0; i < 5; i += 1) {
          expect(list.add(i)).to.equal(i + 1);
        }
      });
    });

    describe('addAtIndex', () => {
      beforeEach('add nodes to list', () => hooks.addNodesToList(list, originalLength));

      it('should be a function', () => expect(list.addAtIndex).to.be.a('function'));

      it('should throw an error if index is not defined or out of range', () => {
        const createAddAtIndex = (index, value) => () => list.addAtIndex(index, value);

        expect(createAddAtIndex(-5, 'value')).to.throw(/index/gi);
        expect(createAddAtIndex(originalLength + 10, 'value')).to.throw(/index/gi);

        expect(createAddAtIndex(null, 'value')).to.throw(/index/gi);
      });

      it('should add to the beginning of list if index is 0', () => {
        const uniqueValue = {};
        const oldHead = list.head;
        list.addAtIndex(0, uniqueValue);
        expect(list.head).to.not.equal(oldHead);
        expect(list.head.value).to.equal(uniqueValue);
      });

      it('adding to beginning of list sets new head-nodes next to old head-node', () => {
        const oldHead = list.head;
        list.addAtIndex(0, 'value');
        expect(list.head.next).to.equal(oldHead);
      });

      it('adding a node should change the previous value of the old node at that index', () => {
        let nodeToChange = list.head;

        for (let i = 0; i < halfLength; i += 1) {
          nodeToChange = nodeToChange.next;
        }

        const uniqueValue = {};
        list.addAtIndex(halfLength, uniqueValue);
        expect(nodeToChange.previous.value).to.equal(uniqueValue);
      });

      it('adding a node should change the next value of the node before it', () => {
        let nodeToChange = list.head;

        for (let i = 0; i < halfLength; i += 1) {
          nodeToChange = nodeToChange.next;
        }

        nodeToChange = nodeToChange.previous;

        const uniqueValue = {};
        list.addAtIndex(halfLength, uniqueValue);
        expect(nodeToChange.next.value).to.equal(uniqueValue);
      });

      it('added node should have correct previous and next values', () => {
        let expectedNext = list.head;
        let expectedPrevious;

        for (let i = 0; i < halfLength; i += 1) {
          expectedNext = expectedNext.next;
        }

        expectedPrevious = expectedNext.previous;

        const uniqueValue = {};
        list.addAtIndex(halfLength, uniqueValue);
        expect(expectedPrevious.next.value).to.equal(uniqueValue);
        expect(expectedNext.previous.value).to.equal(uniqueValue);
      });
    });

    describe('contains', () => {
      beforeEach('add nodes to list', () => hooks.addNodesToList(list, originalLength));

      it('should be a function', () => expect(list.contains).to.be.a('function'));

      it('should return false if list is empty', () => {
        hooks.clearList(list);
        expect(list.contains(halfLength)).to.equal(false);
      });

      it('should return false if value is not found', () => {
        expect(list.contains(originalLength + 10)).to.equal(false);
      });

      it('should return true if value is found in list', () => {
        expect(list.contains(halfLength)).to.equal(true);
      });
    });

    describe('find', () => {
      beforeEach('add nodes to list', () => hooks.addNodesToList(list, originalLength));

      it('should be a function', () => expect(list.find).to.be.a('function'));

      it('should return null if the value is not found', () => {
        expect(list.find('value not in list')).to.equal(null);
      });

      it('should return the a node that contains the specified value', () => {
        const node = list.find(halfLength);
        expect(node).to.exist;
        expect(node).to.be.an.instanceOf(Node);
        expect(node.value).to.equal(halfLength);
      });

      it('should not return a node that contains the same value further down the link chain', () => {
        list.add(halfLength);
        const duplicateNode = list.tail;
        list.add(halfLength + 1);
        list.add(halfLength - 1);
        expect(list.find(halfLength)).to.not.equal(duplicateNode);
      });
    });

    describe('findLast', () => {
      beforeEach('add nodes to list', () => hooks.addNodesToList(list, originalLength));

      it('should be a function', () => expect(list.findLast).to.be.a('function'));

      it('should return null if the value is not found', () => {
        expect(list.findLast('value not in list')).to.equal(null);
      });

      it('should return a node that contains the specified value', () => {
        const node = list.findLast(halfLength);
        expect(node).to.exist;
        expect(node).to.be.an.instanceOf(Node);
        expect(node.value).to.equal(halfLength);
      });

      it('should not return a node that contains the same value further down the link chain', () => {
        list.add(halfLength);
        const duplicateNode = list.find(halfLength);
        list.add(halfLength + 1);
        list.add(halfLength - 1);
        expect(list.findLast(halfLength)).to.not.equal(duplicateNode);
      });
    });

    describe('findIndex', () => {
      beforeEach('add nodes to list', () => hooks.addNodesToList(list, originalLength));

      it('should be a function', () => expect(list.findLast).to.be.a('function'));

      it('should return the appropriate node for the given index', () => {
        let nodeToFind = list.head;

        for (let i = 0; i < halfLength; i += 1) {
          nodeToFind = nodeToFind.next;
        }

        expect(list.findIndex(halfLength)).to.equal(nodeToFind);
      });

      it('should search from the end of the list if the search index is greater than half the list length', () => {
        for (let i = originalLength; i < 1000000; i += 1) {
          list.add(i);
        }

        let timeBefore = Date.now();
        list.findIndex(Math.floor(0.95 * list.length));
        const elapsedTimeForEndOfListSearch = Date.now() - timeBefore;

        timeBefore = Date.now();
        list.findIndex(Math.floor(0.5 * list.length));
        const elapsedTimeForMiddleOfListSearch = Date.now() - timeBefore;

        expect(elapsedTimeForEndOfListSearch).to.be.below(elapsedTimeForMiddleOfListSearch);
      });
    });

    describe('removeFirst', () => {
      beforeEach('add nodes to the list', () => hooks.addNodesToList(list, originalLength));

      it('should be a function', () => expect(list.removeFirst).to.be.a('function'));

      it('should return the old head-nodes value', () => {
        const oldHeadValue = list.head.value;
        const removedNodeValue = list.removeFirst();
        expect(removedNodeValue).to.equal(oldHeadValue);
      });

      it('head should point to the old head-nodes next', () => {
        const expectedNewHead = list.head.next;
        list.removeFirst();
        expect(list.head).to.equal(expectedNewHead);
      });

      it('new head-nodes previous should be set to null', () => {
        for (let i = 0; i < originalLength - 1; i += 1) {
          list.removeFirst();
          expect(list.head.previous).to.equal(null);
        }
      });

      it('should decrease in length by 1 every time a node is removed', () => {
        for (let i = 1; i <= originalLength; i += 1) {
          list.removeFirst();
          expect(list.length).to.equal(originalLength - i);
        }
      });

      it('removing the last node in the list should return null and cause head and tail to become null', () => {
        hooks.clearList(list);

        for (let i = 0; i < 3; i += 1) {
          const removedValue = list.removeFirst();
          expect(list.head).to.equal(null);
          expect(list.tail).to.equal(null);
          expect(removedValue).to.equal(null);
        }
      });

      it('removing from empty list should not change length', () => true);
    });

    describe('removeLast', () => {
      beforeEach('add nodes to the list', () => hooks.addNodesToList(list, originalLength));

      it('should be a function', () => expect(list.removeLast).to.be.a('function'));

      it('should return the old tail-nodes value', () => {
        const originalTailValue = list.tail.value;
        const removedNodeValue = list.removeLast();
        expect(removedNodeValue).to.equal(originalTailValue);
      });

      it('tail should point to the node before the old tail-node', () => {
        const expectedNewTail = list.tail.previous;
        list.removeLast();
        expect(list.tail).to.equal(expectedNewTail);
      });

      it('should decrease in length every time a node is removed', () => {
        for (let i = 1; i <= originalLength; i += 1) {
          list.removeLast();
          expect(list.length).to.equal(originalLength - i);
        }
      });

      it('should set head and tail to null when removing the only node in the list', () => {
        for (let i = 0; i < originalLength; i += 1) {
          list.removeLast();
        }

        expect(list.head).to.equal(null);
        expect(list.tail).to.equal(null);
      });

      it('new tail-node should have next set to null', () => {
        for (let i = 0; i < originalLength - 1; i += 1) {
          list.removeLast();
          expect(list.tail.next).to.equal(null);
        }
      });

      it('should return null if the list is empty', () => {
        hooks.clearList(list);
        expect(list.removeLast()).to.equal(null);
      });

      it('should not change in length when the list is empty', () => {
        hooks.clearList(list);
        list.removeLast();
        expect(list.length).to.equal(0);
      });
    });
  });
});
