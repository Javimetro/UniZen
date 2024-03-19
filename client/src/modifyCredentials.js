import { validateSessionAndNavigate } from './services/diaryService';

//check at the beginning to redirect the user to the login page if she is not logged in
validateSessionAndNavigate();

const token = localStorage.getItem('token');

document.getElementById('modify-credentials-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('http://localhost:3000/api/users/:id', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ username, email, password })
});

if (response.ok) {
    const data = await response.json();
    alert(data.message);
    window.location.href = 'menu.html'; // Redirect to menu
} else {
    const errorData = await response.json();
    alert(errorData.message);
}
});


document.getElementById('back-to-menu').addEventListener('click', () => {
  window.location.href = 'menu.html'; // Redirect to menu
});
