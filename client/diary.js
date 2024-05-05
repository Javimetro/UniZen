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

async function fetchLastReadinessAndGiveTip() {
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
  const lastReadiness = parseFloat(data.results[data.results.length - 1].result.readiness);
  console.log('Last readiness:', lastReadiness);

  let tip;
  if (lastReadiness >= 66) {
    const highReadinessTips = [
      'Congratulations on maintaining exceptional readiness levels! Your consistent effort and dedication are truly commendable. Remember to sustain this momentum and continue prioritizing self-care. Regular exercise, balanced nutrition, and sufficient rest are vital components of your success journey. Keep up the outstanding work!',
      'Your readiness metrics indicate outstanding performance, reflecting your commitment to peak physical and mental preparedness. Embrace the day with confidence and vigor, knowing that your resilience and determination equip you to tackle any challenge. Stay focused on your goals, maintain a positive mindset, and seize every opportunity for growth.',
      'Exemplary readiness levels demonstrate your unwavering commitment to personal excellence. Your disciplined approach to training and recovery sets a benchmark for success. As you embark on your daily endeavors, leverage your high readiness to maximize productivity and achieve optimal outcomes. Remember to listen to your body\'s cues and adapt your routine accordingly.'
    ];
    tip = highReadinessTips[Math.floor(Math.random() * highReadinessTips.length)];
  } else if (lastReadiness >= 33) {
    const mediumReadinessTips = [
      'While your readiness metrics suggest satisfactory performance, it\'s crucial to prioritize holistic well-being. Balancing intensity with adequate rest is essential for sustaining long-term progress. Incorporate active recovery techniques, such as stretching or yoga, into your routine to enhance flexibility and reduce the risk of injury. Remember, consistency and moderation are key to optimizing your readiness levels.',
      'Maintaining moderate readiness levels signifies a solid foundation for progress and growth. Take this opportunity to reassess your training regimen and identify areas for improvement. Implement strategies to optimize recovery, such as mindfulness practices or relaxation techniques, to mitigate stress and enhance overall resilience. Remember to celebrate small victories along your journey towards peak performance.',
      'Your readiness metrics indicate a balanced approach to training and recovery. While there\'s room for improvement, your consistent efforts contribute to incremental progress. Focus on refining your skills and techniques, leveraging each training session as an opportunity for growth. Prioritize quality rest and nutrition to support your body\'s adaptive processes. With dedication and perseverance, you\'ll continue to elevate your readiness levels.'
    ];
    tip = mediumReadinessTips[Math.floor(Math.random() * mediumReadinessTips.length)];
  } else {
    const lowReadinessTips = [
      'Low readiness levels serve as a valuable indicator of the need for rest and rejuvenation. Recognize the importance of listening to your body\'s signals and honoring its need for recovery. Prioritize ample sleep, hydration, and nutrition to facilitate optimal healing and regeneration. Consider incorporating low-impact activities, such as walking or gentle stretching, to promote circulation and alleviate muscular tension.',
      'Acknowledging low readiness levels is an essential step towards preventing burnout and injury. Embrace this opportunity to recalibrate your training approach and implement a phased recovery plan. Focus on activities that promote relaxation and stress reduction, such as meditation or deep breathing exercises. Remember, self-care is a fundamental aspect of sustainable performance and overall well-being.',
      'Low readiness levels signal a temporary setback in your training journey, but they also present an opportunity for reflection and growth. Take this time to assess your current routine and identify factors contributing to fatigue or overexertion. Consider consulting with a coach or healthcare professional to develop a personalized recovery strategy. Remember, progress is not linear, and setbacks are natural occurrences in the pursuit of excellence.'
    ];
    tip = lowReadinessTips[Math.floor(Math.random() * lowReadinessTips.length)];
  }
  document.getElementById('tipText').textContent = tip;
}

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

  const firstDayIndex = new Date(year, month - 1, 1).getDay();
  const dayElements = document.querySelectorAll('.day');

  for (const result of healthData) {
    const date = new Date(result.Date);
    const day = date.getDate();
    const dayElement = dayElements[day + firstDayIndex - 1];

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

/* PRINTTAUS KALENTERIN ALLE */
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

      // Create an info button
      const infoButton = document.createElement('button');
      infoButton.textContent = 'i';
      infoButton.id = 'infoButton';
      healthDataElement.appendChild(infoButton);

      // Add event listener to the info button
      document.getElementById('infoButton').addEventListener('click', () => {
        const explanation = `
        <p>Mean HR BPM: The average heart rate in beats per minute.</p>
        <p>Readiness: A percentage indicating the readiness of the body for physical activity.</p>
        <p>Mean RR MS: The average of RR intervals in milliseconds.</p>
        <p>RMSSD MS: The root mean square of successive differences in RR intervals in milliseconds.</p>
        <p>SDNN MS: The standard deviation of NN intervals in milliseconds.</p>
      `;
        // Display the explanation in a SweetAlert2 popup
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
      } else {
        const noDataElement = document.createElement('p');
        noDataElement.textContent = `No health data for ${date}`;
        healthDataElement.appendChild(noDataElement);
      }
    });
  }

  // Fetch health data and update calendar with colors
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

document.getElementById('todayButton').addEventListener('click', () => {
  currentDate = new Date();
  currentMonth = currentDate.getMonth();
  currentYear = currentDate.getFullYear();
  renderCalendar();
});

// Create an info button
const infoButton = document.createElement('button');
infoButton.textContent = 'i';
infoButton.id = 'infoButton';
infoButton.style.position = 'absolute';
infoButton.style.top = '10px';
infoButton.style.right = '10px';

// Append the button to the healthData div
const healthDataDiv = document.getElementById('healthData');
healthDataDiv.style.position = 'relative'; // make sure the div is positioned
healthDataDiv.appendChild(infoButton);

// Add event listener to the info button
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
