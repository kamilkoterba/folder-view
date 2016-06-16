'use strict';
define('scripts/tests/fileViewTest',
  ['sinon', 'jquery', 'backbone', 'scripts/fileView', 'scripts/filesModel'],
  function (sinon, $, Backbone, FileView, FilesModel) {

    var run = function () {
      var url = 'https://unsplash.it/900/700?image=15';
      var name = 'Example Image 2.png';
      QUnit.module(
        'FileView Tests',
        {
          beforeEach: function () {
            var file = new FilesModel({
              name: name,
              url: url,
              saved: true,
            });
            this.fileView = new FileView({
              model: file,
            });

            this.fileView.render();
          },
        },

        function () {

          test('Test for existance of markup items', function () {
            var $filename = this.fileView.$('.filename');
            var $itemCheck = this.fileView.$('.item-check');

            equal($filename.attr('href'), url, 'Filename link should have provided url as href attribute.');
            equal($filename.html(), name, 'Filename link should have filename as text.');
            equal(this.fileView.$('.rename-box__filename').val(), name, 'Filename rename input should have filename as value.');
            equal(this.fileView.$('.cancel').length, 1, 'Cancel button should exist.');
            equal(this.fileView.$('.save').length, 1, 'Save button should exist.');
            equal($itemCheck.length, 1, 'Item check checkbox should exits.');

            notOk($itemCheck.prop('checked'), 'Initially checkbox should be unchecked.');
            notOk(this.fileView.model.attributes.marked, 'Initially marked field in model should be empty.');

            notOk(this.fileView.$el.hasClass('renaming'), 'Filename link should have provided url as href attribute.');
          });

          test('Marked field in model should reflect checkbox checked status', function () {
            this.fileView.$('.item-check').click();
            ok(this.fileView.model.attributes.marked, 'Marked field should be set to true.');
          });

          test('Top View element should have "renaming" class after triggering rename', function () {
            this.fileView.model.trigger('rename');
            ok(this.fileView.$el.hasClass('renaming'), 'Filename link should have provided url as href attribute.');
          });

          test('URL should update in markup on model change', function () {
            var newUrl = 'http://newUrl';

            this.fileView.model.attributes.url = newUrl;
            this.fileView.model.trigger('change');
            equal(this.fileView.$('.filename').attr('href'), newUrl);
          });

          test('Should remove "renaming" class on cancel', function () {
            this.fileView.$el.addClass('renaming');
            this.fileView.$('.cancel').click();
            notOk(this.fileView.$el.hasClass('renaming'));
          });

          test('Test save', function () {
            var newFilename = 'new file name';

            this.fileView.$el.addClass('renaming');
            this.fileView.$('.rename-box__filename').val(newFilename);

            this.fileView.$('.save').click();

            equal(this.fileView.$('.filename').html(), newFilename, 'Link text should contain new file name.');
            equal(this.fileView.model.attributes.name, newFilename, 'Model should be updated with new name.');
            notOk(this.fileView.$el.hasClass('renaming'), '"Renaming" class should be removed.');
          });

        }
      );
    };

    return {
      run: run,
    };

  }
);
