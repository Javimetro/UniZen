// menu.js
import { createDiaryCards, createEntryForm, createNewDiv } from '../utils/renderContainer.js';

window.onload = function() {
  var contentDiv = document.createElement('div');
  contentDiv.id = 'content';
  document.body.appendChild(contentDiv);
};


// this function should be move to other file and import it from there to here
document.getElementById('newEntry').addEventListener('click', createNewDiv('New Entry', createEntryForm('content')));


document.getElementById('oldEntries').addEventListener('click', createNewDiv('Old diary entries', createDiaryCards('content')));
