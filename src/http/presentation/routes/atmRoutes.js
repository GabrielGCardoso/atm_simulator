var express = require('express');
const router = express.Router();

const { debitValue } = require('src/http/presentation/controllers/atmMachine');

router.post('/debit', debitValue);

module.exports = router;