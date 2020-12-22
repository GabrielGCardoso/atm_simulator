const debitValueCommand = require('src/app/commands/atmCommands/debitValueCommand');
const asyncMiddleware = require('src/http/presentation/middlewares/asyncMiddleware');

const debitValue = asyncMiddleware(async (req, res) => {
    const { account_id, outgoing } = req.body;
    const result = await debitValueCommand({ account_id, outgoing });
    res.status(200).send(result);
});

module.exports = { debitValue };