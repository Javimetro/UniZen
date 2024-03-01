import { getDiaryEntries } from '../services/diaryService.js';

async function createDiaryCards(parentId) { // parentId as parametrer, so function can be reused
  try {
    const diaryData = await getDiaryEntries();

    const section = document.createElement('section');
    section.classList.add('card-area');

    diaryData.forEach((entry, index) => {
      const card = document.createElement('div');
      card.classList.add('card');

      const diaryContainer = document.createElement('div');
      diaryContainer.classList.add('card-diary');
      const title = document.createElement('h4');
      title.textContent = `Diary card ${index + 1}`;
      const description = document.createElement('p');
      description.textContent = entry.notes;
      const mood = document.createElement('p');
      mood.textContent = `Mood: ${entry.mood}`;
      const weight = document.createElement('p');
      weight.textContent = `Weight: ${entry.weight}`;
      const sleep = document.createElement('p');
      sleep.textContent = `Sleep hours: ${entry.sleep_hours}`;

      diaryContainer.appendChild(title);
      diaryContainer.appendChild(description);
      diaryContainer.appendChild(mood);
      diaryContainer.appendChild(weight);
      diaryContainer.appendChild(sleep);

      card.appendChild(diaryContainer);

      section.appendChild(card);
    });

    const parent = document.getElementById(parentId);
    const h3Element = document.createElement('h3');
    parent.appendChild(h3Element);
    parent.insertBefore(section, h3Element.nextSibling);

  } catch (error) {
    console.error('Error creating diary cards with fetch:', error);
  }
}

export { createDiaryCards }
