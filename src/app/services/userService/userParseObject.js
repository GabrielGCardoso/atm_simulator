class UserDataParser {
    dateToTime(date) {
        const [d, m, y] = date.split('/');
        return new Date(y, m - 1, d);
    }

    data2Object(data) {
        const { cpf, name, birthday_date } = data;
        return { cpf, name, birthday_date: this.dateToTime(birthday_date) };
    }
}

module.exports = UserDataParser;
