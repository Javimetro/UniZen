// Fetch all entries
const getEntries = async function() {
  const token = localStorage.getItem('token');
  const response = await fetch('https://lepo.northeurope.cloudapp.azure.com/api/entries', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  if (!response.ok) {
    throw new Error('Failed to fetch entries');
  }
  return response.json();
};

// Fetch a single entry by id
const getEntryById = async function(user_id) {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://lepo.northeurope.cloudapp.azure.com/api/entries/${user_id}`, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  if (!response.ok) {
    throw new Error('Failed to fetch entry');
  }
  return response.json();
};

// Fetch average hours slept by user id
const getAvgHoursSleptByUserId = async function(user_id) {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://lepo.northeurope.cloudapp.azure.com/api/entries/stats/${user_id}`, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  if (!response.ok) {
    throw new Error('Failed to fetch average hours slept');
  }
  return response.json();
};

// Create a new entry
const postEntry = async function(entryData) {
  const token = localStorage.getItem('token');
  const response = await fetch('https://lepo.northeurope.cloudapp.azure.com/api/entries', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(entryData),
    credentials: 'include' // include credentials
  })
  if (!response.ok) {
    console.error('Response status:', response.status);
    console.error('Response text:', await response.text());
    throw new Error('Failed to post entry');
  }
  return response.json();
};

const getTip = async function() {
  const token = localStorage.getItem('token');
  const response = await fetch('https://lepo.northeurope.cloudapp.azure.com/api/tips', {
    headers: {
      'Authorization': 'Bearer ' + token
    },
    credentials: 'include' // include credentials
  });
  if (!response.ok) {
    console.error('Response status:', response.status);
    console.error('Response text:', await response.text());
    throw new Error('Failed to fetch tip');
  }
  return response.json();
};

// Delete an entry
const deleteEntry = async function(user_id) {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://lepo.northeurope.cloudapp.azure.com/api/entries/${user_id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  if (!response.ok) {
    throw new Error('Failed to delete entry');
  }
  return response.json();
};

// Update an entry
const putEntry = async function(user_id, entryData) {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://lepo.northeurope.cloudapp.azure.com/api/entries/${user_id}`, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(entryData)
  })
  if (!response.ok) {
    throw new Error('Failed to update entry');
  }
  return response.json();
};

function validateSessionAndNavigate() {
  if (window.location.href.includes('menu.html')) {
    window.onunload = function() {};
  }

  if (!localStorage.getItem('token')) {
    window.location.href = "login.html";
  }
}


export { getEntries, getEntryById, getTip, getAvgHoursSleptByUserId, postEntry, deleteEntry, putEntry, validateSessionAndNavigate };
