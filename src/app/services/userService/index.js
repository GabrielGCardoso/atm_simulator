const UsersRepository = require('src/infra/repository/usersRepository');
const UserParseObject = require('src/app/services/userService/userParseObject');

class UsersService {
    constructor() {
        this.repository = new UsersRepository();
        this.parser = new UserParseObject();
    }

    async create(data) {
        return this.repository.create(this.parser.data2Object(data));
    }
}

module.exports = UsersService;
