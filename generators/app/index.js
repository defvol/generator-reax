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

      done();
    }.bind(this));
  },
  writing: function () {
    this.log('Writing some copypasta');

    this.destinationRoot(this.appname);

    this.directory('client');

    this.copy('babelrc', '.babelrc');
    this.copy('gitignore', '.gitignore');
    this.template('LICENSE');
    this.template('package.json');
    this.template('README.md');
    this.copy('webpack.config.js');
  }
});
