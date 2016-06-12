define('scripts/filesModel', ['backbone'], function (Backbone) {
  'use strict';

  return Backbone.Model.extend({
    rename: function () {
      this.trigger('rename', this, this.collection);
    },
  });
});
