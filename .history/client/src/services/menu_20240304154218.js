// menu.js
import { createDiaryCards, createEntryForm, renderFunction } from '../utils/renderContainer.js';

window.onload = function() {
  var contentDiv = document.createElement('div');
  contentDiv.id = 'content';
  document.body.appendChild(contentDiv);
};


//creates new div with entryform inside it
document.getElementById('newEntry').addEventListener('click', function() {
  renderFunction(function() {
    createEntryForm('content');
  });
});

//creates new div with old entry cards inside it
document.getElementById('oldEntries').addEventListener('click', function() {
  renderFunction('Old diary entries', function() {
    createDiaryCards('content');
  });
});
