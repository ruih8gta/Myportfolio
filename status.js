document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('skillChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['ちから', 'みのまもり', 'すばやさ', 'かしこさ', 'うん', 'MP'],
            datasets: [{
                label: 'ステータス',
                data: [75, 820, 68, 90, 65, 84],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    pointLabels: {
                        color: 'white'
                    },
                    ticks: {
                        color: 'white',
                        backdropColor: 'transparent'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            }
        }
    });
});
