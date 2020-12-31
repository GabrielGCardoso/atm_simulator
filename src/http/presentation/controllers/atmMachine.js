const debitValueCommand = require('src/app/commands/atmCommands/debitValueCommand');
const creditValueCommand = require('src/app/commands/atmCommands/creditValueCommand');
const asyncMiddleware = require('src/http/presentation/middlewares/asyncMiddleware');

const creditValue = asyncMiddleware(async (req, res) => {
    const { account_id, incoming } = req.body;
    const result = await creditValueCommand({ account_id, incoming });
    res.status(201).send(result);
});

const debitValue = asyncMiddleware(async (req, res) => {
    const { account_id, outgoing } = req.body;
    const result = await debitValueCommand({ account_id, outgoing });
    res.status(201).send(result);
});

module.exports = { debitValue, creditValue };
