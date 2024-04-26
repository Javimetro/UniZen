

document.addEventListener("DOMContentLoaded", function() {
  // Haetaan terveystiedot ja päivitetään kalenteri
  fetchHealthDataAndUpdateCalendar();
});

async function fetchHealthDataAndUpdateCalendar() {
  try {
      // Haetaan käyttäjän terveystiedot ja niiden keskiarvot päivämäärän perusteella
      const healthData = await fetchHealthData(); // Tämä funktio haetaan backendistä

      // Päivitetään kalenteri terveystietojen perusteella
      updateCalendarWithHealthData(healthData);
  } catch (error) {
      console.error('Error fetching health data:', error);
      // Käsittele virheet tarvittaessa
  }
}

function fetchHealthData() {
  // Tässä voit kutsua backendin API:a terveystietojen hakemiseen
  // Voit esimerkiksi kutsua API:a, joka palauttaa keskiarvot terveystiedoista päivämäärän mukaan
  // Palauta saadut terveystiedot
}

function updateCalendarWithHealthData(healthData) {
  // Käydään läpi jokainen päivä kalenterissa
  const days = document.querySelectorAll('.day');
  days.forEach(day => {
      const date = day.textContent.trim(); // Päivämäärä string-muodossa

      // Check if healthData is not undefined and contains the date property
      if (healthData && healthData.hasOwnProperty(date)) {
          const healthInfoForDay = healthData[date]; // Terveystiedot päivälle

          // Määritellään värikoodi terveystietojen perusteella
          let colorCode = '';
          if (healthInfoForDay) {
              const avgReadiness = healthInfoForDay.avg_readiness;
              // Määrittele värikoodi terveystiedon perusteella
              colorCode = getColorCodeFromReadiness(avgReadiness);
          }

          // Päivitä päivän taustaväri
          day.style.backgroundColor = colorCode;
      }
  });
}

function getColorCodeFromReadiness(avgReadiness) {
  // Määrittele värikoodi keskiarvon perusteella
  if (avgReadiness >= 70) {
      return 'green';
  } else if (avgReadiness >= 40) {
      return 'yellow';
  } else {
      return 'red';
  }
}

const monthYearElement = document.getElementById("monthYear");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const daysElement = document.querySelector(".days");

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function renderCalendar() {
  const totalDays = 32 - new Date(currentYear, currentMonth, 32).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  monthYearElement.textContent = `${months[currentMonth]} ${currentYear}`;

  daysElement.innerHTML = "";

  for (let i = 0; i < firstDayIndex; i++) {
      const emptyDayElement = document.createElement("div");
      emptyDayElement.classList.add("day");
      daysElement.appendChild(emptyDayElement);
  }

  for (let i = 1; i <= totalDays; i++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("day");
      dayElement.textContent = i;
      dayElement.addEventListener("click", () => {
          alert(`You clicked on day ${i}`);
      });
      daysElement.appendChild(dayElement);
  }
}

// Event listeners for changing month
prevMonthButton.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
  }
  renderCalendar();
});

nextMonthButton.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
  }
  renderCalendar();
});

// Months array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// Initial rendering
renderCalendar();

// Haetaan tipContainer-elementti
const tipContainer = document.getElementById("tipContainer");

// Lisätään tapahtumankäsittelijä jokaiselle päivälle kalenterissa
daysElement.addEventListener("click", async (event) => {
  const clickedDay = event.target;
  if (clickedDay.classList.contains("day")) {
      try {
          const tips = await fetchTips(); // Hae vinkit
          const randomTip = tips[Math.floor(Math.random() * tips.length)]; // Valitse satunnainen vinkki
          displayTip(randomTip); // Näytä vinkki
          tipContainer.style.display = "block"; // Näytä tipContainer-elementti
      } catch (error) {
          console.error('Error fetching tips:', error);
          // Käsittele virheet tarvittaessa
      }
  }
});

// Funktio terveysvinkkien hakemiseen JSON-tiedostosta
async function fetchTips() {
  try {
      const response = await fetch('tips.json'); // Olettaen, että JSON-tiedosto on nimeltään health_tips.json
      const data = await response.json();
      return data.tips;
  } catch (error) {
      throw new Error('Error fetching tips:', error);
  }
}

