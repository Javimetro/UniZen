// Variables for calendar
const monthYearElement = document.getElementById("monthYear");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const daysElement = document.querySelector(".days");
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Variables for chart
let chart;

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

// Event listeners
document.addEventListener("DOMContentLoaded", renderCalendar);
document.getElementById('allTimeButton').addEventListener('click', fetchAllTimeReadinessData);
document.getElementById('monthlyButton').addEventListener('click', () => fetchReadinessData(currentMonth, currentYear));
prevMonthButton.addEventListener("click", prevMonth);
nextMonthButton.addEventListener("click", nextMonth);

// Fetch readiness data for the current month when the page loads
window.onload = () => fetchReadinessData(currentMonth, currentYear);

// Logout button
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", logout);

async function fetchAndCalculateAverageReadiness() {
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
  const readinessData = data.results.map(item => parseFloat(item.result.readiness));

  const averageReadiness = readinessData.reduce((a, b) => a + b, 0) / readinessData.length;

  let color;
  if (averageReadiness >= 66) {
    color = 'green';
  } else if (averageReadiness >= 33) {
    color = 'yellow';
  } else {
    color = 'red';
  }

  const tip = await fetchTip(color);
  console.log(tip);
}

async function fetchHealthDataAndUpdateCalendar() {
  console.log('fetchHealthDataAndUpdateCalendar called');
  try {
    const year = currentYear;
    const month = currentMonth + 1;
    await updateCalendarWithHealthData(year, month);
  } catch (error) {
    console.error('Error fetching health data:', error);
  }
}

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

  const dayElements = document.querySelectorAll('.day');

  for (const result of healthData) {
    const date = new Date(result.Date);
    const day = date.getDate();
    const dayElement = dayElements[day];

    if (dayElement) {
      const readiness = parseFloat(result.avg_readiness);
      let color;
      if (readiness >= 66) {
        color = 'green';
      } else if (readiness >= 33) {
        color = 'yellow';
      } else {
        color = 'red';
      }
      dayElement.style.backgroundColor = color;

      // Add event listener to print health data when day element is clicked
      dayElement.addEventListener('click', () => {

      });
    }
  }
}

async function renderCalendar() {
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
    daysElement.appendChild(dayElement);

    // Add event listener to print health data when day element is clicked
    dayElement.addEventListener('click', async () => {
      const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const data = await fetchFullHealthDataForDate(date);
      const healthDataElement = document.getElementById('healthData');

      // Clear the previous data
      healthDataElement.textContent = '';

      if (data.length > 0) {
        const dateElement = document.createElement('p');
        dateElement.textContent = `Health data for ${date}:`;
        healthDataElement.appendChild(dateElement);

        const meanHrBpmElement = document.createElement('p');
        meanHrBpmElement.textContent = `Mean HR BPM: ${data[0].result.mean_hr_bpm.toFixed(2)}`;
        healthDataElement.appendChild(meanHrBpmElement);

        const readinessElement = document.createElement('p');
        readinessElement.textContent = `Readiness: ${data[0].result.readiness.toFixed(2)}`;
        healthDataElement.appendChild(readinessElement);

        const meanRrMsElement = document.createElement('p');
        meanRrMsElement.textContent = `Mean RR MS: ${data[0].result.mean_rr_ms.toFixed(2)}`;
        healthDataElement.appendChild(meanRrMsElement);

        const rmssdMsElement = document.createElement('p');
        rmssdMsElement.textContent = `RMSSD MS: ${data[0].result.rmssd_ms.toFixed(2)}`;
        healthDataElement.appendChild(rmssdMsElement);

        const sdnnMsElement = document.createElement('p');
        sdnnMsElement.textContent = `SDNN MS: ${data[0].result.sdnn_ms.toFixed(2)}`;
        healthDataElement.appendChild(sdnnMsElement);
      } else {
        const noDataElement = document.createElement('p');
        noDataElement.textContent = `No health data for ${date}`;
        healthDataElement.appendChild(noDataElement);
      }
    });
  }

  // Fetch health data and update calendar with colors
  await fetchHealthDataAndUpdateCalendar();
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

  // Filter the health data for the specific date
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

    // If a chart already exists, destroy it
    if (chart) {
      chart.destroy();
    }

    // Create a new chart
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

    // If a chart already exists, destroy it
    if (chart) {
      chart.destroy();
    }

    // Create a new chart
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

window.onload = fetchAllTimeReadinessData;

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
  console.log('User data:', userData);
}
printUserData();
