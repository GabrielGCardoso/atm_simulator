const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/client', require('src/http/presentation/routes/clientRoutes'));

app.all('*', async (req, res) => {
    res.status(404).send('route not found');
});

module.exports = app;