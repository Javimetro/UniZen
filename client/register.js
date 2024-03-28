import './style.css';

document.getElementById('register-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  const response = await fetch('https://lepo.northeurope.cloudapp.azure.com/api/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password, email })
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('token', data.token);
    alert(data.message);
    window.location.href = 'login.html';// Redirect to another page or update the UI

  } else {
    const errorData = await response.json();
    alert(errorData.message);
  }
});

window.onload = function() {
  var email = document.getElementById("email");
  var emailInfoBox = document.getElementById("emailInfoBox");
  var password = document.getElementById("password");
  var passwordInfoBox = document.getElementById("passwordInfoBox");

  email.addEventListener("focus", function() {
    emailInfoBox.style.display = "inline";
  });

  email.addEventListener("blur", function() {
    emailInfoBox.style.display = "none";
  });

  password.addEventListener("focus", function() {
    passwordInfoBox.style.display = "inline";
  });

  password.addEventListener("blur", function() {
    passwordInfoBox.style.display = "none";
  });
}
