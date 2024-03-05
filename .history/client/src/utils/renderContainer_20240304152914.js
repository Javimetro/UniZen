import { getDiaryEntries } from '../services/diaryService.js';

const createDiaryCards = async function(parentId) { // parentId as parametrer, so function can be reused
  try {
    const diaryData = await getDiaryEntries();

    const section = document.createElement('section');
    section.classList.add('card-area');

    diaryData.forEach((entry, index) => {
      const card = document.createElement('div');
      card.classList.add('card');

      const diaryContainer = document.createElement('div');
      diaryContainer.classList.add('card-diary');
      const title = document.createElement('h4');
      title.textContent = `Diary card ${index + 1}`;
      const description = document.createElement('p');
      description.textContent = entry.notes;
      const mood = document.createElement('p');
      mood.textContent = `Mood: ${entry.mood}`;
      const weight = document.createElement('p');
      weight.textContent = `Weight: ${entry.weight}`;
      const sleep = document.createElement('p');
      sleep.textContent = `Sleep hours: ${entry.sleep_hours}`;

      diaryContainer.appendChild(title);
      diaryContainer.appendChild(description);
      diaryContainer.appendChild(mood);
      diaryContainer.appendChild(weight);
      diaryContainer.appendChild(sleep);

      card.appendChild(diaryContainer);

      section.appendChild(card);
    });

    const parent = document.getElementById(parentId);
    const h3Element = document.createElement('h3');
    parent.appendChild(h3Element);
    parent.insertBefore(section, h3Element.nextSibling);

  } catch (error) {
    console.error('Error creating diary cards with fetch:', error);
  }
}

//function to create the form for input data to "new entry". Is used when user clicks "add a new diary entry"

const createEntryForm = function(parentId) {

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

  const parent = document.getElementById(parentId);
  const h3Element = document.createElement('h3');
  const section = document.createElement('section'); // Define section
  parent.appendChild(h3Element);
  parent.insertBefore(section, h3Element.nextSibling);
}

const createNewDiv = function(subFunction) {
  var contentDiv = document.getElementById('content');
  contentDiv.innerHTML = ''; // Clear the content div
  var div = document.createElement('div');
  subFunction(); // Call the passed function
  contentDiv.appendChild(h2);
  contentDiv.appendChild(div);
}

export { createDiaryCards, createEntryForm, createNewDiv }
