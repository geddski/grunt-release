/*
 * grunt-release
 * https://github.com/geddski/grunt-release
 *
 * Copyright (c) 2013 Dave Geddes
 * Licensed under the MIT license.
 */

var shell = require('shelljs');
var semver = require('semver');

module.exports = function(grunt){
  grunt.registerTask('release', 'bump version, git tag, git push, npm publish', function(type){
    //defaults
    var options = this.options({
      bump: true,
      file: grunt.config('pkgFile') || 'package.json',
      add: true,
      commit: true,
      tag: true,
      push: true,
      pushTags: true,
      npm : true
    });

    var tagName = grunt.config.getRaw('release.options.tagName') || '<%= version %>';
    var commitMessage = grunt.config.getRaw('release.options.commitMessage') || 'release <%= version %>';
    var tagMessage = grunt.config.getRaw('release.options.tagMessage') || 'version <%= version %>';

    var config = setup(options.file, type);
    var templateOptions = {
      data: {
        version: config.newVersion
      }
    };

    if (options.bump) bump(config);
    if (options.add) add(config);
    if (options.commit) commit(config);
    if (options.tag) tag(config);
    if (options.push) push();
    if (options.pushTags) pushTags(config);
    if (options.npm) publish(config);

    function setup(file, type){
      var pkg = grunt.file.readJSON(file);
      var newVersion = pkg.version = semver.inc(pkg.version, type || 'patch');
      return {file: file, pkg: pkg, newVersion: newVersion};
    }

    function add(config){
      run('git add ' + config.file);
    }

    function commit(config){
      var message = grunt.template.process(commitMessage, templateOptions);
      run('git commit '+ config.file +' -m "'+ message +'"', config.file + ' committed');
    }

    function tag(config){
      var name = grunt.template.process(tagName, templateOptions);
      var message = grunt.template.process(tagMessage, templateOptions);
      run('git tag ' + name + ' -m "'+ message +'"', 'New git tag created: ' + name);
    }

    function push(){
      run('git push', 'pushed to github');
    }

    function pushTags(config){
      run('git push --tags', 'pushed new tag '+ config.newVersion +' to github');
    }

    function publish(config){
      run('npm publish', 'published '+ config.newVersion +' to npm');
    }

    function run(cmd, msg){
      shell.exec(cmd, {silent:true});
      if (msg) grunt.log.ok(msg);
    }

    function push(){
      shell.exec('git push');
      grunt.log.ok('pushed to github');
    }

    function bump(config){
      grunt.file.write(config.file, JSON.stringify(config.pkg, null, '  ') + '\n');
      grunt.log.ok('Version bumped to ' + config.newVersion);
    }

  });
};