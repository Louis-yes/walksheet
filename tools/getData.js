const fs = require("fs");
const list = fs.readFileSync('./list.text', "utf8");

class Project {
  constructor(opts) {
    this.title = opts.title || '';
    this.date = opts.date || '';
    this.description = opts.description || '';
    this.website = opts.website || '';
    this.details = opts.details || {};
  }
}

function validateType(type) {
  switch (type) {
    case 'Category':
    case 'Question':
    case 'Thing':
    case 'root':
      return type;
    default:
      return 'Question';
  }
}

class Detail {
  constructor(o) {
    const opts = o || {};
    this.type = validateType(opts.type);
    this.id = opts.id;
    this.title = opts.title;
    this.content = opts.content || '';
    this.checked = opts.checked || false;
    this.level = opts.level || 0;
    this.parent = opts.parent || ''; // id
    this.children = opts.children || []; // id[]
    this.required = opts.required || false;
  }
}

function eventFromList(list, name) {
  const LEVELS = ['root'];
  const details = {};
  const root = new Detail(
    {
      type: "root",
      id: "root",
      level: 1,
      required: true
    }
  )
  details['root'] = root;
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
      dd.type = isHeading(line) ? 'Category' : 'Question';
      console.log(dd.type);
      dd.children = [];
      dd.parent = 'root';
      // work out where in the tree we are
      let level = line.match(/\t/g) ? line.match(/\t/g).length + 1 : 1;
      level = isHeading(line) ? 0 : level;
      dd.level = level;
      dd.id = dd.title.replace(/\s/g, '_').toLowerCase();
      if (level > 0) {
        dd.id = LEVELS.slice(0, dd.level).join('|') + '|' + dd.id;
      }
      LEVELS[level] = dd.id;
      if (dd.level > 0) {
        dd.parent = LEVELS[dd.level - 1];
      }

      const detail = new Detail(dd);
      // assign to newList, then return for next array
      details[detail.id] = detail;
      return detail;
    }
    return null;
  }).filter(Boolean).forEach((dd) => {
    // assign children to parent blocks
    details[dd.parent].children.push(dd.id);
  });

  pp.details = details;
  // console.log(pp)  
  return pp;
}

fs.writeFile("runSheetData.json", JSON.stringify(eventFromList(list, "New Event")), "utf8", function(){
  console.log("done")
});

