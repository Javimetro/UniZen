// Fetch all entries
const getEntries = async function() {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/api/entries', {
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
const getEntryById = async function(id) {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:3000/api/entries/${id}`, {
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
const getAvgHoursSleptByUserId = async function(id) {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:3000/api/entries/stats/${id}`, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  if (!response.ok) {
    throw new Error('Failed to fetch average hours slept');
  }
  return response.json();
};

export { getEntries, getEntryById, getAvgHoursSleptByUserId };



export { getDiaryEntries };

//todo: const postNewEntry = async function() {....}
