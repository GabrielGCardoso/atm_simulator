const { describe, it } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const UsersRepository = require('src/infra/repository/usersRepository');

describe('Repository test', () => {
    describe('should throw an error to invalid date', () => {
        let fakeData, usersRepo, stub;
        before(() => {
            fakeData = { name: 'Clara', cpf: '123123', birthday_date: new Date('19/02/2000') };
            usersRepo = new UsersRepository();
            stub = sinon.stub(usersRepo, usersRepo.create.name);
            stub.withArgs(fakeData).rejects({
                message:
                    "Incorrect datetime value: 'Invalid date' for column 'birthday_date' at row 1",
            });
        });
        it('should call create function from mocked entity', (done) => {
            usersRepo
                .create(fakeData)
                .then(() => done('should throw error'))
                .catch((error) => {
                    expect(error.message).to.be.equal(
                        "Incorrect datetime value: 'Invalid date' for column 'birthday_date' at row 1"
                    );
                    done();
                });
        });
    });

    describe('should return saved object', () => {
        let fakeData, usersRepo, stub;
        before(() => {
            usersRepo = new UsersRepository();
            fakeData = {
                name: 'Clara',
                cpf: '123123',
                birthday_date: new Date(2000, 1, 19),
            };

            stub = sinon.stub(usersRepo, usersRepo.create.name);
            stub.withArgs(fakeData).resolves({
                id: 1,
                ...fakeData,
            });
        });

        it('should call create function from mocked entity', (done) => {
            usersRepo
                .create(fakeData)
                .then((result) => {
                    expect(result.id).to.exist();
                    expect(result.name).to.be.eql('Clara');
                    expect(result.cpf).to.be.eql('123123');
                    done();
                })
                .catch((error) => {
                    done(`should not throw an error ${error}`);
                });
        });
    });
});
