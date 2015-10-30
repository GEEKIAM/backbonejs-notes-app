module.exports = function (grunt) {
  grunt.initConfig({
    requirejs: {
      compile: {
        options: {
          appDir: './src',
          baseUrl: 'scripts',
          dir: './build',
          mainConfigFile: './src/scripts/main.js',
          modules: [
            {
              name: 'main'
            }
          ],

          uglify: true,
          optimizeCss: 'standard',
          preserveLicenseComments: false,
          findNestedDependencies: true,
          removeCombined: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['requirejs']);
};