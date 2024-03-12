import * as diaryService from '../services/diaryService.js';

//creates cards for displaying the data from user's old
const createDiaryCards = async function(parentId) { // parentId as parametrer, so function can be reused
  try {
    const diaryData = await diaryService.getEntries();

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

  var contentDiv = document.getElementById(parentId);
  contentDiv.innerHTML = ''; // Clear the content div
  var h2 = document.createElement('h2');
  h2.textContent = 'New Entry';
  var form = document.createElement('form');

  // Create form fields

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
  form.appendChild(entryDate);
  form.appendChild(mood);
  form.appendChild(weight);
  form.appendChild(sleepHours);
  form.appendChild(notes);

  // Add a submit button to the form
  var submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'submit');
  submitButton.textContent = 'Submit';
  form.appendChild(submitButton);

  // Add an event listener to the form
  form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from being submitted in the traditional way

    // Gather the data from the form fields
    var entryData = {
      entry_date: entryDate.value,
      mood: mood.value,
      weight: Number(weight.value),
      sleep_hours: Number(sleepHours.value),
      notes: notes.value
    };

    // Call the postEntry function to send the data to the server
    try {
      var newEntry = await diaryService.postEntry(entryData);
      console.log('New entry created:', newEntry);
    } catch (error) {
      console.error('Failed to create new entry:', error);
    }
  });

  // Add form to content div
  contentDiv.appendChild(h2);
  contentDiv.appendChild(form);

  const parent = document.getElementById(parentId);
  const h3Element = document.createElement('h3');
  const section = document.createElement('section'); // Define section
  parent.appendChild(h3Element);
  parent.insertBefore(section, h3Element.nextSibling);
}

//cleans the div and add new data
const renderFunction = function(subFunction) {
  var contentDiv = document.getElementById('content');
  contentDiv.innerHTML = ''; // Clear the content div
  subFunction(); // Call the passed function
}

export { createDiaryCards, createEntryForm, renderFunction }
