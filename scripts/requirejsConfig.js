require.config({
  paths: {
    underscore: 'bower_components/underscore/underscore-min',
    backbone: 'bower_components/backbone/backbone-min',
  },
  shim: {
    underscore: {
      exports: '_',
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone',
    },
  },
});
