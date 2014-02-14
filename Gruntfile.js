module.exports = function(grunt) {
  grunt.initConfig({
    
    clean: {
      test: 'test/fixtures/_component.json'
    },
    nodeunit: {
      tests: 'test/release_test.js'
    },
    release: {
      options: {
        bump: true,
        file: 'package.json',
        add: true,
        commit: true,
        tag: true,
        push: true,
        pushTags: true,
        npm: true,
        npmtag: false,
        github: {
          repo: 'geddski/grunt-release',
          usernameVar: 'GITHUB_USERNAME',
          passwordVar: 'GITHUB_PASSWORD'
        }
      }
    },
    setup: {
      test: {
        src: 'test/fixtures/component.json',
        dest: 'test/fixtures/_component.json'
      }
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', [
    'clean',
    'setup',
    'release',
    'nodeunit',
    'clean'
  ]);

  grunt.registerMultiTask('setup', 'Setup test fixtures', function(){
    this.files.forEach(function(f){
      grunt.file.copy(f.src, f.dest);
    });
    grunt.config.set('release.options.file', 'test/fixtures/_component.json');
    grunt.config.set('release.options.add', false);
    grunt.config.set('release.options.commit', false);
    grunt.config.set('release.options.tag', false);
    grunt.config.set('release.options.push', false);
    grunt.config.set('release.options.pushTags', false);
    grunt.config.set('release.options.npm', false);
    grunt.config.set('release.options.github', false);
  });
};
