// menu.js
import { createDiaryCards } from '../utils/renderContainer.js';

window.onload = function() {
  var contentDiv = document.createElement('div');
  contentDiv.id = 'content';
  document.body.appendChild(contentDiv);
};


// this function should be move to other file and import it from there to here
document.getElementById('newEntry').addEventListener('click', function() {
  var contentDiv = document.getElementById('content');
  contentDiv.innerHTML = ''; // Clear the content div
  var h2 = document.createElement('h2');
  h2.textContent = 'New Entry';
  var form = document.createElement('form');

  // Create form fields
  var userId = document.createElement('input');
  userId.setAttribute('type', 'text');
  userId.setAttribute('name', 'user_id');
  userId.setAttribute('placeholder', 'User ID');

  var entryDate = document.createElement('input');
  entryDate.setAttribute('type', 'date');
  entryDate.setAttribute('name', 'entry_date');

  var mood = document.createElement('input');
  mood.setAttribute('type', 'text');
  mood.setAttribute('name', 'mood');
  mood.setAttribute('placeholder', 'Mood');

  var weight = document.createElement('input');
  weight.setAttribute('type', 'number');
  weight.setAttribute('name', 'weight');
  weight.setAttribute('placeholder', 'Weight');

  var sleepHours = document.createElement('input');
  sleepHours.setAttribute('type', 'number');
  sleepHours.setAttribute('name', 'sleep_hours');
  sleepHours.setAttribute('placeholder', 'Sleep Hours');

  var notes = document.createElement('textarea');
  notes.setAttribute('name', 'notes');

  // Add form fields to form
  form.appendChild(userId);
  form.appendChild(entryDate);
  form.appendChild(mood);
  form.appendChild(weight);
  form.appendChild(sleepHours);
  form.appendChild(notes);

  // Add form to content div
  contentDiv.appendChild(h2);
  contentDiv.appendChild(form);
});


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
