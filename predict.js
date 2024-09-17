const generatePrediction = (data) => {
    const period = 5;  
    let predictions = [];

    for (let i = 0; i < data.length - period; i++) {
        const slice = data.slice(i, i + period);
        const avg = slice.reduce((sum, entry) => sum + entry.price, 0) / period;
        predictions.push({
            time: data[i + period].time,
            price: avg
        });
    }

    return predictions;
};
