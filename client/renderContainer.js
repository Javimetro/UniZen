import * as diaryService from './diaryService.js';
import { drawChart } from './tipComponent.js';


//creates cards for displaying the data from user's old
const createDiaryCards = async function(parentId) { // parentId as parametrer, so function can be reused
  try {
    const token = localStorage.getItem('token');
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const user_id = JSON.parse(jsonPayload).user_id;

    const diaryData = await diaryService.getEntryById(user_id);
    console.log('render')

    const section = document.createElement('section');
    section.classList.add('card-area', 'card-container');

    diaryData.forEach((entry, index) => {
      const card = document.createElement('div');
      card.classList.add('card');

      const diaryContainer = document.createElement('div');
      diaryContainer.classList.add('card-diary');
      const title = document.createElement('h4');
      const date = new Date(entry.entry_date);
      title.textContent = date.toISOString().split('T')[0]; // This will give only the date part
      const entryText = document.createElement('p');
      entryText.textContent = `Mood: ${entry.text}`;
      const energy_level = document.createElement('p');
      energy_level.textContent = `Energy level: ${entry.energy_level}`;
      const sleep = document.createElement('p');
      sleep.textContent = `Sleep hours: ${entry.sleep_hours}`;

      diaryContainer.appendChild(title);
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
  form.classList.add('stacked-form');

  // Create form fields

  var entryDate = document.createElement('input');
  entryDate.setAttribute('id', 'entryDate');
  entryDate.setAttribute('type', 'date');
  entryDate.setAttribute('name', 'entry_date');
  entryDate.required = true;

  var entryText = document.createElement('textarea');
  entryText.setAttribute('id', 'entryText');
  entryText.setAttribute('name', 'text');
  entryText.setAttribute('placeholder', 'How do you feel today?');
  entryText.required = true;

  var energy_level = document.createElement('input');
  energy_level.setAttribute('id', 'energy_level');
  energy_level.setAttribute('type', 'range');
  energy_level.setAttribute('name', 'energy_level');
  energy_level.setAttribute('placeholder', 'Energy level from 1 to 10');
  energy_level.setAttribute('min', '1');
  energy_level.setAttribute('max', '10');
  energy_level.setAttribute('value', '5');
  energy_level.required = true;

  var energyLevelLabel = document.createElement('label');
  energyLevelLabel.setAttribute('for', 'energy_level');
  energyLevelLabel.textContent = 'Energy level from 1 to 10:';

  var energyLevelValue = document.createElement('span');
  energyLevelValue.setAttribute('id', 'energy_level_value');
  energyLevelValue.textContent = energy_level.value;

  energy_level.addEventListener('input', function() {
    energyLevelValue.textContent = this.value;
  });

  var sleepHours = document.createElement('select');
  sleepHours.setAttribute('id', 'sleep_hours');
  sleepHours.setAttribute('name', 'sleep_hours');

  // Create options for each hour
  for (var i = 0; i <= 24; i++) {
    var option = document.createElement('option');
    option.setAttribute('value', i);
    option.textContent = i;
    sleepHours.appendChild(option);
  }

  var sleepHoursLabel = document.createElement('label');
  sleepHoursLabel.setAttribute('for', 'sleep_hours');
  sleepHoursLabel.textContent = 'Sleep hours (0-24):';

  // Add form fields to form
  form.appendChild(entryDate);
  form.appendChild(entryText);
  form.appendChild(energyLevelLabel);
  form.appendChild(energyLevelValue);
  form.appendChild(energy_level);
  form.appendChild(sleepHoursLabel);
  form.appendChild(sleepHours);

  // Add a submit button to the form
  var submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'submit');
  submitButton.textContent = 'Submit';
  submitButton.setAttribute('id','submitFormButton')
  form.appendChild(submitButton);

  // Add an event listener to the form
  form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from being submitted in the traditional way
    form.style.display = 'none'; // Clear the content div
    // Gather the data from the form fields

    var h2 = document.querySelector('h2');
    h2.textContent = 'Regarding to your last entry:';

    var entryData = {
      entry_date: entryDate.value,
      text: entryText.value,
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

    // Calls getTip function to get a tip right after entry is posted
    try {

      var tip = await diaryService.getTip();
      console.log('Received tip:', tip);

      var tipDiv = document.createElement('div');
      tipDiv.setAttribute('class', 'tip-box');

      var sentimentGauge = document.createElement('div');
      sentimentGauge.id = 'gauge_div';
      tipDiv.appendChild(sentimentGauge);


      // Create a new element to display the tip

      var tipElement = document.createElement('p');
      tipElement.setAttribute('id','tipText')
      tipElement.textContent =  tip.content;


      tipDiv.appendChild(tipElement);

      // Append the tip element to the content div
      contentDiv.appendChild(tipDiv);
      drawChart(tip.category);
    } catch (error) {
      console.error('Failed to fetch tip:', error);
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
  contentDiv.innerHTML = '';

  subFunction(); // Call the passed function
}



export { createDiaryCards, createEntryForm, renderFunction }
