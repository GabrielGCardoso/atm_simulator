const { describe, it } = require('mocha');
const { expect } = require('chai');
const request = require('test/support/request');

describe('API :: POST account/create', () => {
    context('creating account with success', async () => {
        let payload;
        beforeEach(async () => {
            const accountType = {
                CHECKING_ACCOUNT: 1,
            };
            const newUser = {
                name: 'A Wonderful Name',
                cpf: '010.011.012-13',
                birthday_date: '10/10/2001',
            };

            const { body: respCreateUser } = await request()
                .post('/user/create')
                .send(newUser);

            payload = {
                user_id: respCreateUser.id,
                type: accountType.CHECKING_ACCOUNT,
            };
        });

        it('Create account - with all fields', async () => {
            const { body } = await request()
                .post('/account/create')
                .send(payload)
                .expect(201);

            expect(body.id).to.be.exist();
            expect(body.user_id).to.be.eql(payload.user_id);
        });
    });
});
