var express = require('express');
const router = express.Router();

const { createUser } = require('src/http/presentation/controllers/user');

router.post('/create', createUser);

module.exports = router;
