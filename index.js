class Account {
  constructor(username) {
    this.username = username;
    //Have the account balance start at $0 since that makes more sense.
    this.transactions = [];
  }

  get balance() {
    //Calculate the balance using the transaction objects.
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) return false;
    //Keep track of the time of the transaction
    this.time = new Date();
    //Add the transaction to the account
    this.account.addTransaction(this);
    return true;
  }
}
class Withdrawal extends Transaction {
  //Update the balance in the account
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {
  // Update the balance in the account
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}






// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

console.log('Starting Balance:', myAccount.balance);

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

t4 = new Deposit(1000, myAccount);
t4.commit();
console.log('Transaction 4:', t4);

t5 = new Withdrawal(50, myAccount);
t5.commit();
console.log('Transaction 5:', t5 )

console.log('Balance:', myAccount.balance);
