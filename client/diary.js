
const monthYearElement = document.getElementById("monthYear");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const daysElement = document.querySelector(".days");
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let chart;

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

document.addEventListener("DOMContentLoaded", async function() {
  renderCalendar();
  fetchLastReadinessAndGiveTip();
});
document.getElementById('allTimeButton').addEventListener('click', fetchAllTimeReadinessData);
document.getElementById('monthlyButton').addEventListener('click', () => fetchReadinessData(currentMonth, currentYear));
prevMonthButton.addEventListener("click", prevMonth);
nextMonthButton.addEventListener("click", nextMonth);

window.onload = () => {
  fetchReadinessData(currentMonth, currentYear);
};

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", logout);

//TIP TIP TIP
async function fetchLastReadinessAndGiveTip() {
  const token = localStorage.getItem('token');

  // Fetch the tip
  const response = await fetch('http://localhost:3000/api/tip', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const tip = data.tip_text;

  document.getElementById('tipText').textContent = tip;
}


// ADDS HEALTH DATA TO THE CALENDAR WITH COLORS
async function updateCalendarWithHealthData(year, month) {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:3000/api/calendar/month/${year}/${String(month).padStart(2, '0')}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    console.error('Failed to fetch health data:', response.status);
    return;
  }

  const healthData = await response.json();

  if (!healthData || healthData.length === 0) {
    console.log('No health data available for this month');
    return;
  }

  const firstDayIndex = new Date(year, month - 1, 1).getDay();
  const dayElements = document.querySelectorAll('.day');

  for (const result of healthData) {
    if (!result.date) {
      console.error(`Missing date in result: ${JSON.stringify(result)}`);
      continue;
    }

    const date = new Date(result.date);

    if (isNaN(date.getTime())) {
      console.error(`Invalid date: ${result.date}`);
      continue;
    }

    const day = date.getDate();
    const dayElement = dayElements[day + firstDayIndex - 1];
    console.log(dayElement);
    console.log(dayElements); // Check the contents of the dayElements array
    console.log(firstDayIndex); // Check the value of firstDayIndex
    console.log(day); // Check the value of day
    console.log(day + firstDayIndex - 1); // Check the computed index

    if (dayElement) {
      console.log('there is day');
      const readiness = parseFloat(result.avg_readiness);
      let color;
      if (readiness >= 66) {
        color = 'green';
      } else if (readiness >= 33) {
        color = 'yellow';
      } else {
        color = 'red';
      }

      // Remove old color classes
      dayElement.classList.remove('green', 'yellow', 'red');

      // Add new color class
      dayElement.classList.add(color);

      dayElement.addEventListener('click', () => {

      });
    }
  }
}

async function fetchHealthDataAndUpdateCalendar() {
  try {
    const year = currentYear;
    const month = currentMonth + 1;
    await updateCalendarWithHealthData(year, month);
  } catch (error) {
    console.error('Error fetching health data:', error);
  }
}
// RENDERS THE CALENDAR
async function renderCalendar() {
  const totalDays = 32 - new Date(currentYear, currentMonth, 32).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  monthYearElement.textContent = `${months[currentMonth]} ${currentYear}`;

  daysElement.textContent = "";

  for (let i = 0; i < firstDayIndex; i++) {
    const emptyDayElement = document.createElement("div");
    emptyDayElement.classList.add("day");
    daysElement.appendChild(emptyDayElement);
  }

  for (let i = 1; i <= totalDays; i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = i;
    daysElement.appendChild(dayElement);


    // PRINTS HEALTH DATA, EMOJI AND INFO FOR THE DAY UNDER THE CALENDAR
    dayElement.addEventListener('click', async () => {
      const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const data = await fetchFullHealthDataForDate(date);
      const healthDataElement = document.getElementById('healthData');

      healthDataElement.textContent = '';

      const infoButton = document.createElement('button');
      infoButton.textContent = 'i';
      infoButton.id = 'infoButton';
      healthDataElement.appendChild(infoButton);

      document.getElementById('infoButton').addEventListener('click', () => {
        const explanation = `
        <p>Mean HR BPM: The average heart rate in beats per minute.</p>
        <p>Readiness: A percentage indicating the readiness of the body for physical activity.</p>
        <p>Mean RR MS: The average of RR intervals in milliseconds.</p>
        <p>RMSSD MS: The root mean square of successive differences in RR intervals in milliseconds.</p>
        <p>SDNN MS: The standard deviation of NN intervals in milliseconds.</p>
      `;

        Swal.fire({
          title: 'Measurement Explanation',
          html: explanation,
          icon: 'info',
          confirmButtonText: 'Close'
        });
      });

      if (data.length > 0) {
        const dateElement = document.createElement('strong');
        dateElement.textContent = `Health data for ${date}:`;
        healthDataElement.appendChild(dateElement);

        const meanHrBpmElement = document.createElement('p');
        meanHrBpmElement.textContent = `Mean HR BPM: ${Math.round(data[0].result.mean_hr_bpm)} BPM`;
        healthDataElement.appendChild(meanHrBpmElement);

        const readinessElement = document.createElement('p');
        readinessElement.textContent = `Readiness: ${Math.round(data[0].result.readiness)} %`;
        healthDataElement.appendChild(readinessElement);

        const meanRrMsElement = document.createElement('p');
        meanRrMsElement.textContent = `Mean RR MS: ${Math.round(data[0].result.mean_rr_ms)} MS`;
        healthDataElement.appendChild(meanRrMsElement);

        const rmssdMsElement = document.createElement('p');
        rmssdMsElement.textContent = `RMSSD MS: ${Math.round(data[0].result.rmssd_ms)} MS`;
        healthDataElement.appendChild(rmssdMsElement);

        const sdnnMsElement = document.createElement('p');
        sdnnMsElement.textContent = `SDNN MS: ${Math.round(data[0].result.sdnn_ms)} MS`;
        healthDataElement.appendChild(sdnnMsElement);

        const readinessEmojiElement = document.createElement('p');
        let readinessEmoji = '';
        const readiness = Math.round(data[0].result.readiness);
        if (readiness < 33) {
          readinessEmoji = '😞';
        } else if (readiness >= 33 && readiness < 66) {
          readinessEmoji = '🙂';
        } else {
          readinessEmoji = '😃';
        }
        readinessEmojiElement.className = 'emoji';
        readinessEmojiElement.textContent = `${readinessEmoji}`;
        healthDataElement.appendChild(readinessEmojiElement);
      } else {
        const noDataElement = document.createElement('p');
        noDataElement.textContent = `No health data for ${date}`;
        healthDataElement.appendChild(noDataElement);
      }
    });
  }

  await fetchHealthDataAndUpdateCalendar();
  const healthDataElement = document.getElementById('healthData');
  healthDataElement.textContent = "Please click a date for specific info";


}

