// menu.js
import { createDiaryCards, createEntryForm } from '../utils/renderContainer.js';

window.onload = function() {
  var contentDiv = document.createElement('div');
  contentDiv.id = 'content';
  document.body.appendChild(contentDiv);
};


// this function should be move to other file and import it from there to here
document.getElementById('newEntry').addEventListener('click', createEntryForm('content'));


document.getElementById('oldEntries').addEventListener('click', function() {
  var contentDiv = document.getElementById('content');
  contentDiv.innerHTML = ''; // Clear the content div
  var h2 = document.createElement('h2');
  h2.textContent = 'Old diary entries';
  var div = document.createElement('div');
  createDiaryCards('content'); //imported from other file. same should be done with form above
  contentDiv.appendChild(h2);
  contentDiv.appendChild(div);
});
