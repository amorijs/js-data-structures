class Stack {
  constructor() {
    this.length = 0;
    this.storage = [];
  }

  push(...values) {
    values.forEach(value => {
      this.storage.push(value);
      this.length += 1;
    });
  }

  pop() {
    if (this.length === 0) return;
    const valueToPop = this.storage[this.length - 1];
    this.length -= 1;
    return valueToPop;
  }

  peek() {
    if (this.length > 0) return this.storage[this.length - 1];
  }

  peekFront() {
    if (this.length > 0) return this.storage[0];
  }
}

module.exports = Stack;
