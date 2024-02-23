import '/styles/style.css';

// for adding the token to the storage of the browser: open devtools, console and add: localStorage.setItem('token', 'yourToken');  now browser nows the token and front end can get it from there. This is temporal. I should implement post form from frontend to back like: user.. password..
//////////////////////////////////

async function createDiaryCardsWithFetch() {
  try {
    const token = localStorage.getItem('token');
    console.log(token);
    const response = await fetch('http://localhost:3000/api/entries', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    if (!response.ok) {
      throw new Error('Failed to fetch diary entries');
    }
    const diaryData = await response.json();
    const diaryNotes = diaryData.diaryNotes;

    const section = document.createElement('section');
    section.classList.add('card-area');

    diaryNotes.forEach((entry, index) => {
      const card = document.createElement('div');
      card.classList.add('card');

      const imgContainer = document.createElement('div');
      imgContainer.classList.add('card-img');
      const img = document.createElement('img');
      img.src = 'images/strong.png';
      img.width = 136;
      img.alt = 'HippoGym';
      imgContainer.appendChild(img);

      const diaryContainer = document.createElement('div');
      diaryContainer.classList.add('card-diary');
      const title = document.createElement('h4');
      title.textContent = `Diary card ${index + 1}`;
      const description = document.createElement('p');
      description.textContent = entry.description;

      diaryContainer.appendChild(title);
      diaryContainer.appendChild(description);

      card.appendChild(imgContainer);
      card.appendChild(diaryContainer);

      section.appendChild(card);
    });

    const h3Element = document.querySelector('h3:nth-of-type(4)');
    h3Element.parentNode.insertBefore(section, h3Element.nextSibling);
  } catch (error) {
    console.error('Error creating diary cards with fetch:', error);
  }
}

document.getElementById('fetch-diary').addEventListener('click', createDiaryCardsWithFetch);

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded');
});
