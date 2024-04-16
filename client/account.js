// account.js
document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
      })
      .then(response => response.json())
      .then(data => {
          localStorage.setItem('token', data.token);
          // Now you can use this token for subsequent requests
          fetchUserData(data.token);
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  });

  document.getElementById('fetchUserDataBtn').addEventListener('click', function() {
      const token = localStorage.getItem('token');

      if (!token) {
          console.error('No token found');
      } else {
          fetchUserData(token);
      }
  });
});

function fetchUserData(token) {
  fetch('http://localhost:3000/api/measurements/user-info', {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
      if (!data.user) {
          console.error('User data not found');
          return;
      }

      const user = data.user;
      const userDataDiv = document.getElementById('userData');

      // Create table
      const table = document.createElement('table');
      table.className = 'user-data-table';

      // Create rows for each user property
      const properties = ['birthdate', 'email', 'family_name', 'gender', 'given_name', 'height', 'hr_max', 'hr_rest', 'weight'];
      properties.forEach((property, index) => {
          const row = document.createElement('tr');

          // Add class for alternating row colors
          if (index % 2 === 0) {
              row.className = 'even-row';
          } else {
              row.className = 'odd-row';
          }

          const th = document.createElement('th');
          th.textContent = property.charAt(0).toUpperCase() + property.slice(1);
          row.appendChild(th);

          const td = document.createElement('td');
          td.textContent = user[property];
          row.appendChild(td);

          table.appendChild(row);
      });

      // Append table to userDataDiv
      userDataDiv.appendChild(table);
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}
