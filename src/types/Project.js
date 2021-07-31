class Project {
  constructor(opts) {
    this.title = opts.title || '';
    this.date = opts.date || '';
    this.description = opts.description || '';
    this.website = opts.website || '';
    this.details = opts.details || [];
  }
}

export default Project;
