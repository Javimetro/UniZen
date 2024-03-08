document.getElementById('login-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('token', data.token);
    alert(data.message);
    window.location.href = 'menu.html';// Redirect to another page (public folder goes by default, not need to specify)

  } else {
    const errorData = await response.json();
    alert(errorData.message);
  }
});
