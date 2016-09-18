var test = require('tap').test;
var run = require('..');
var concat = require('concat-stream');

test('mock', function (t) {
  t.plan(3);
  var browser = run({
    mock: function (req, res) {
      t.equal(req.url, '/mock')
      res.end('foo')
    }
  });

  browser.pipe(concat(function(data){
    t.equal(data.toString(), 'foo\n', 'data');
  }));

  browser.on('exit', function (code) {
    t.equal(code, 0, 'exit');
  });

  browser.end(`
    var request = new XMLHttpRequest();
    request.onload = function () {
      console.log(this.responseText);
      window.close();
    };
    request.open('GET', 'mock');
    request.send(null);
  `);
});
