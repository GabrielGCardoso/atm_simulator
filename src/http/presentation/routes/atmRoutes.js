var express = require('express');
const router = express.Router();

const { creditValue, debitValue } = require('src/http/presentation/controllers/atmMachine');

router.post('/debit', debitValue);
router.post('/credit', creditValue);

module.exports = router;
