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
            const { body: respCreateUser } = await request().post('/user/create').send(newUser);

            const accountType = { CHECKING_ACCOUNT: 1 };
            const newAccount = {
                user_id: respCreateUser.id,
                type: accountType.CHECKING_ACCOUNT,
            };

            const { body: respNewAccount } = await request()
                .post('/account/create')
                .send(newAccount);

            incomingTransaction = {
                account_id: respNewAccount.id,
                incoming: 50,
            };
            await request().post('/atm-machine/credit').send(incomingTransaction);
        });

        it('debit a value with error invalid banknotes', async () => {
            const { body } = await request()
                .post('/atm-machine/debit')
                .send({
                    account_id: incomingTransaction.account_id,
                    outgoing: 22,
                })
                .expect(422);

            expect(body.message).to.be.eql('invalid value only allowed to withdraw amounts with notes of 20, 50 and 100');
        });

        it('debit a value with error insufficient cash on ATM', async () => {
            const { body } = await request()
                .post('/atm-machine/debit')
                .send({
                    account_id: incomingTransaction.account_id,
                    outgoing: 40,
                })
                .expect(422);

            expect(body.message).to.be.eql('insufficient cash, try another ATM');
        });

        it('debit a value with success', async () => {
            const { body } = await request()
                .post('/atm-machine/debit')
                .send({
                    account_id: incomingTransaction.account_id,
                    outgoing: 20,
                })
                .expect(201);

            expect(body.account_id).to.be.eql(incomingTransaction.account_id);
        });

        it('debit with error, insufficient funds', async () => {
            await request()
                .post('/atm-machine/debit')
                .send({
                    account_id: incomingTransaction.account_id,
                    outgoing: 50,
                })
                .catch((error) => {
                    expect(error.message).to.be.eql('Insufficient funds');
                    expect(error.error_code).to.be.equal('422');
                });
        });
        it('debit with error, invalid value', async () => {
            await request()
                .post('/atm-machine/debit')
                .send({
                    account_id: incomingTransaction.account_id,
                    outgoing: 22,
                })
                .catch((error) => {
                    expect(error.message).to.be.eql('invalid value only allowed to withdraw amounts with notes of 20, 50 and 100');
                    expect(error.error_code).to.be.equal('422');
                });
        });

    });
});
