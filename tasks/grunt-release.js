var shell = require('shelljs');

module.exports = function(grunt){
  grunt.registerTask('release', 'bump version, git tag, git push, npm publish', function(type){
    
    // increment the version
    var pgkFile = grunt.config('pkgFile') || 'package.json';
    var pkg = grunt.file.readJSON(pgkFile);
    var previousVersion = pkg.version;
    var newVersion = pkg.version = bumpVersion(previousVersion, type);

    // write updated package.json
    grunt.file.write(pgkFile, JSON.stringify(pkg, null, '  ') + '\n');
    grunt.log.ok('Version bumped to ' + newVersion);

    commit();

    function commit(){
      // commit release
      shell.exec('git commit ' + pgkFile + ' -m "release v' + newVersion + '"', {silent: false});
      grunt.log.ok('Changes committed');
    }

    function bumpVersion (version, versionType) {
      var type = {
        patch: 2,
        minor: 1,
        major: 0
      };

      var parts = version.split('.');
      var idx = type[versionType || 'patch'];

      parts[idx] = parseInt(parts[idx], 10) + 1;
      while(++idx < parts.length) {
        parts[idx] = 0;
      }
      return parts.join('.');
    };
  })
};