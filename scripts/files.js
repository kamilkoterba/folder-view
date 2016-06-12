(function () {
  'use strict';

  var FilesModel = Backbone.Model.extend({
    rename: function () {
      this.trigger('rename', this, this.collection);
    },
  });

  var FilesList = Backbone.Collection.extend({
    model: FilesModel,

    marked: function () {
      return this.where({
        marked: true,
      });
    },
  });

  var FileView = Backbone.View.extend({
    events: {
      'click .cancel': 'cancel',
      'click .save': 'save',
      'click .item-check': 'markToggle',
    },
    tagName: 'li',
    template: _.template(
      $('#fileTemplate').html()
    ),

    initialize: function () {
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'rename', this.rename);
    },

    cancel: function () {
      this.$el.removeClass('renaming');
      this.$('.rename-filename').attr('value', '');
      if (!this.model.get('saved')) {
        this.model.destroy();
      }
    },

    markToggle: function () {
      this.model.set('marked', !this.model.get('marked'));
    },

    rename: function () {
      this.$el.addClass('renaming');
      this.$('.rename-box').focus();
      this.$('.rename-filename').attr('value', this.model.attributes.name);
    },

    render: function () {
      var templateData = this.model.toJSON();

      templateData.checked = templateData.marked ? 'checked="checked"' : '';
      this.$el.html(this.template(templateData));
      return this;
    },

    save: function () {
      this.$el.removeClass('renaming');
      this.model.set('name', this.$('.rename-filename').val());
      this.model.set('saved', true);
      this.render();
    },
  });

  var AppView = Backbone.View.extend({
    el: document.getElementById('folderView'),
    events: {
      'click #addFolder': 'addFolder',
      'click #delete': 'delete',
      'click #rename': 'rename',
    },

    initialize: function (filesList) {
      debugger;
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

  var filesList = new FilesList();
  var App = new AppView(filesList);

  filesList.add([
    {
      name: 'Example Image 1.png',
      url: 'https://unsplash.it/900/700?image=100',
      saved: true,
    },
    {
      name: 'Example Image 2.png',
      url: 'https://unsplash.it/900/700?image=15',
      saved: true,
    },
  ]);


})();
