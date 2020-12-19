var express = require('express');
const router = express.Router();

const { createAccount } = require('src/http/presentation/controllers/accounts');

router.post('/create', createAccount);

module.exports = router;
