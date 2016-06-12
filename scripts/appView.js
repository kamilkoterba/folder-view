define('scripts/appView', ['jquery', 'underscore', 'backbone', 'scripts/fileView'],
  function ($, _, Backbone, FileView) {
    'use strict';

    return Backbone.View.extend({
      el: document.getElementById('folderView'),
      events: {
        'click #addFolder': 'addFolder',
        'click #delete': 'delete',
        'click #rename': 'rename',
      },

      initialize: function (filesList) {
        this.filesList = filesList;
        this.listenTo(this.filesList, 'add', this.addOne);
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

        return false;
      },

      rename: function () {
        _.invoke(this.filesList.marked(), 'rename');

        return false;
      },
    });

  }
);
