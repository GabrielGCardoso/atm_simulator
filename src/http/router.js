const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/account', require('src/http/presentation/routes/accountRoutes'));
app.use('/user', require('src/http/presentation/routes/userRoutes'));
app.use('/transaction', require('src/http/presentation/routes/transactionRoutes'));
app.use('/atm-machine', require('src/http/presentation/routes/atmRoutes'));
app.use(require('src/http/presentation/middlewares/exceptionMiddleware'));

app.all('*', async (req, res) => {
    res.status(404).send('route not found');
});

module.exports = app;