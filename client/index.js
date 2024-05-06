document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('login-form').addEventListener('submit', function(event) {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      fetch('/api/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Login failed');
          }
          return response.json();
      })
      .then(data => {
          localStorage.setItem('token', data.token);
          Swal.fire({
              icon: 'success',
              title: 'Logged in successfully',
              showConfirmButton: false,
              timer: 1500
          }).then(() => {
              window.location.href = 'diary.html';
          });
      })
      .catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Incorrect username or password.',
        });
    });
  });
});
