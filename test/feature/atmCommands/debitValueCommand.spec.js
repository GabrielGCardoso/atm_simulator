const { describe, it } = require('mocha');
const { expect } = require('chai');
const request = require('test/support/request');

describe('API :: POST atm-machine/debit', () => {
    context('creating account with success', async () => {
        let incomingTransaction;
        beforeEach(async () => {
            const newUser = {
                name: 'A Wonderful Name',
                cpf: '010.011.012-13',
                birthday_date: '10/10/2001',
            };
            const { body: respCreateUser } = await request()
                .post('/user/create')
                .send(newUser);

            const accountType = { CHECKING_ACCOUNT: 1 };
            const newAccount = {
                user_id: respCreateUser.id,
                type: accountType.CHECKING_ACCOUNT,
            };

            const { body: respNewAccount } = await request()
                .post('/account/create')
                .send(newAccount);

            const transactionType = { INCOMING: 1, OUTGOING: 2 };
            incomingTransaction = {
                account_id: respNewAccount.id,
                type: transactionType.INCOMING,
                amount: 22.45,
            };
            await request().post('/transaction/create').send(incomingTransaction);
        });

        it('debit a value with success', async () => {
            const { body } = await request()
                .post('/atm-machine/debit')
                .send({
                    account_id: incomingTransaction.account_id,
                    outgoing: 2.24,
                })
                .expect(200);

            expect(body.account_id).to.be.eql(incomingTransaction.account_id);
        });
    });
});
