import './style.css';


//JavaScript file tor index.html

// for adding the token to the storage of the browser: open devtools, console and add: localStorage.setItem('token', 'yourToken');  now browser nows the token and front end can get it from there. This is temporal. I should implement post form from frontend to back like: user.. password..
//////////////////////////////////
console.log('vamos')
//login redirect
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('login-button').addEventListener('click', function() {

    window.location.href = '/login.html';
  });
//register redirect
  document.getElementById('register-button').addEventListener('click', function() {
    window.location.href = '/register.html';
  });
});


//document.getElementById('fetch-diary').addEventListener('click', createDiaryCards);

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded');
});
