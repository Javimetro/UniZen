document.addEventListener('DOMContentLoaded', (event) => {
  const token = localStorage.getItem('token');

  if (!token) {
      console.error('No token found');
  } else {
      fetchUserData(token);
  }
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
      const properties = ['birthdate', 'email', 'family_name', 'given_name', 'gender', 'height', 'weight', 'hr_max', 'hr_rest'];
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
      })

      // Append table to userDataDiv
      userDataDiv.appendChild(table);
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  Swal.fire({
      icon: 'success',
      title: 'Logged out successfully',
      showConfirmButton: false,
      timer: 1500
  }).then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      window.location.href = 'index.html';
  });
});
