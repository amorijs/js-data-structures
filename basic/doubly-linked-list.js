const Node = function NodeConstructor(value) {
  this.next = null;
  this.previous = null;
  this.value = value;
};

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  contains(value) {
    if (this.find(value) !== null) return true;
    else return false;
  }

  find(value) {
    let current = this.head;

    while (current && current.value !== value) {
      current = current.next;
    }

    return current;
  }

  findLast(value) {
    let current = this.tail;

    while (current && current.value !== value) {
      current = current.previous;
    }

    return current;
  }

  findIndex(index) {
    if (index > Math.ceil(this.length / 2)) return this.findIndexFromLast(index);

    let current = this.head;

    for (let i = 0; i < index && current; i += 1) {
      current = current.next;
    }

    return current;
  }

  findIndexFromLast(index) {
    let current = this.tail;
    let stopIndex = this.length - index;

    for (let i = 0; i < stopIndex && current; i += 1) {
      current = current.previous;
    }

    return current;
  }

  add(value) {
    const newNode = new Node(value);

    if (this.length === 0) this.head = newNode;
    else this.tail.next = newNode;
    newNode.previous = this.tail;
    this.tail = newNode;

    this.length += 1;
    return this.length;
  }

  addAtIndex(index, value) {
    if (index > this.length || index < 0) throw new Error('Index out of bounds');
    if (typeof index !== 'number') throw new Error('Index must be of type number');

    const newNode = new Node(value);
    let current = this.head;

    for (let i = 0; i < index; i += 1) {
      current = current.next;
    }

    if (index > 0) {
      newNode.next = current;
      current.previous.next = newNode;
      current.previous = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length += 1;
    return this.length;
  }

  removeFirst() {
    if (this.length === 0) return null;

    const previousHeadValue = this.head.value;
    this.length -= 1;

    if (this.length > 0) {
      this.head = this.head.next;
      this.head.previous = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    return previousHeadValue;
  }

  removeLast() {
    if (this.length === 0) return null;

    const oldTailValue = this.tail.value;
    this.length -= 1;

    if (this.length > 0) {
      this.tail = this.tail.previous;
      this.tail.next = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    return oldTailValue;
  }
}

module.exports = { Node, DoublyLinkedList };
