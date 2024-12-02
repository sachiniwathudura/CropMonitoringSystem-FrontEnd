
        // Crop Categories Pie Chart
        const cropPieCtx = document.getElementById('cropPieChart').getContext('2d');
        new Chart(cropPieCtx, {
            type: 'pie',
            data: {
                labels: ['Vegetables', 'Fruits', 'Grains'],
                datasets: [{
                    data: [50, 30, 20],
                    backgroundColor: ['#4caf50', '#ff9800', '#2196f3']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: { enabled: true }
                }
            }
        });

        // Crop Growth Over Time Line Chart
        const cropLineCtx = document.getElementById('cropLineChart').getContext('2d');
        new Chart(cropLineCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','July','Agust'], // Example months
                datasets: [{
                    label: 'Growth (in %)',
                    data: [10, 20, 40, 60, 80, 100,120,50],
                    borderColor: '#4caf50',
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Growth (%)' }
                    },
                    x: { title: { display: true, text: 'Months' } }
                }
            }
        });
    