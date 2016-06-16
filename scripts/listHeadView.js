define('scripts/listHeadView', ['jquery', 'underscore', 'backbone'],
  function ($, _, Backbone) {
    'use strict';

    return Backbone.View.extend({
      className: 'list-head',
      events: {
        'click .list-head__mark-all': 'markAll',
      },
      markedAll: false,
      template: _.template($('#listHeadTemplate').html()),

      markAll: function () {
        this.markedAll = this.$('.list-head__mark-all').prop('checked');
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
