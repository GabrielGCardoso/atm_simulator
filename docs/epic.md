#### ATM Simulator Test

#### Develop APIs simulating operations of a ATM with the following requirements:

- Possibility to register, change, delete and search for users. User attributes must be name, date of birth and CPF.
- Possibility to register accounts for users with account type (savings or checking) and balance.
- The user can deposit any amount into his account, except for cents.
- The user will be able to withdraw from his account only using the 20, 50 or 100 banknotes.
- The withdrawal API should prioritize the highest notes to make up the total amount. Example: If you choose to withdraw 150, then release one 100 and 50 note. If you choose to withdraw 60, then you must release 3 20 notes.
- If the requested withdrawal amount is greater than that available in the user's account, display an error.
- If there are no bills available for the requested amount, display an error. For example, if a withdrawal of 15 is requested, it will not be possible to proceed with the transaction since the minimum withdrawal note is 20.
- Ensure that in the competition of transactions (withdrawal and deposit), a withdrawal, for example, needs to wait for the other to finish before executing.

##### What is expected in this test?

- Automated testing of some flows
- Database usage
- Use of RESTful API standards (verbs, endpoints, status code, etc.)
- Documentation on how to run the application
- Documentation on how to use endpoints
