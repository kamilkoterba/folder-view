(function () {
  'use strict';

  var FilesList = Backbone.Collection.extend({
    marked: function () {
      return this.where({
        marked: true,
      });
    },
  });

  var filesList = new FilesList();

  var FileView = Backbone.View.extend({
    events: {
      'click .item-check': 'markToggle',
    },
    tagName: 'li',
    template: _.template(
      $('#fileTemplate').html()
    ),
    initialize: function () {
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function () {
      this.$el.html(
        this.template(this.model.toJSON())
      );
      return this;
    },

    markToggle: function () {
      this.model.set('marked', !this.model.get('marked'));
    },
  });

  var AppView = Backbone.View.extend({
    el: document.getElementById('folderView'),
    events: {
      'click #delete': 'delete',
    },

    initialize: function () {
      filesList;
      this.listenTo(filesList, 'add', this.addOne);
    },

    delete: function () {
      if (confirm('Are you sure?')) {
        _.invoke(filesList.marked(), 'destroy');
      }

      return false;
    },

    addOne: function (file) {
      var data = file.toJSON();
      var fileView = new FileView({
        model: file,
      });
      this.$('#fileList').append(fileView.render().el);
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
