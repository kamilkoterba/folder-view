define('scripts/fileView', ['jquery', 'underscore', 'backbone'],
  function ($, _, Backbone) {
    'use strict';

    return Backbone.View.extend({
      events: {
        'click .cancel': 'cancel',
        'click .save': 'save',
        'click .file-view__item-check': 'markToggle',
      },
      tagName: 'li',
      className: 'file-view',
      template: _.template(
        $('#fileTemplate').html()
      ),

      initialize: function () {
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'rename', this.rename);
        this.listenTo(this.model, 'change', this.render);
      },

      cancel: function () {
        this.$el.removeClass('renaming');
        this.$('.file-view__rename-box-filename').val(this.model.get('name'));
        if (!this.model.get('saved')) {
          this.model.destroy();
        }
      },

      markToggle: function () {
        this.model.set('marked', !this.model.get('marked'));
      },

      rename: function () {
        this.$el.addClass('renaming');
        this.$('.file-view__rename-box').focus();
        this.$('.file-view__rename-box-filename').attr('value', this.model.get('name'));
      },

      render: function () {
        var templateData = this.model.toJSON();

        templateData.checked = templateData.marked ? 'checked="checked"' : '';
        templateData.target = templateData.url.indexOf('http') >= 0 ? 'target="_blank""' : '';
        this.$el.html(this.template(templateData));
        return this;
      },

      save: function () {
        this.$el.removeClass('renaming');
        this.model.set('name', this.$('.file-view__rename-box-filename').val());
        this.model.set('saved', true);
        this.render();
      },
    });

  }
);
