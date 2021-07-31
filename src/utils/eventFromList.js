import Project from '../types/Project';
import Detail from '../types/Detail';

function eventFromList(list, name) {
  const LEVELS = [];
  const details = [];
  const pp = new Project({ title: name });

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

  list.split('\n').map((line) => {
    if (line.replace(/\r/g, '').length > 0) {
      const dd = {};
      dd.title = line.replace(/\t/g, '').replace(/\r/g, '');
      dd.contents = '';
      dd.type = isHeading(line) ? 'Heading' : 'Question';
      dd.children = [];
      dd.parent = '';
      // work out where in the tree we are
      let level = line.match(/\t/g) ? line.match(/\t/g).length + 1 : 1;
      level = isHeading(line) ? 0 : level;
      dd.level = level;
      dd.id = dd.title.replace(' ', '-').toLowerCase();
      if (level > 0) {
        dd.id = LEVELS.slice(0, dd.level - 1).join('-') + dd.id;
      }
      LEVELS[level] = dd.id;
      if (dd.level > 0) {
        dd.parent = LEVELS[level - 1];
      }

      const detail = new Detail(dd);
      // assign to newList, then return for next array
      details[detail.id] = detail;
      return detail;
    }
    return null;
  }).filter(Boolean).forEach((dd) => {
    // assign children to parent blocks
    if (dd.parent) {
      details[dd.parent].children.push(dd.id);
    }
  });

  pp.details = details;
  return pp;
}

export default eventFromList;
