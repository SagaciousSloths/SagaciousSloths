// module.exports = function(grunt) {
//   grunt.registerTask('speak', function() {
//     console.log('I am speaking');
//   });
// };

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    webpack: {
      build: require("./webpack.config.js")
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['client_react/**/.js'],
        dest: 'client_react/dist/<%= pkg.name %>.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/server/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server/index.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'client_react/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      dist: {
        files: {
          'client_react/dist/style.min.css': 'client_react/index.css'
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'client_react/**/*.js',
          //'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'client_react/*.css',
        tasks: ['cssmin']
      }
    },

    // shell: {
    //   prodServer: {
    //     command: 'git push ...',
    //     options: {
    //       stdout: true,
    //       stderr: true,
    //       failOnError: true
    //     }
    //   }
    // },
  });

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  // Main grunt tasks

  grunt.registerTask('test', [
    'mochaTest' //'eslint',
  ]);

  grunt.registerTask('build', [
    // 'concat',
    // 'uglify',
    // 'cssmin'
    'webpack'
  ]);

  grunt.registerTask('upload', function(n) {
    // if (grunt.option('prod')) {

    //   grunt.task.run([ 'shell:prodServer' ]);
    //       } else {
    //   grunt.task.run([ 'server-dev' ]);
    // }
  });

  grunt.registerTask('deploy', [
    'test',
    'build',
    //'upload'
  ]);

};
