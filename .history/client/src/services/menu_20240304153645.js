// menu.js
import { createDiaryCards, createEntryForm, createNewDiv } from '../utils/renderContainer.js';

//creates new div with entryform inside it
document.getElementById('newEntry').addEventListener('click', function() {
  createNewDiv(function() {
    createEntryForm('content');
  });
});

//creates new div with old entry cards inside it
document.getElementById('oldEntries').addEventListener('click', function() {
  createNewDiv('Old diary entries', function() {
    createDiaryCards('content');
  });
});