// Näytä vinkki HTML-elementissä
function displayTip1(tip) {
  const tipText = document.getElementById("tipText");
  tipText.textContent = tip.tip_text; // Aseta vinkki tekstiin
}

// Lisätään tapahtumankäsittelijä jokaiselle päivälle kalenterissa
daysElement.addEventListener("click", async (event) => {
  const clickedDay = event.target;
  if (clickedDay.classList.contains("day")) {
      try {
          const tips = await fetchTips(); // Hae vinkit
          const randomTip = tips[Math.floor(Math.random() * tips.length)]; // Valitse satunnainen vinkki
          displayTip1(randomTip); // Näytä vinkki
          tipContainer.style.display = "block"; // Näytä tipContainer-elementti

          // Värjää klikattu päivä värin perusteella
          const colorCode = randomTip.color.toLowerCase(); // Muuta väri koodi pieniksi kirjaimiksi
          clickedDay.style.backgroundColor = colorCode; // Aseta taustaväri
      } catch (error) {
          console.error('Error fetching tips:', error);
          // Käsittele virheet tarvittaessa
      }
  }
});

// Koodi joka hakee ja näyttää vinkin jää ennalleen

// Lisätään terveysdata tipContaineriin
function displayHealthData(healthData) {
  const bpmValueElement = document.getElementById("bpmValue");
  const highestBPMElement = document.getElementById("highestBPM");
  const lowestBPMElement = document.getElementById("lowestBPM");
  const hrvValueElement = document.getElementById("hrvValue");
  const highestHRVElement = document.getElementById("highestHRV");
  const lowestHRVElement = document.getElementById("lowestHRV");

  // Aseta terveysdata näytölle
  bpmValueElement.textContent = healthData.averageBPM + " bpm";
  highestBPMElement.textContent = healthData.highestBPM + " bpm";
  lowestBPMElement.textContent = healthData.lowestBPM + " bpm";
  hrvValueElement.textContent = healthData.averageHRV + " ms";
  highestHRVElement.textContent = healthData.highestHRV + " ms";
  lowestHRVElement.textContent = healthData.lowestHRV + " ms";
}

// Kutsu displayHealthData-funktiota kun terveysdata saadaan ja päivitetään
async function fetchHealthDataAndUpdateContainer() {
  try {
      const healthData = await fetchHealthData(); // Hae terveysdata
      displayHealthData(healthData); // Näytä terveysdata
  } catch (error) {
      console.error('Error fetching health data:', error);
      // Käsittele virheet tarvittaessa
  }
}

// Koodi joka hakee ja näyttää vinkin jää ennalleen

// Lisätään värjäys terveysvinkille värikoodin perusteella
function colorTip(color) {
  const tipContainer = document.getElementById("tipContainer");
  tipContainer.style.backgroundColor = color;
}

// Näytetään terveysvinkki
function displayTip2(tip) {
  const tipTextElement = document.getElementById("tipText");
  tipTextElement.textContent = tip.tip_text;

  // Värjää terveysvinkki
  colorTip(tip.color.toLowerCase());
}

// Kutsu displayTip-funktiota kun terveysvinkki saadaan
async function fetchAndDisplayTip() {
  try {
      const tips = await fetchTips(); // Hae terveysvinkit
      const randomTip = tips[Math.floor(Math.random() * tips.length)]; // Valitse satunnainen vinkki
      displayTip2(randomTip); // Näytä terveysvinkki
  } catch (error) {
      console.error('Error fetching tips:', error);
      // Käsittele virheet tarvittaessa
  }
}

// Graph function
async function fetchReadinessData() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/measurements/user-data', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const readinessData = data.results.map(item => parseFloat(item.result.readiness).toFixed(2));
    const dailyResults = data.results.map(item => {
      const date = new Date(item.daily_result).toLocaleDateString();
      return `Date: ${date}`;
  });


    const ctx = document.getElementById('readinessChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
          labels: dailyResults,
          datasets: [{
              label: 'Readiness',
              data: readinessData,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  } catch (error) {
    console.error('Error fetching readiness data:', error);
  }
}

window.onload = fetchReadinessData;












// logout
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
