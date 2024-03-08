// menu.js
import { createDiaryCards, createEntryForm, renderFunction } from '/src/utils/renderContainer.js';

//when the page is loaded, it creates a div element. forms and diaryCards will be display on this element.
window.onload = function() {
  var contentDiv = document.createElement('div');
  contentDiv.id = 'content';
  document.body.appendChild(contentDiv);
};


//cleans the div and actualice it with the entryform
document.getElementById('newEntry').addEventListener('click', function() {
  renderFunction(function() {
    createEntryForm('content');
  });
});

//cleans the div and actualice it with the diary cards
document.getElementById('oldEntries').addEventListener('click', function() {
  renderFunction(function() {
    createDiaryCards('content');
  });
});
