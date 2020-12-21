const { describe, it } = require('mocha');
const { expect } = require('chai');
const request = require('test/support/request');

describe('API :: POST transaction/create', () => {
    context('creating transaction with success', async () => {
        let payload;
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
                type: accountType.CHECKING_ACCOUNT,
                user_id: respCreateUser.id,
            };
            const { body: respCreateAccount } = await request()
                .post('/account/create')
                .send(newAccount);

            const transactionType = {
                INCOMING: 1,
                OUTGOING: 2,
            };

            payload = {
                account_id: respCreateAccount.id,
                type: transactionType.INCOMING,
                amount: 223.45,
            };
        });

        it('Create transaction - with all fields', async () => {
            const { body } = await request()
                .post('/transaction/create')
                .send(payload)
                .expect(201);

            expect(body.id).to.be.exist();
            expect(body.amount).to.be.eql(payload.amount);
        });
    });
});
