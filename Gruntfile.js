module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            path: {
                vs: 'bower_components',
                assets: {
                    styles: '_assets/styles',
                    scripts: '_assets/scripts'
                }
            }
        },
        concat: {
            site_less: {
                src: "<%= meta.path.assets.styles %>/**/*.less",
                dest: "css/screen.css"
            }
        },
        less: {
            site_less: {
                options: {
                    yuicompress: false
                },
                files: {
                    "css/screen.css": "css/screen.css"
                }
            }
        },
        cssmin: {
            site_css: {
                files: {
                    "css/screen.css": "css/screen.css"
                }
            }
        },
        uglify: {
            dev_js: {
                options: {
                    mangle: false,
                    beautify: true,
                    preserveComments: true,
                    compress:false
                },
                files: {
                    "js/html5shiv.js": "<%= meta.path.vs%>/html5shiv/dist/html5shiv.js",
                    "js/vendors.js":[
                        "<%= meta.path.vs%>/jquery/jquery.js"
                    ],
                    "js/scripts.js":[
                        "<%= meta.path.assets.scripts%>/**/*.js",
                        "<%= meta.path.assets.scripts%>/scripts.js"
                    ]
                }
            },
            prod_js: {
                files: {
                    "js/html5shiv.js": "<%= meta.path.vs%>/html5shiv/dist/html5shiv.js",
                    "js/vendors.js":[
                        "<%= meta.path.vs%>/jquery/jquery.js"
                    ],
                    "js/scripts.js":[
                        "<%= meta.path.assets.scripts%>/**/*.js",
                        "<%= meta.path.assets.scripts%>/scripts.js"
                    ]
                }
            }
        },
        jekyll: {
            options: {
                //bundleExec: true,
                src: '<%= app %>'
            },
            build: {
                options: {
                    dest: '<%= dist %>',
                    config: '_configProd.yml',
                    drafts: false
                }
            },
            dev_serve: {
                options: {
                    serve: true,
                    config: '_config.yml',
                    drafts: false,
                    limit_posts: 1
                }
            }
        },
        concurrent: {
            watch: ['watch','jekyll:dev_serve']
        },
        watch: {
            jekyll: {
                files: ['./**/*.html', './_posts/.*','./_layout/*.html'],
                tasks: ['jekyll:build']
            },
            scripts: {
                files: [
                    '<%= meta.path.assets.scripts %>/**/*.js'
                ],
                tasks: ['uglify:dev_js','jekyll:build']
            },
            styles: {
                files: [
                    '<%= meta.path.assets.styles %>/**/*.css',
                    '<%= meta.path.assets.styles %>/less/*.less'
                ],
                tasks: ['concat:site_less','jekyll:build']
            }
        }
    });
    grunt.loadTasks("./tasks");
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concurrent');

    // Clean build : Builds the assets, and jekyll site.

    grunt.registerTask('default',[
        'concat:site_less',
        'less:site_less',
        'cssmin:site_css',
        'uglify:dev_js',
        'jekyll:build'
    ]);

    // Development build : Builds the assets & site, Runs the jekyll server, Watches for changes
    grunt.registerTask('dev', [
        'concat:site_less',
        'less:site_less',
        'cssmin:site_css',
        'uglify:dev_js',
        'concurrent:watch'
    ]);

    // Production build : Builds the assets & site
    grunt.registerTask('prod', [
        'concat:site_less',
        'less:site_less',
        'cssmin:site_css',
        'uglify:prod_js',
        'jekyll:build'
    ]);

};