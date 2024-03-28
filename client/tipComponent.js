//tipComponent.js
google.charts.load('current', {'packages':['gauge']});

// Define and export the drawChart function
export function drawChart(score = 0) {
    // Ensure the library is loaded before drawing
    google.charts.setOnLoadCallback(function() {
        // Setup the data table with initial score
        const data = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['Sentiment Score', score],
        ]);

        // Set options for the gauge
        const options = {
            width: 800, height: 240,
            redFrom: -5, redTo: -1,
            yellowFrom:-1, yellowTo: 1,
            greenFrom: 1, greenTo: 5,
            minorTicks: 5,
            min: -5,
            max: 5,
        };

        // Create and draw the gauge
        const chart = new google.visualization.Gauge(document.getElementById('gauge_div'));
        chart.draw(data, options);
    });
}
