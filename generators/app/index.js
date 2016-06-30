var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  prompting: function () {
    var questions = [
      {
        type    : 'input',
        name    : 'project',
        message : 'Project name',
        default : this.appname
      },
      {
        type    : 'input',
        name    : 'description',
        message : 'Project description',
      },
      {
        type    : 'input',
        name    : 'author',
        message : 'Author name',
        store   : true
      }
    ];
    var done = this.async();

    return this.prompt(questions, function (answers) {
      this.project = answers.project;
      this.description = answers.description;
      this.author = answers.author;

      this.appname = this.project;
      this.year = (new Date()).getYear() + 1900;

      console.log('date is', this.year);

      done();
    }.bind(this));
  },
  writing: function () {
    this.log('Writing some copypasta');

    this.destinationRoot(this.appname);

    this.directory('src');
    this.directory('test');

    this.copy('babelrc', '.babelrc');
    this.copy('gitignore', '.gitignore');
    this.template('index.html');
    this.copy('index.js');
    this.template('LICENSE');
    this.copy('Makefile');
    this.template('package.json');
    this.template('README.md');
    this.copy('style.css');
    this.copy('webpack.config.js');

  },
  installing: function () {
    this.log('Installing dependencies');
    this.npmInstall(['redux'], { 'save': true });
    this.npmInstall(['react-redux'], { 'save': true });
    this.npmInstall(['tape'], { 'saveDev': true });
  }
});
