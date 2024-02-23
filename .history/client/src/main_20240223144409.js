import './styles/style.css';

async function fetchJoke() {
  const response = await fetch('https://api.chucknorris.io/jokes/random');
  if (!response.ok) {
    throw new Error('Failed to fetch joke');
  }
  return await response.json();
}

async function handleButtonClick() {
  try {
    const joke = await fetchJoke();
    document.querySelector('.showJoke').textContent = joke.value;
  } catch (error) {
    console.error('Error:', error);
  }
}

document.querySelector('.chuck').addEventListener('click', handleButtonClick);

////////////////////////

async function giveMeCats() {
  try {
    const response = await fetch('pics.json');
    if (!response.ok) {
      throw new Error('was not possible to fetch pics.json');
    }
    const kissaData = await response.json();
    ///const catImages = diaryData.catImages;
    const urlArray = kissaData.catImages.map(item => item.url);

    const imageContainer = document.querySelector('.showKissa');
    imageContainer.id = 'kissaContainer';
    imageContainer.innerHTML = '';

    urlArray.forEach(item => {
      const kissaImg = document.createElement('img');
      kissaImg.src = item;
      kissaImg.alt = 'kissa kuva';
      imageContainer.appendChild(kissaImg);
    });
  } catch (error) {
    console.error('Error fetching and displaying images:', error);
  }
}

const button = document.querySelector('.kissa');
button.addEventListener('click', giveMeCats);

//////////////////////////////////

async function createDiaryCardsWithFetch() {
  try {
    const token = localStorage.getItem('token');
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
