// Crop Categories Chart
const cropCtx = document.getElementById('cropChart').getContext('2d');
new Chart(cropCtx, {
    type: 'pie',
    data: {
        labels: ['Vegetables', 'Fruits', 'Grains'], // Crop categories
        datasets: [{
            data: [50, 30, 20], // Example data
            backgroundColor: ['#4caf50', '#ff9800', '#2196f3']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true
            }
        }
    }
});

// Field Sizes Chart
const fieldCtx = document.getElementById('fieldChart').getContext('2d');
new Chart(fieldCtx, {
    type: 'bar',
    data: {
        labels: ['Field Alpha', 'Field Beta', 'Field Gamma'], // Field names
        datasets: [{
            label: 'Field Size (Hectares)',
            data: [50, 30, 40], // Field sizes
            backgroundColor: ['#4caf50', '#ff9800', '#2196f3']
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Hectares'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Fields'
                }
            }
        }
    }
});