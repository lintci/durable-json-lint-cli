var fs = require('fs'),
  durableJsonLint = require('durable-json-lint'),
  cli = require('cli'),
  handlebars = require('handlebars');

var OPTIONS = {
  format: [
    'f',
    'Specify output format. Uses handlebar syntax. Available variables are: file, line, column, status, and description.',
    'string',
    '{{file}}:{{line}}:{{column}}: {{{description}}}'
  ]
};

function lint(file) {
  var jsonString = fs.readFileSync(file).toString();

  return durableJsonLint(jsonString).errors;
}

function report(file, errors, reportTemplate) {
  errors.forEach(function(error) {
    console.log(format(file, error, reportTemplate));
  });
}

function format(file, error, reportTemplate) {
  return reportTemplate({
    file: file,
    line: error.lineNumber,
    column: error.column,
    status: error.status,
    description: error.description
  });
}

function interpret(args) {
  cli.setArgv(args);
  cli.options = {};

  cli.enable('version', 'glob', 'help');
  cli.setApp(__dirname + '/../package.json');
  cli.setApp('durable-json-lint', cli.version);

  var options = cli.parse(OPTIONS),
    reportTemplate = handlebars.compile(options.format);

  var exitCode = 0;

  cli.args.forEach(function(file){
    var errors = lint(file);

    report(file, errors, reportTemplate);

    exitCode = exitCode || errors.length ? 1 : 0;
  });

  process.exit(exitCode);
}

module.exports = {interpret: interpret};
