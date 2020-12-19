const creatUserCommand = require('src/app/commands/userCommands/createUserCommand');

const createUser = async (req, res) => {
    const { cpf, name, birthday_date } = req.body;
    const result = await creatUserCommand({ cpf, name, birthday_date });
    res.status(201).send(result);
};

module.exports = { createUser };