var grunt = require('grunt');

exports.release = {
  bump: function(test){
    test.expect(1);

    var actual = grunt.file.readJSON('test/fixtures/_component.json');
    var expected = grunt.file.readJSON('test/expected/component.json');
    test.equal(actual.version, expected.version, 'should set version 0.0.13');

    test.done();
  }
};
