const { describe, it } = require('mocha');
const { expect } = require('chai');
const request = require('test/support/request');

describe('API :: POST atm-machine/credit', () => {
    context('creating account with success', async () => {
        let account_id;
        beforeEach(async () => {
            const newUser = {
                name: 'A Wonderful Name',
                cpf: '010.011.012-13',
                birthday_date: '10/10/2001',
            };
            const { body: respCreateUser } = await request().post('/user/create').send(newUser);

            const accountType = { CHECKING_ACCOUNT: 1 };
            const newAccount = {
                user_id: respCreateUser.id,
                type: accountType.CHECKING_ACCOUNT,
            };

            const { body: respNewAccount } = await request()
                .post('/account/create')
                .send(newAccount);

            account_id = respNewAccount.id;
        });

        it('credit a value with success', async () => {
            const { body } = await request()
                .post('/atm-machine/credit')
                .send({
                    account_id: account_id,
                    incoming: 2.24,
                })
                .expect(201);

            expect(body.account_id).to.be.eql(account_id);
        });

        it('credit with error', async () => {
            await request()
                .post('/atm-machine/credit')
                .send({
                    account_id: -1,
                    incoming: 23,
                })
                .then(res => {
                    const { message, error_code } = res.body;

                    expect(message).to.be.eql("Invalid data");
                    expect(error_code).to.be.equal('400');
                })
        });
    });
});
