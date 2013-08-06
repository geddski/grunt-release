module.exports = function(grunt) {
  grunt.initConfig({
    bump: true,
    file: 'package.json',
    add: true,
    commit: true,
    tag: true,
    push: true,
    pushTags: true,
    npm: true,
    clean: {
      test: 'test/fixtures/_component.json'
    },
    nodeunit: {
      tests: 'test/release_test.js'
    },
    release: {
      options: {
        bump: '<%= bump %>',
        file: '<%= file %>',
        add: '<%= add %>',
        commit: '<%= commit %>',
        tag: '<%= tag %>',
        push: '<%= push %>',
        pushTags: '<%= pushTags %>',
        npm: '<%= npm %>'
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
    grunt.config.set('file', 'test/fixtures/_component.json');
    grunt.config.set('add', false);
    grunt.config.set('commit', false);
    grunt.config.set('tag', false);
    grunt.config.set('pushTags', false);
    grunt.config.set('npm', false);
  });
};
