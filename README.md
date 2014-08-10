# Durable JSON Lint CLI

Provides a CLI for [durable-json-lint](https://www.npmjs.org/package/durable-json-lint).

## Usage

```
Usage:
  durable-json-lint [OPTIONS] [ARGS]

Options:
  -f, --format [STRING]  Specify output format. Uses handlebar syntax.
                         Available variables are: file, line, column,
                         status, and description.  (Default is {{file}}:{{line}}:{{column}}: {{description}})
  -v, --version          Display the current version
  -h, --help             Display help and usage details
```
Written for use with [LintCI](http://lintci.com).
