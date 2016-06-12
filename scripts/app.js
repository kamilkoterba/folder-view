require(['scripts/filesList', 'scripts/appView'],
  function (FilesList, AppView) {
    'use strict';

    var filesList = new FilesList();
    new AppView(filesList);

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

  }
);
