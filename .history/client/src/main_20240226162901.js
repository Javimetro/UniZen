import '/styles/style.css';
import '/src/utils/renderContainer.js'

// for adding the token to the storage of the browser: open devtools, console and add: localStorage.setItem('token', 'yourToken');  now browser nows the token and front end can get it from there. This is temporal. I should implement post form from frontend to back like: user.. password..
//////////////////////////////////


document.getElementById('fetch-diary').addEventListener('click', createDiaryCards);

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded');
});
