document.getElementById('modify-credentials-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('http://localhost:3000/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') // Assuming the token is stored in local storage
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
