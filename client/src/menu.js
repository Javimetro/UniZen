// menu.js
import { createDiaryCards, createEntryForm, renderFunction } from '/src/utils/renderContainer.js';
import { validateSessionAndNavigate } from './services/diaryService'

//check at the beginning to redirect the user to the login page if she is not logged in
validateSessionAndNavigate();
//when the page is loaded, it creates a div element. forms and diaryCards will be display on this element.
window.onload = function() {
  var contentDiv = document.createElement('div');
  contentDiv.id = 'content';
  document.body.appendChild(contentDiv);
};

google.charts.load('current', {'packages':['gauge']});

google.charts.setOnLoadCallback(function() {
//cleans the div and actualice it with the entryform
  document.getElementById('newEntry').addEventListener('click', function() {
    renderFunction(function() {
      createEntryForm('content');
    });
  });
});

//cleans the div and actualice it with the diary cards
document.getElementById('oldEntries').addEventListener('click', function() {
  renderFunction(function() {
    createDiaryCards('content');
  });
});

//brings user to modifyCredentials.html
document.getElementById('modifyCredentials').addEventListener('click', function() {
  window.location.href = 'modifyCredentials.html';
});

// logout that redirects to login and remove token so user can no go back without new login
document.getElementById("logout").addEventListener("click", function() {
  localStorage.removeItem('token'); // remove the token
  window.location.href = "login.html";
});

