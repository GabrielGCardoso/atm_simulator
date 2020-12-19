const creatAccountCommand = require('src/app/commands/accountCommands/createAccountCommand');

const createAccount = async (req, res) => {
    const { user_id, type } = req.body;
    const result = await creatAccountCommand({ user_id, type });
    res.status(201).send(result);
};

module.exports = { createAccount };