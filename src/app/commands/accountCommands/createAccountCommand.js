const AccountService = require('src/app/services/accountService');

module.exports = ({ user_id, type }) => {
    return new AccountService().create({ user_id, type });
};
