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
      const entryText = document.createElement('p');
      entryText.textContent = `Mood: ${entry.entryText}`;
      const energy_level = document.createElement('p');
      energy_level.textContent = `Energy level: ${entry.energy_level}`;
      const sleep = document.createElement('p');
      sleep.textContent = `Sleep hours: ${entry.sleep_hours}`;

      diaryContainer.appendChild(title);
      diaryContainer.appendChild(description);
      diaryContainer.appendChild(entryText);
      diaryContainer.appendChild(energy_level);
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
// it uses "parentId" as parametrer so it can be reused inside any element.
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

  var entryText = document.createElement('input');
  entryText.setAttribute('type', 'text');
  entryText.setAttribute('name', 'entryText');
  entryText.setAttribute('placeholder', 'Mood');

  var energy_level = document.createElement('input');
  energy_level.setAttribute('type', 'number');
  energy_level.setAttribute('name', 'energy_level');
  energy_level.setAttribute('placeholder', 'Energy level');

  var sleepHours = document.createElement('input');
  sleepHours.setAttribute('type', 'number');
  sleepHours.setAttribute('name', 'sleep_hours');
  sleepHours.setAttribute('placeholder', 'Sleep Hours');

  // Add form fields to form
  form.appendChild(entryDate);
  form.appendChild(entryText);
  form.appendChild(energy_level);
  form.appendChild(sleepHours);

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
      entryText: entryText.value,
      energy_level: Number(energy_level.value),
      sleep_hours: Number(sleepHours.value),
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
