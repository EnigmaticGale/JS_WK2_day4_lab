const Mountains = require('./models/mountains.js')
const MountainsView = require('./views/mountains_view.js')

document.addEventListener('DOMContentLoaded', () => {
  const mountains = new Mountains()
  mountains.getData();
  mountains.bindEvents();

  const mountainSection = document.querySelector('#mountains')
  const mountainsView = new MountainsView(mountainSection)
  mountainsView.bindEvents();

});
