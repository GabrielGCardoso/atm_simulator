const debitValueCommand = require('src/app/commands/atmCommands/debitValueCommand');

const debitValue = async (req, res) => {
    const { account_id, outgoing } = req.body;
    const result = await debitValueCommand({ account_id, outgoing });
    res.status(200).send(result);
};

module.exports = { debitValue };