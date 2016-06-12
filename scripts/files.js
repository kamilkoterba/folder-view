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

  var filesList = new FilesList();

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
    },

    markToggle: function () {
      this.model.set('marked', !this.model.get('marked'));
    },

    rename: function () {
      if (this.model.attributes.marked) {
        this.$el.addClass('renaming');
        this.$('.rename-box').focus();
        this.$('.rename-filename').attr('value', this.model.attributes.name);
      }
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

    initialize: function () {
      this.listenTo(filesList, 'add', this.addOne);
    },

    addFolder: function () {
      filesList.add({
          name: 'New folder',
          url: '',
        });
    },

    addOne: function (file) {
      var fileView = new FileView({
        model: file,
      });

      this.$('#fileList').append(fileView.render().el);
    },

    delete: function () {
      if (confirm('Are you sure?')) {
        _.invoke(filesList.marked(), 'destroy');
      }

      return false;
    },

    rename: function () {
      _.invoke(filesList.marked(), 'rename');

      return false;
    },
  });

  var App = new AppView;

  filesList.add([
    {
      name: 'Example Image 1.png',
      url: 'https://unsplash.it/900/700?image=100',
    },
    {
      name: 'Example Image 2.png',
      url: 'https://unsplash.it/900/700?image=15',
    },
  ]);

})();
