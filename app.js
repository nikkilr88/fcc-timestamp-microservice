const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/api/timestamp/:date_string?', (req, res) => {
    let unixReg = /^\d+$/;
    let input = req.params.date_string || new Date();
    let date_string = (unixReg.test(input)) ? Number(input) : input;
    let date = new Date(date_string);

    let error = { 
        error: 'Invalid Date'
    };

    let timestamp = {
        unix: date.getTime(),
        utc: date.toUTCString() 
    };

    res.json((isNaN(date.getTime())) ? error : timestamp);
});

app.listen(3000, () => console.log('Sever started on port 3000...'))