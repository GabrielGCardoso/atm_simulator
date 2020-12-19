var express = require('express');
const router = express.Router();

const { createTransaction } = require('src/http/presentation/controllers/transactions');

router.post('/create', createTransaction);

module.exports = router;
