const createTransactionCommand = require('src/app/commands/transactionCommands/createTransactionCommand');

const createTransaction = async (req, res) => {
    const result = await createTransactionCommand(req.body);
    res.status(201).send(result);
};

module.exports = { createTransaction };
