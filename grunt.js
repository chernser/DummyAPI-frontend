// This is the main application configuration file.  It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md
module.exports = function (grunt) {


    grunt.initConfig({

        // The clean files from previous builds.
        clean: {
          target: ["build"]
        },
    //
        // The lint task will run the build configuration and the application
        // JavaScript through JSHint and report any errors.
        // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md
        lint:{
            files:[
                "build/js/config.js", "app/**/*.js"
            ]
        },

        // The jshint option for scripturl is set to lax, because the anchor
        // override inside main.js needs to test for them so as to not accidentally
        // route.
        jshint:{
            options:{
                scripturl:true,
                evil: true
            }
        },
        copy:{
            debug:{
                files: {
                    "build/img/": "assets/img/**",
                    "build/js/": "assets/js/**",
                    "build/favicon.ico": "assets/favicon.ico",
                    "build/index.html": "assets/index.html",
                }
            },
        },
        handlebars_1:{
            all:{
                files:{
                    "build/js/templates.js":["app/templates/**/*.hbs"]
                }
            }
        },

        // concat merges the almond require/define shim
        // and templates into a single resource: build/app.js
        concat:{
            dist:{
                src:[
                    "assets/js/libs/almond.js",
                    "build/js/app.js",
                    "build/js/templates.js"
                ],

                dest:"build/js/app.js",

                separator:";"
            }
        },

        // This task uses the MinCSS Node.js project to take all your CSS files in
        // order and concatenate them into a single CSS file named index.css.  It
        // also minifies all the CSS as well.  This is named index.css, because we
        // only want to load one stylesheet in index.html.
        mincss:{
            "build/css/app.css":[
                "assets/css/h5bp.css",
                "assets/css/**/*.css"
            ]
        },

        // Takes the built app.js file and minifies it for filesize benefits.
        min:{
            "build/js/app.min.js":[
                "build/js/app.js"
            ]
        },

        // Running the server without specifying an action will run the defaults,
        // port: 8000 and host: 127.0.0.1.  If you would like to change these
        // defaults, simply add in the properties `port` and `host` respectively.
        // Alternatively you can omit the port and host properties and the server
        // task will instead default to process.env.PORT or process.env.HOST.
        //
        // Changing the defaults might look something like this:
        //
        // server: {
        //   host: "127.0.0.1", port: 9001
        //   debug: { ... can set host and port here too ...
        //  }
        //
        //  To learn more about using the server task, please refer to the code
        //  until documentation has been written.
        server:{

            // Ensure the favicon is mapped correctly.
            files:{ "favicon.ico":"build/favicon.ico" },

            debug:{
                port:4444,
                // Ensure the favicon is mapped correctly.
                files:{ "favicon.ico":"build/favicon.ico" },

                // Map `server:debug` to `debug` folders.
                folders:{
                    "img":"build/img",
                    "app":"build",
                    "js":"build/js",
                    "js/libs":"build/js"
                }
            },

            release:{
                // This makes it easier for deploying, by defaulting to any IP.
                host:"0.0.0.0",
                port:80,

                // Ensure the favicon is mapped correctly.
                files:{ "favicon.ico":"build/favicon.ico" },

                // Map `server:release` to `release` folders.
                folders:{
                    "app":"build",
                    "img":"build/img",
                    "js":"build",
                    "js/libs":"build",
                    "css":"build/css"
                }
            }
        },

        // This task uses James Burke's excellent r.js AMD build tool.  In the
        // future other builders may be contributed as drop-in alternatives.
				// debug keeps original resources intact for easier evaluation.
				// release substitutes almond and makes lean.
        requirejs:{
				  debug: { // Original config
            options: {
              // Include the main configuration file.
              mainConfigFile:"app/config.js",

              // Output file.
              out:"build/js/app.js",

              // Root application module.
              name:"config",

              // Do not wrap everything in an IIFE.
              wrap:false
            }
				  },
					/*
			    release: {
  			    options:{
  				    almond: true,
  						replaceRequireScript: [{
  							files: ['build/index.html'],
  							module: 'main',
  						}],
  						modules: [{name: 'main'}],
  						dir: 'build',
  						appDir: 'src',
  						baseUrl: 'js',
  						path: {
  							underscore: '../assets/js/libs/lodash',
  							jquery: '../assets/js/libs/jquery',
  							backbone: '../assets/js/libs/backbone',
  						}
					  }
				  }
					*/
			  },

        // The watch task monitors specified files for changes
        // and executes a task upon change.
        watch:{
            debug:{
                files:["app/**/*.js", "app/templates/**/*.hbs"],
                tasks:"debug"
            },
            release:{
                files:["app/**/*.js", "app/templates/**/*.hbs"],
                tasks:"release"
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
        }

    });


    grunt.loadTasks("tasks");

    // The debug task will remove all contents inside the dist/ folder, lint
    // all your code, precompile all the underscore templates into
    // dist/debug/templates.js, compile all the application code into
    // dist/debug/app.js, and then concatenate the require/define shim
    // almond.js and dist/debug/templates.js into the app.min.js file.
    grunt.registerTask("debug", "clean copy lint requirejs handlebars_1 concat min mincss");

    // Aliases for watch-server
    grunt.registerTask("watch-debug", "Launch debug web server and watch files for changes", function () {
        grunt.task.run("debug");
        var done = this.async();
        grunt.task.run("watch:debug");
        done();
        grunt.task.run("server:debug");
        done();
    });

    grunt.loadNpmTasks('grunt-contrib');

    // The release task will run the debug tasks and then minify the
    // dist/debug/app.min.js file and CSS files.
    grunt.registerTask("release", "debug"); // currently no difference!

};
