requirejs.config({
  paths: {
    jquery: '../vendor/scripts/jquery/jquery',
    underscore: '../vendor/scripts/underscore/underscore',
    backbone: '../vendor/scripts/backbone/backbone',
    localstorage: '../vendor/scripts/backbone.localStorage/backbone.localStorage',
    marked: '../vendor/scripts/marked/marked',
    hljs: '../vendor/scripts/highlightjs/highlight'
  }
});

require(['backbone', 'scripts/routers/app.router.js'], function (Backbone, AppRouter) {
  new AppRouter;

  Backbone.history.start();
});