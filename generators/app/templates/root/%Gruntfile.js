// Generated on 2014-06-28 using generator-webapp 0.4.9
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths
  var _config = {
    bowerDir: JSON.parse(fs.readFileSync('./.bowerrc')).directory,
    serverSrcDir: '<%= serverSrcDir %>',
    clientSrcDir: '<%= clientSrcDir %>',
    testDir:      '<%= testDir %>',
    // targets
    tmpDevDir :   '<%= tmpDevDir  %>',
    tmpTestDir:   '<%= tmpTestDir %>',
    distDir:      '<%= distDir %>',
    tgtDir:       '<%%= process.env.TARGET === "dist" ? config.distDir : (process.env.TARGET === "test" ? config.tmpTestDir : config.tmpDevDir) %>',
    serverTgtDir: '<%%= config.tgtDir %>/server',
    clientTgtDir: '<%%= config.tgtDir %>/client',
    // options
    serverPort:   '<%%= process.env.TARGET === "dist" ? 8000 : (process.env.TARGET === "test" ? 8001 : 8002) %>',
    livereload: true  // use default port 35729
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: _config,

    // Empties folders to start fresh
    clean: {
      target: [
        '<%%= config.clientTgtDir %>/*',
        '<%%= config.serverTgtDir %>/*',
      ]
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      root: {
        files: {
          src: ['Gruntfile.js']
        }
      },
      server: {
        files: {
          src: ['<%%= config.serverSrcDir %>/scripts/{,*/}*.js']
        }
      },
      client: {
        files: {
          src: ['<%%= config.clientSrcDir %>/scripts/{,*/}*.js']
        }
      },
      test: {
        files: {
          src: ['<%%= config.testDir %>/client/scripts/{,*/}*.js']
        }
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      sass: {
        src: ['<%%= config.clientSrcDir %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,3}<%%= config.bowerDir %>\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        loadPath: [
          '<%%= config.bowerDir %>'
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= config.clientSrcDir %>/styles',
          src: ['*.scss'],
          dest: '<%%= config.clientTgtDir %>/styles',
          ext: '.css'
        }]
      },
      client: {
        files: [{
          expand: true,
          cwd: '<%%= config.clientSrcDir %>/styles',
          src: ['*.scss'],
          dest: '<%%= config.clientTgtDir %>/styles',
          ext: '.css'
        }]
      }
    },
    
    jade: {
      client: {
        options: {
          client: true,
          amd: true,
          processName: function(filename) {
            filename = path.relative(path.join(grunt.config('config.clientSrcDir'), 'templates'), filename);
            filename = filename.substr(0, filename.lastIndexOf('.'));
            return filename;
          }
        },
        files: [{
          src: ['<%%= config.clientSrcDir %>/templates/{,*/}*.jade'],
          dest: '<%%= config.clientTgtDir %>/scripts/templates.js'
        }]
      }
    },


    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      dist: {
        devFile: '<%%= config.bowerDir %>/modernizr/modernizr.js',
        outputFile: '<%%= config.clientTgtDir %>/scripts/modernizr-custom.js',
        files: {
          src: [
            '<%%= config.clientTgtDir %>/scripts/{,*/}*.js',
            '<%%= config.clientTgtDir %>/styles/{,*/}*.css',
          ]
        },
        uglify: true
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      client: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%%= config.clientSrcDir %>/images',
            dest: '<%%= config.clientTgtDir %>/images/',
            src: '{,*/}*'
          },
          {
            expand: true,
            dot: true,
            cwd: '<%%= config.clientSrcDir %>/pages',
            dest: '<%%= config.clientTgtDir %>/pages/',
            src: '{,*/}*'
          },
          {
            expand: true,
            dot: true,
            cwd: '<%%= config.clientSrcDir %>/styles',
            dest: '<%%= config.clientTgtDir %>/styles/',
            src: '{,*/}*.css'
          },
          {
            expand: true,
            dot: true,
            cwd: '<%%= config.clientSrcDir %>/scripts',
            dest: '<%%= config.clientTgtDir %>/scripts/',
            src: ['{,*/}*.js', '!{,*/}*.tpl.js']
          },
        ]
      },
      server: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%%= config.serverSrcDir %>/scripts',
            dest: '<%%= config.serverTgtDir %>/scripts/',
            src: '{,*/}*.js'
          },
          {
            expand: true,
            dot: true,
            cwd: '<%%= config.serverSrcDir %>/views',
            dest: '<%%= config.serverTgtDir %>/views/',
            src: '{,*/}*.{html,jade}'
          }
        ]
      },
      test: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%%= config.testDir %>/client/scripts',
            dest: '<%%= config.clientTgtDir %>/test/scripts/',
            src: ['{,*/}*.js', '!{,*/}*.tpl.js']
          }
        ]  
      },
    },

    template: {
      client: {
        options: {
          data: {
            appBaseUrl: '/app',
            vendorBaseUrl: '/vendor'
          }
        },
        files: [
          { 
            expand: true,
            dot: true,
            cwd: '<%%= config.clientSrcDir %>/scripts',
            dest: '<%%= config.clientTgtDir %>/scripts/',
            src: ['{,*/}*.tpl.js'],
            ext: '.js'
          }
        ]
      },
      test: {
        options: {
          data: {
            testBaseUrl: '/base/<%%= config.clientTgtDir %>/test',
            appBaseUrl: 'http://localhost:<%%= config.serverPort %>/app',
            vendorBaseUrl: 'http://localhost:<%%= config.serverPort %>/vendor'
          }
        },
        files: [
          { 
            expand: true,
            dot: true,
            cwd: '<%%= config.testDir %>/client/scripts',
            dest: '<%%= config.clientTgtDir %>/test/scripts/',
            src: ['{,*/}*.tpl.js'],
            ext: '.js'
          }
        ]
      }
    },

    express: {
      develop: {
        options: {
          script: './<%%= config.serverTgtDir %>/scripts/startapp.js',
          args: [
            '--vendorDir',  '<%%= config.bowerDir %>', 
            '--clientDir',  '<%%= config.clientTgtDir %>',
            '--port',       '<%%= config.serverPort %>',
            '--livereload', '<%%= config.livereload %>'
          ]
        }
      },
      test: {
        options: {
          script: './<%%= config.serverTgtDir %>/scripts/startapp.js',
          args: [
            '--vendorDir',  '<%%= config.bowerDir %>', 
            '--clientDir',  '<%%= config.clientTgtDir %>',
            '--port',       '<%%= config.serverPort %>',
          ]
        }
      },
      dist: {
        options: {
          script: './<%%= config.serverTgtDir %>/scripts/startapp.js',
          args: [
            '--vendorDir',  '<%%= config.bowerDir %>', 
            '--clientDir',  '<%%= config.clientTgtDir %>',
            '--port',       '<%%= config.serverPort %>',
          ]
        }
      }
    },

    setupKarma: {
      all: {
        files: [
          {
            cwd: '<%%= config.clientTgtDir %>/test/scripts',
            src: '**/*.test.js',
          }
        ]
      }   
    },

    karma: {
      all: {
        files: [
          { 
            src: '<%%= config.clientTgtDir %>/test/scripts/main.js',
          },
          {
            src: '<%%= config.clientTgtDir %>/test/scripts/{,*/}*.js',
            included: false
          },
        ],
        frameworks: [
          'mocha'<% if (includeRequireJS) { %>,
          'requirejs'<% } %><% if (includeCurlJS) { %>,
          'curl-amd'<% } %>
        ],
        browsers: [
          'PhantomJS', 
          'Chrome'
        ],
        // background: true,
        // singleRun: true,
        // browserNoActivityTimeout: 100000,
        // captureTimeout: 5000,
      }
    },  


    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= config.clientTgtDir %>/styles/',
          src: '{,*/}*.css',
          dest: '<%%= config.clientTgtDir %>/styles/'
        }]
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      makeTarget: [<% if (includeSass) { %>
        'sass:client',<% } %>
        'jade:client',
        'copy:client',
        'template:client',
        'copy:server',
      ],
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['jshint:root']
      },

      // copy tasks (client)
      clientScripts: {
        files: ['<%%= config.clientSrcDir %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:client', 'newer:copy:client', 'newer:template:client']
      },
      clientStyles: {
        files: ['<%%= config.clientSrcDir %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:client', 'autoprefixer']
      },
      clientImages: {
        files: ['<%%= config.clientSrcDir %>/images/{,*/}*'],
        tasks: ['newer:copy:client']
      },
      clientPages: {
        files: ['<%%= config.clientSrcDir %>/pages/{,*/}*'],
        tasks: ['newer:copy:client']
      },
      // transform tasks (client)
      clientSass: {
        files: ['<%%= config.clientSrcDir %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:client', 'autoprefixer']
      },
      clientJade: {
        files: ['<%%= config.clientSrcDir %>/templates/{,*/}*.jade'],
        tasks: ['jade:client']
      },
      // copy tasks (server)
      serverScripts: {
        files: ['<%%= config.serverSrcDir %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:server', 'newer:copy:server']
      },
      serverViews: {
        files: ['<%%= config.serverSrcDir %>/views/{,*/}*.{jade,html}'],
        tasks: ['newer:copy:server']
      },
      // transform tasks (server)
      // copy tasks (test)
      testScripts: {
        files: ['<%%= config.testDir %>/client/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:server', 'newer:copy:test']
      },
      // reload (client)
      livereload: {
        files: [
          '<%%= config.clientTgtDir %>/styles/{,*/}*.css',
          '<%%= config.clientTgtDir %>/scripts/{,*/}*.js',
          '<%%= config.clientTgtDir %>/images/{,*/}*'
        ],
        options: {
          livereload: '<%%= config.livereload %>'
        }
      },
      // reload (server)
      express: {
        files: [
          '<%%= config.serverTgtDir %>/scripts/{,*/}*.js',
          '<%%= config.serverTgtDir %>/views/{,*/}*.{jade,html}',
        ],
        tasks: ['express:develop:start'],
        options: {
          spawn: false,
          livereload: '<%%= config.livereload %>'
        }
      },
      // reload (karma)
      karma: {
        files: ['<%%= config.clientTgtDir %>/test/scripts/{,*/}*.js'],
        tasks: ['karma:all:run']
      }
    },
  });


  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run([
        'build', 
        'express:dist', 
        'keepalive'
      ]);
    }

    grunt.task.run([
      'clean:target',
      'wiredep',
      'jshint',
      'concurrent:makeTarget',
      'express:develop:start',
      'watch'
    ]);
  });

  grunt.registerMultiTask('setupKarma', function() {
    var configBase = 'karma.' + this.target;
    for (var i=0; i<arguments.length; ++i) {
      var arg = arguments[i];
      switch (arg) {
        case 'files':
          var testFiles = this.filesSrc;
          console.log('target=', this.target, 'testFiles=', testFiles);
          grunt.config.set(configBase + '.client.testFiles', testFiles);
          break;
        case 'single':
          grunt.config.set(configBase + '.background', false);
          grunt.config.set(configBase + '.singleRun', true);
          break;
        case 'back':
          grunt.config.set(configBase + '.background', true);
          grunt.config.set(configBase + '.singleRun', false);
          break;
        default:
          console.log('setupKarma: unexpected arg %s', arg);
      }
    }

  });

  grunt.registerTask('test', function() {
    var targets = _.object(_.map(arguments, function(arg) {return [arg, true]; }));
    if (!targets.watch && !targets.single) {
      targets.single = true;
    }
    grunt.task.run([
      'switchTarget:test',
    ]);
    if (!targets.fast) {
      grunt.task.run([
        'clean:target',
        'concurrent:makeTarget',
      ]);
    }  
    grunt.task.run([
      'copy:test',
      'template:test',
      'express:test:start',
    ]);
    if (targets.single) {
      grunt.task.run([
        'setupKarma:all:files:single',
        'karma:all',
      ]);
    }
    if (targets.watch) {
      grunt.task.run([
        'setupKarma:all:files:back',
        'karma:all',
        'watch'
      ]);
    }
  });

  grunt.registerTask('showConfig', function() {
    console.log('config=', grunt.config('config'));
  });

  grunt.registerTask('switchTarget', function(name) {
    process.env.TARGET = name;
  });

  grunt.registerTask('build', function() {
    grunt.task.run([
      'switchTarget:dist',
      'clean:target',
      'wiredep',
      'concurrent:makeTarget',
    ]);
  });

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
