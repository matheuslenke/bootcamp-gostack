import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTransactions = this.transactions.filter(
      (transaction: Transaction) => transaction.type === 'income',
    );
    const income = incomeTransactions.reduce(
      (Accumulator: number, transaction: Transaction) =>
        transaction.value + Accumulator,
      0,
    );
    const outcomeTransactions = this.transactions.filter(
      (transaction: Transaction) => transaction.type === 'outcome',
    );
    const outcome = outcomeTransactions.reduce(
      (Accumulator: number, transaction: Transaction) =>
        transaction.value + Accumulator,
      0,
    );
    const total = income - outcome;

    this.balance.income = income;
    this.balance.outcome = outcome;
    this.balance.total = total;

    return this.balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
