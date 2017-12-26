const fs = require('fs');
const path = require('path');

const dataStructureFilePaths = fs
  .readdirSync(path.join(__dirname, 'structures'))
  .map(fileName => `./structures/${fileName}`);

describe('Basic Data Structures', () => dataStructureFilePaths.forEach(require));
