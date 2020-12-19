const { describe, it } = require('mocha');
const { expect, spy } = require('chai');
const request = require('test/support/request');

describe('API :: POST user/create', () => {
    context('creating user with success', async () => {
        let payload;
        beforeEach(async () => {
            payload = {
                name: 'User Name',
                cpf: '010.011.012-13',
                birthday_date: '10/10/2001',
            };
        });

        it('Create user - with all fields', async () => {
            const { body } = await request()
                .post('/user/create')
                .send(payload)
                .expect(201);

            expect(body.id).to.be.exist();
            expect(body.name).to.be.eql('User Name');
        });
    });
});
