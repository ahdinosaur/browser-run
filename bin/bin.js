#!/usr/bin/env node

var run = require('..');
var optimist = require('optimist');
var resolve = require('path').resolve;
var cwd = process.cwd();

var argv = optimist
  .usage(
    'Run JavaScript in a browser.\n' +
    'Write code to stdin and receive console output on stdout.\n' +
    'Usage: $0 [OPTIONS]'
  )

  .describe('browser', 'Browser to use. '
      + 'Always available: electron. '
      + 'Available if installed: '
      + 'chrome, firefox, ie, phantom, safari')
  .alias('browser', 'b')
  .default('browser', 'electron')

  .describe('port', 'Starts listening on that port and waits for you to open a browser')
  .alias('p', 'port')

  .describe('static', 'Serve static assets from this directory')
  .alias('s', 'static')

  .describe('input', 'Input type. Defaults to \'javascript\', can be set to \'html\'.')
  .alias('i', 'input')

  .describe('mock', 'Mock http server')
  .alias('m', 'mock')

  .describe('help', 'Print help')
  .alias('h', 'help')

  .argv;

if (argv.help) return optimist.showHelp();

if ('string' == typeof argv.mock) {
  argv.mock = require(resolve(cwd, argv.mock))
}

process.stdin
  .pipe(run(argv))
  .pipe(process.stdout);