async function fetchHealthDataForDate(date) {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:3000/api/calendar/day/${date}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    console.error('Failed to fetch health data:', response.status);
    return;
  }

  const healthData = await response.json();
  return healthData;
}


async function fetchFullHealthDataForDate(date) {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/api/measurements/user-data', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    console.error('Failed to fetch health data:', response.status);
    return;
  }

  const healthData = await response.json();

  const dateHealthData = healthData.results.filter(item => {
    const itemDate = new Date(item.daily_result);
    return itemDate.toISOString().split('T')[0] === date;
  });

  return dateHealthData;
}

function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
}

/* TAULUKOT */
// FETCHES USER DATA ALL TIME
async function fetchAllTimeReadinessData() {
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

    if (chart) {
      chart.destroy();
    }

    chart = new Chart(ctx, {
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


// FETCH READINESS DATA MONTHLY
async function fetchReadinessData(month, year) {
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
    const filteredData = data.results.filter(item => {
      const itemDate = new Date(item.daily_result);
      return itemDate.getMonth() === month && itemDate.getFullYear() === year;
    });
    const readinessData = filteredData.map(item => parseFloat(item.result.readiness).toFixed(2));
    const dailyResults = filteredData.map(item => {
      const date = new Date(item.daily_result).toLocaleDateString();
      return `Date: ${date}`;
    });

    const ctx = document.getElementById('readinessChart').getContext('2d');

    if (chart) {
      chart.destroy();
    }

    chart = new Chart(ctx, {
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

// LOGOUT FUNCTION
function logout(evt) {
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
}

async function printUserData() {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/api/measurements/user-data', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    console.error('Failed to fetch user data:', response.status);
    return;
  }

  const userData = await response.json();
}
printUserData();

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  } else {
    console.error('Logout button not found');
  }
});

// CALENDAR'S BACK TO THIS MONTH BUTTON
document.getElementById('todayButton').addEventListener('click', () => {
  currentDate = new Date();
  currentMonth = currentDate.getMonth();
  currentYear = currentDate.getFullYear();
  renderCalendar();
});

// INFO BUTTON FOR HEALTH DATA
const infoButton = document.createElement('button');
infoButton.textContent = 'i';
infoButton.id = 'infoButton';
infoButton.style.position = 'absolute';
infoButton.style.top = '10px';
infoButton.style.right = '10px';

const healthDataDiv = document.getElementById('healthData');
healthDataDiv.style.position = 'relative';
healthDataDiv.appendChild(infoButton);

document.getElementById('infoButton').addEventListener('click', () => {
  const explanation = `
    Mean HR BPM: The average heart rate in beats per minute.
    Readiness: A percentage indicating the readiness of the body for physical activity.
    Mean RR MS: The average of RR intervals in milliseconds.
    RMSSD MS: The root mean square of successive differences in RR intervals in milliseconds.
    SDNN MS: The standard deviation of NN intervals in milliseconds.
  `;
  alert(explanation);
});
