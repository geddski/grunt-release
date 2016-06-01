module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({

    clean: {
      test: 'test/fixtures/_*.{json,md}'
    },
    nodeunit: {
      tests: 'test/release_test.js'
    },
    release: {
      options: {
        bump: true,
        file: 'package.json',
        changelog: 'CHANGELOG.md',
        changelogText: '### <%= version %> - ' + grunt.template.today('yyyy-mm-dd') + '\n',
        commitMessage: 'v<%= version %>',
        add: true,
        commit: true,
        tag: true,
        push: true,
        pushTags: true,
        npm: true,
        npmtag: false,
        github: {
          repo: 'geddski/grunt-release',
          accessTokenVar: 'GITHUB_ACCESS_TOKEN'
        }
      }
    },
    releaseTest: {
      options: {
        bump: true,
        add: false,
        commit: false,
        tag: false,
        push: false,
        pushTags: false,
        npm: false,
        npmtag: false,
        github: false
      },
      general: {
        options: {
          file: 'test/fixtures/_component.json',
          changelog: 'test/fixtures/_CHANGELOG.md',
          additionalFiles: ['test/fixtures/_bower.json'],
          changelogText: '### <%= version %>\n',
          commitMessage: 'v<%= version %>',
          beforeRelease: ['dummyBefore', { name: 'dummyBefore', preserveFlags: true }]
        }
      },
      absolute: {
        args: ['1.2.3'],
        options: {
          file: 'test/fixtures/_bower-absolute.json'
        }
      },
      patch: {
        args: ['patch'],
        options: {
          file: 'test/fixtures/_component-patch.json'
        }
      },
      minor: {
        args: ['minor'],
        options: {
          file: 'test/fixtures/_component-minor.json'
        }
      },
      major: {
        args: ['major'],
        options: {
          file: 'test/fixtures/_component-major.json'
        }
      }
    },
    setup: {
      test: {
        files: [{
          src: 'test/fixtures/component.json',
          dest: 'test/fixtures/_component.json'
        },{
          src: 'test/fixtures/bower.json',
          dest: 'test/fixtures/_bower.json'
        },{
          src: 'test/fixtures/CHANGELOG.md',
          dest: 'test/fixtures/_CHANGELOG.md'
        },{
          src: 'test/fixtures/bower.json',
          dest: 'test/fixtures/_bower-absolute.json'
        },{
          src: 'test/fixtures/component.json',
          dest: 'test/fixtures/_component-patch.json'
        },{
          src: 'test/fixtures/component.json',
          dest: 'test/fixtures/_component-minor.json'
        },{
          src: 'test/fixtures/component.json',
          dest: 'test/fixtures/_component-major.json'
        }]
      }
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', [
    'clean',
    'setup',
    'releaseTest',
    'nodeunit',
    'clean'
  ]);
  
  grunt.registerTask('dummyBefore', function(){
    var flags = grunt.option.flags().join(' ');
    var filePath = 'test/fixtures/_dummyBefore.json';
    var contents = grunt.file.exists(filePath) ? grunt.file.readJSON(filePath) : { timesCalled: 0, flags: [] };
    var updatedObject = {
      timesCalled: contents.timesCalled+1,
      flags: flags.length ? contents.flags.concat(flags) : contents.flags
    };
    
    grunt.file.write(filePath, JSON.stringify(updatedObject));
  });

  grunt.registerMultiTask('setup', 'Setup test fixtures', function(){
    this.files.forEach(function(f){
      grunt.file.copy(f.src, f.dest);
    });
  });

  grunt.registerMultiTask('releaseTest', function(){
    var args = (this.data.args || []).join(':');

    grunt.option.init({ flag: 'test' });
    grunt.config.set('release', {});
    grunt.config.merge({
      release: grunt.config.data[this.name]
    });

    grunt.config.merge({
      release: grunt.config.data[this.name][this.target]
    });

    grunt.task.run('release' + (args && ':' + args));
  });
};
