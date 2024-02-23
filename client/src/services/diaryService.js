const getDiaryEntries = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/entries', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch diary entries');
    }
  
    return response.json();
  };
  
  export { getDiaryEntries };
  