const creatUser = require('src/app/commands/createUserCommand');

const createClient = async (req, res) => {
    const { cpf, name, birthday_date } = req.body;
    const result = await creatUser({ cpf, name, birthday_date });
    res.status(201).send(result);
};

module.exports = { createClient };
