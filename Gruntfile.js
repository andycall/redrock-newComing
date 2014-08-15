module.exports = function(grunt){
    "use strict";

    grunt.initConfig({
        imagemin :{
            dist : {
                options : {
                    optimizationLevel : 10
                },
                files : [{
                    expand : true,
                    cwd : 'img/',
                    src : ["**/*.{png,jpg,jpeg"],
                    dest: "img/"
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask('img', ['imagemin']);
};
