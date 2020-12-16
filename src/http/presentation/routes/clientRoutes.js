var express = require('express');
const router = express.Router();

const { createClient } = require('src/http/presentation/controllers');

router.post('/create', createClient);

module.exports = router;
