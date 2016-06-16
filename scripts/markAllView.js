define('scripts/markAllView', ['jquery', 'underscore', 'backbone'],
  function ($, _, Backbone) {
    'use strict';

    return Backbone.View.extend({
      className: 'mark-all',
      events: {
        'click #markAll': 'markAll',
      },
      markedAll: false,
      template: _.template($('#markAllTemplate').html()),

      markAll: function () {
        this.markedAll = this.$('#markAll').prop('checked');
        this.trigger('markChange', this.markedAll);
      },

      markToggle: function () {
        this.model.set('marked', !this.model.get('marked'));
      },

      render: function () {
        var templateData = {};

        templateData.checked = this.markedAll ? 'checked="checked"' : '';
        this.$el.html(this.template(templateData));
        return this;
      },
    });

  }
);
