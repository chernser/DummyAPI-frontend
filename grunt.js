// This is the main application configuration file.  It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md
module.exports = function (grunt) {

 grunt.loadTasks('tasks');

  grunt.initConfig({

    clean:["dist/"],

    lint:{
      files:[
        "build/config.js", "app/**/*.js"
      ]
    },

    jshint:{
      options:{
        scripturl:true,
        evil:true
      }
    },

    handlebars:{
      all:{
        options: {
          processName: function(filename) {
            return filename.replace(/^.*[\\\/]/, '').split('.')[0];
          }
        },
        files:{
          "dist/templates.js":["app/templates/**/*.hbs"]
        }
      }
    },

    // The concatenate task is used here to merge the almond require/define
    // shim and the templates into the application code.  It's named
    // dist/debug/require.js, because we want to only load one script file in
    // index.html.
    concat:{

      debug:{
        src:[
          "assets/js/libs/almond.js",
          "dist/debug/app/require.js",
          "dist/templates.js"
        ],
        dest:"dist/debug/app/require.js",
        separator:";"
      },

      release:{
        src:[
          "assets/js/libs/almond.js",
          "dist/release/app/require.js",
          "dist/templates.js"
        ],

        dest:"dist/release/app/require.js",
        separator:";"
      }
    },

    // This task uses the MinCSS Node.js project to take all your CSS files in
    // order and concatenate them into a single CSS file named index.css.  It
    // also minifies all the CSS as well.  This is named index.css, because we
    // only want to load one stylesheet in index.html.
    mincss:{
      "dist/release/css/index.css":[
        "assets/css/h5bp.css",
        "assets/css/**/*.css"
      ]
    },

    // Takes the built require.js file and minifies it for filesize benefits.
    min:{
      "dist/release/app/require.js":[
        "dist/release/app/require.js"
      ]
    },

    server:{
      debug: {
        port: 8080,
        base: 'dist/debug',
        folders: {
          'img' : 'assets/img',
          'css' : 'assets/css',
          'css/images/' : 'assets/css/images',
          'app' : 'dist/debug/app'
        }
      },


      release: {
        port: 8080,
        ip_address: "0.0.0.0",

        base: 'dist/release',
        folders: {
          'img' : 'dist/release/img',
          'css' : 'dist/release/css',
          'css/images/' : 'dist/release/css/images',
          'app' : 'dist/release/app'
        }
      }
    },

    requirejs:{
      debug:{
        options:{
          mainConfigFile:"app/config.js",
          name:"config",
          wrap:false,
          out:"dist/debug/app/require.js",
          optimize: "none"
        }
      }
      ,

      release:{
        options:{
          mainConfigFile:"app/config.js",
          name:"config",
          wrap:false,
          out:"dist/release/app/require.js"
        }
      }
    },


    // The watch task monitors specified files for changes
    // and executes a task upon change.
    watch:{
      debug:{
        files:["app/**/*.js", "app/templates/**/*.hbs"],
        tasks:"build-debug"
      },
      release:{
        files:["app/**/*.js", "app/templates/**/*.hbs"],
        tasks:"build-release"
      }
    },

    // The headless QUnit testing environment is provided for "free" by Grunt.
    // Simply point the configuration to your test directory.
    qunit:{
      all:["test/qunit/*.html"]
    },

    // The headless Jasmine testing is provided by grunt-jasmine-task. Simply
    // point the configuration to your test directory.
    jasmine:{
      all:["test/jasmine/*.html"]
    },

    copy:{
      release:{
        files:{
          "dist/release/":["index.html"],
          "dist/release/img":["assets/img/**"],
          "dist/release/css":["assets/css/**"]
        }
      }
    }

  });

  grunt.registerTask("build-debug", "clean lint requirejs:debug handlebars concat:debug");

  grunt.registerTask("build-release", "clean lint requirejs:release handlebars concat:release min mincss copy:release");

  //TODO: make server task work with grunt-contrib
/*  grunt.registerTask("watch-debug", "Launch debug web server and watch files for changes", function () {
    grunt.task.run("debug");
    var done = this.async();
    grunt.task.run("watch:debug");
    done();
    grunt.task.run("server:debug");
    done();
  });*/
};
