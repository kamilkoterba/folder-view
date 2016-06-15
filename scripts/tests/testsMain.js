'use strict';
require.config({
  baseUrl: './../../',
  paths: {
    qUnit: 'bower_components/qunit/qunit/qunit',
    underscore: 'bower_components/underscore/underscore-min',
    backbone: 'bower_components/backbone/backbone-min',
    sinon: 'bower_components/sinon/lib/sinon',
  },
  shim: {
    qUnit: {
      exports: 'QUnit',
      init: function () {
        QUnit.config.autoload = false;
        QUnit.config.autostart = false;
      },
    },
    underscore: {
      exports: '_',
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone',
    },
    sinon: {
      exports: 'sinon',
    },
  },
});

// Require the unit tests.
require(
  ['qUnit', 'scripts/tests/fileViewTest'],
  function (q, fileViewTest) {

    // Run the tests.
    fileViewTest.run();

    // Start QUnit.
    q.load();
    q.start();
  }
);
