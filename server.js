const express = require('express');
const app = express();
const PORT = 3000;
const data = require('./data');

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/data', (req, res) => {
    res.json(data.calendar);
});

app.delete('/data/:appID', (req, res) => {
    const appID = req.params.appID;
    data.deleteApp(appID);
    res.json(data.calendar);
});

app.get('/doctors', (req, res) => {
    res.json(data.doctors);
});

app.post('/data/app/:doctorID', (req, res) => {
    const doctorID = req.params.doctorID;
    data.addApp(doctorID, req.body);
    res.json(data.calendar);
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));