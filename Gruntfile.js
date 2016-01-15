/*global
 module: false
 */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        compass: {
            /* https://npmjs.org/package/grunt-contrib-compass */
            options: {
                require: 'sass-globbing',
                sassPath: '<%= pkg.config.src %>/styles',
                cssPath: '<%= pkg.config.dist %>/css',
            },
            clean: {
                options: {
                    clean: true
                }
            },
            dev: {
                options: {
                    outputStyle: 'expanded'
                }
            },
            dist: {
                options: {
                    outputStyle: 'compressed',
                    raw: 'asset_cache_buster :none\n'
                }
            }
        },

        clean: {
            /* https://npmjs.org/package/grunt-contrib-clean */
            options: {
                force: true
            },
            scripts: ['<%= pkg.config.dist %>/js/*'],
            styles: ['<%= pkg.config.dist %>/css/*']
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.author.name %> | <%= pkg.author.url %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                beautify: false
            },
            dev: {
                options: {
                    beautify: true,
                    mangle: false
                },
                files: {
                    '<%= pkg.config.dist %>/js/scripts.js': [
                        '<%= pkg.config.src %>/js/*.js',
                        '<%= pkg.config.src %>/js/scripts.js'
                    ]
                }
            },
            dist: {
                files: {
                    '<%= pkg.config.dist %>/js/scripts.js': [
                        '<%= pkg.config.src %>/js/*.js',
                        '<%= pkg.config.src %>/js/scripts.js'
                    ]
                }
            }
        },

        assets_hash: {
            assets: {
                options: {
                    algorithm: 'md5',
                    jsonFile: '<%= pkg.config.hash_map %>',
                    suffix: true,
                },
                src: [
                    '<%= pkg.config.dist %>/js/*.js',
                    '<%= pkg.config.dist %>/css/*.css'
                ]
            }
        },

        watch: {
            /* https://npmjs.org/package/grunt-contrib-watch */
            scss: {
                files: [
                    '<%= pkg.config.src %>/styles/**/*.scss',
                    'Gruntfile.js'
                ],
                tasks: [
                    'compass:dev'
                ],
                options: {
                    nospawn: true,
                    interrupt: false,
                    interval: 100
                }
            },
            scripts: {
                files: [
                    '<%= pkg.config.src %>/js/**/*.js',
                    'Gruntfile.js'
                ],
                tasks: [
                    'clean:scripts',
                    'uglify:dev'
                ],
                options: {
                    interrupt: true,
                    beautify: true
                }
            }
        },

        browserSync: {
            bsFiles: {
                src: [
                    '<%= pkg.config.dist %>/css/*.css',
                    '<%= pkg.config.dist %>/js/*.js',
                    '*.html'
                ]
            },
            options: {
                server: false,
                watchTask: true,
                proxy: {
                    target: "http://localproject.com",
                },
            }
        },

        karma: {
            options: {
                configFile: 'karma.conf.js',
            }
        },
    });

    // general
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-assets-hash');
    grunt.loadNpmTasks('grunt-browser-sync');

    // styles
    grunt.loadNpmTasks('grunt-contrib-compass');

    //test js
    grunt.loadNpmTasks('grunt-karma');

    // grunt for distribution
    grunt.registerTask('dist', [
        'clean',
        'uglify:dist',
        'compass:clean',
        'compass:dist',
        "assets_hash:assets"
    ]);

    // grunt for development
    grunt.registerTask('dev', [
        'clean',
        'uglify:dev',
        'compass:clean',
        'compass:dev',
        "browserSync",
        'watch'
    ]);

    // grunt [default]
    grunt.registerTask('default', [
        'dev'
    ]);

    // grunt [development]
    grunt.registerTask('deploy', [
        'dist'
    ]);
};