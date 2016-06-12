define('scripts/filesModel', ['backbone'], function (Backbone) {
  'use strict';

  return Backbone.Model.extend({
    rename: function () {
      this.trigger('rename', this, this.collection);
    },

    mark: function () {
      this.set('marked', true);
    },

    unmark: function () {
      this.set('marked', false);
    },
  });
});
