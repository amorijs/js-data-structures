const fs = require('fs');
const path = require('path');

const basicFilePaths = fs
  .readdirSync(path.join(__dirname, 'basic'))
  .map(fileName => `./basic/${fileName}`);

describe('Basic Data Structures', () => basicFilePaths.forEach(require));
