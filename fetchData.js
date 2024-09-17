const fetchBTCData = async (interval) => {
    const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${interval}&limit=60`);
    const data = await response.json();
    return data.map(entry => ({
        time: new Date(entry[0]),
        price: parseFloat(entry[4])
    }));
};
