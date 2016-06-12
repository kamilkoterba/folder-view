define('scripts/filesList', ['backbone', 'scripts/filesModel'],
  function (Backbone, FilesModel) {
    'use strict';

    return Backbone.Collection.extend({
      model: FilesModel,

      marked: function () {
        return this.where({
          marked: true,
        });
      },
    });

  }
);
