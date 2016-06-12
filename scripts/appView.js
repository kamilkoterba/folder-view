define('scripts/appView',
  ['jquery', 'underscore', 'backbone', 'scripts/fileView', 'scripts/markAllView'],
  function ($, _, Backbone, FileView, MarkAllView) {
    'use strict';

    return Backbone.View.extend({
      el: document.getElementById('folderView'),
      events: {
        'click #addFolder': 'addFolder',
        'click #delete': 'delete',
        'click #rename': 'rename',
      },
      markAllView: new MarkAllView(),

      initialize: function (filesList) {
        this.filesList = filesList;

        this.listenTo(this.filesList, 'add', this.addOne);
        this.listenTo(this.markAllView, 'markChange', this.markAll);
        this.listenTo(this.filesList, 'change', this.updateButtonsState);

        this.$el.prepend(this.markAllView.render().$el);

        this.setEditButtonsState(true);
      },

      addFolder: function () {
        var newFolder = this.filesList.add({
          name: 'New folder',
          url: '',
        });

        newFolder.rename();
      },

      addOne: function (file) {
        var fileView = new FileView({
          model: file,
        });

        this.$('#fileList').append(fileView.render().el);
      },

      delete: function () {
        if (confirm('Are you sure?')) {
          _.invoke(this.filesList.marked(), 'destroy');
        }
      },

      setEditButtonsState: function (disabled) {
        this.$('#rename').prop('disabled', disabled);
        this.$('#delete').prop('disabled', disabled);
      },

      updateButtonsState: function () {
        var shouldEnable = _.any(this.filesList.models, function (item) {
          return item.attributes.marked;
        });

        if (shouldEnable) {
          this.setEditButtonsState(false);
        } else {
          this.setEditButtonsState(true);
        }

      },

      markAll: function (markedAll) {
        if (markedAll) {
          _.invoke(this.filesList.models, 'mark');
        } else {
          _.invoke(this.filesList.models, 'unmark');
        }
      },

      rename: function () {
        _.invoke(this.filesList.marked(), 'rename');

        return false;
      },
    });

  }
);
