function validateType(type) {
  switch (type) {
    case 'Category':
    case 'Question':
    case 'Thing':
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
    this.heading = opts.heading;
    this.content = opts.content || '';
    this.checked = opts.checked || false;
    this.level = opts.level || 0;
    this.parent = opts.parent || ''; // id
    this.children = opts.children || []; // id[]
    this.required = opts.required || false;
  }
}

export default Detail;
