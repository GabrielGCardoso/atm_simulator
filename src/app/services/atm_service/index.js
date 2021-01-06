const { Errors, Exceptions } = require('src/infra/exceptions');

class ATMService {
    constructor() {
        this.banknotes = {
            '20': 1,
            '50': 1,
            '100': 2,
        };
    }

    hasEnoughFunds(outgoing) {
        let rest, banknote, qtd;
        let bankNotesArr = Object.keys(this.banknotes);

        for (let index = 0; index < bankNotesArr.length; index++) {
            banknote = bankNotesArr[index];
            qtd = this.banknotes[bankNotesArr[index]];

            rest = parseInt(outgoing / banknote);
            if (rest) {
                if (rest > qtd) outgoing = outgoing - qtd * banknote;
                else outgoing = outgoing - rest * banknote;
            }
        }
        if (outgoing > 0 && outgoing < 20) throw Exceptions.business(Errors.INVALID_VALUE);

        return !outgoing;
    }
}

module.exports = ATMService;
