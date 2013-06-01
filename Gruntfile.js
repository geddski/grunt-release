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
        file: 'test/fixtures/_component.json',
        add: false,
        commit: false,
        tag: false,
        push: false,
        pushTags: false,
        npm: false
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

  grunt.registerMultiTask('setup', 'Setup fixtures', function(){
    this.files.forEach(function(f){
      grunt.file.copy(f.src, f.dest);
    });
  });
};
