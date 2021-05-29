import list from './list.text';
// for uuid
const { v4: uuidv4 } = require('uuid');

// Functions
function isCaps(l) {
  return l !== l.toUpperCase();
}
function isLetter(l) {
  return l.length === 1 && l.match(/[a-z]/i);
}

function isHeading(str) {
  const letters = str.split('');
  return !letters.some(isCaps) && letters.some(isLetter);
}

// Create new list object
const newList = {
  ROOT: { Title: 'ROOT', Children: [] },
};
// a variable to keep track of our place in the tree
const Levels = [];

// Map over text to create object of blocks
list.split('\n').map((line) => {
  if (line.replace(/\r/g, '').length > 0) {
    const qq = {/*
        TODO: create type, do this in typescript
      */};

    qq.id = uuidv4();
    qq.Title = line.replace(/\t/g, '').replace(/\r/g, '');
    qq.Contents = '';
    qq.Type = isHeading(line) ? 'Heading' : 'Question';
    qq.Children = [];
    qq.Parent = 'ROOT';
    // work out where in the tree we are

    let level = line.match(/\t/g) ? line.match(/\t/g).length + 1 : 1;
    level = isHeading(line) ? 0 : level;
    qq.level = level;

    Levels[level] = qq.id;
    if (level === 0) {
      qq.Parent = 'ROOT';
      Levels[0] = qq.id;
    } else {
      qq.Parent = Levels[level - 1];
      Levels[level] = qq.id;
    }

    // assign to newList, then return for next array
    newList[qq.id] = qq;
    return qq;
  }
  return null;
}).filter(Boolean).forEach((qq) => {
  // assign children to parent blocks
  newList[qq.Parent].Children.push(qq.id);
});
export default newList;
