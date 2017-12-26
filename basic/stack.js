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
}

module.exports = Stack;
