// menu.js
import { createDiaryCards, createEntryForm, createNewDiv } from '../utils/renderContainer.js';

window.onload = function() {
  var contentDiv = document.createElement('div');
  contentDiv.id = 'content';
  document.body.appendChild(contentDiv);
};


//
document.getElementById('newEntry').addEventListener('click', function() {
  createNewDiv(function() {
    createEntryForm('content');
  });
});

document.getElementById('oldEntries').addEventListener('click', function() {
  createNewDiv('Old diary entries', function() {
    createDiaryCards('content');
  });
});
