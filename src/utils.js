export const sortData = data => {
    const sortedData = [...data];

    return sortedData.sort((a, b) => a.cases > b.cases ? -1 : 1);
}


export const buildChartData = (data, casesTypes = "cases") => {
    const chartData = [];
    let lastDataPoint;
    data[casesTypes].forEach(date => {
        if (lastDataPoint) {
            const newDataPoint = {
                x: date,
                y: data[casesTypes][date] - lastDataPoint
            }
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesTypes][date];
    })
    return chartData;
}