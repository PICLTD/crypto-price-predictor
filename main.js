const ctx = document.getElementById('btcChart').getContext('2d');

let chart;  
let data = []; 

const updateChart = (data, prediction) => {
    if (chart) {
        chart.data.labels = data.map(entry => entry.time);
        chart.data.datasets[0].data = data.map(entry => ({
            x: entry.time,
            y: entry.price
        }));
        chart.data.datasets[1].data = prediction.map(entry => ({
            x: entry.time,
            y: entry.price
        }));
        chart.update();
    } else {
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(entry => entry.time),
                datasets: [{
                    label: 'BTC Price',
                    data: data.map(entry => ({
                        x: entry.time,
                        y: entry.price
                    })),
                    borderColor: '#00aaff',
                    borderWidth: 1,
                    fill: false
                }, {
                    label: 'Predicted Price',
                    data: [],
                    borderColor: '#ff0000',
                    borderWidth: 1,
                    fill: false,
                    borderDash: [5, 5]
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute'
                        },
                        title: {
                            display: true,
                            text: 'Time'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Price (USDT)'
                        }
                    }
                },
                plugins: {
                    zoom: {
                        pan: {
                            enabled: true,
                            mode: 'xy'
                        },
                        zoom: {
                            enabled: true,
                            mode: 'xy'
                        }
                    }
                }
            }
        });
    }
};

const fetchAndUpdateData = async (interval) => {
    const newData = await fetchBTCData(interval);
    data = data.concat(newData);  
    if (data.length > 60) {
        data = data.slice(-60);  
    }
    const prediction = generatePrediction(data);
    updateChart(data, prediction);
};

setInterval(() => fetchAndUpdateData(currentInterval), 1000);

let currentInterval = '1m';  
fetchAndUpdateData(currentInterval);


