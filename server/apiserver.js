const express = require('express')
const app = express()
const port = 3000

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomFloat(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(8));
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function randomDate(start, end) {
    let d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return formatDate(d);
}

const scooters = [];
for(let i=0; i<50; i++) {
    scooters.push({
        coordinate: { latitude: getRandomFloat(1.29175715,1.28017293), 
                      longitude: getRandomFloat(103.84332629, 103.85392638) },
        battery: getRandomInt(0, 100),
        batDistance: getRandomInt(0, 100),
        serial:getRandomInt(1000,9999)
    });
}

const trips= [];
for(let i=0; i<50; i++) {
    trips.push({
        date: randomDate(new Date(2018, 0, 1), new Date()),
        duration: getRandomInt(0, 2*60),
        id:getRandomInt(1000,9999)
    });
}
trips.sort((a,b)=>{ return (new Date(b.date) - new Date(a.date)); });

app.get('/scooters', (req, res) => res.status(200).json(scooters));
app.get('/trips', (req, res) => res.status(200).json(trips));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
