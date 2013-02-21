/*
 * grunt-release
 * https://github.com/geddesign/grunt-release
 *
 * Copyright (c) 2013 Dave Geddes
 * Licensed under the MIT license.
 */

var shell = require('shelljs');

module.exports = function(grunt){
  grunt.registerTask('release', 'bump version, git tag, git push, npm publish', function(type){
    var options = this.options({
      npm : true
    });

    var pkgFile = grunt.config('pkgFile') || 'package.json';
    var pkg = grunt.file.readJSON(pkgFile);
    var previousVersion = pkg.version;
    var newVersion = pkg.version = getNextVersion(previousVersion, type);

    bump();
    add();
    commit();
    tag();
    push();
    pushTags();
    if (options.npm) publish();

    function add(){
      run('git add ' + pkgFile);
    }

    function commit(){
      run('git commit ' + pkgFile + ' -m "release ' + newVersion + '"', pkgFile + ' committed');
    }

    function tag(){
      run('git tag ' + newVersion + ' -m "Version ' + newVersion + '"', 'New git tag created: ' + newVersion);
    }

    function push(){
      run('git push', 'pushed to github');
    }

    function pushTags(){
      run('git push --tags', 'pushed new tag '+ newVersion +' to github');
    }

    function publish(){
      run('npm publish', 'published '+ newVersion +' to npm');
    }

    function run(cmd, msg){
      shell.exec(cmd, {silent:true});
      if (msg) grunt.log.ok(msg);
    }

    function push(){
      shell.exec('git push');
      grunt.log.ok('pushed to github');
    }

    // write updated package.json
    function bump(){
      grunt.file.write(pkgFile, JSON.stringify(pkg, null, '  ') + '\n');
      grunt.log.ok('Version bumped to ' + newVersion);
    }

    function getNextVersion (version, versionType) {
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