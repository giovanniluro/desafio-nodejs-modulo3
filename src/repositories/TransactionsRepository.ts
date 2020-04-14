import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return [...this.transactions];
  }

  public getBalance(): Balance {
    const incomeArray = this.all()
      .filter(transaction => transaction.type === 'income')
      .map(transaction => transaction.value);

    const outcomeArray = this.all()
      .filter(transaction => transaction.type === 'outcome')
      .map(transaction => transaction.value);

    let income = 0;
    let outcome = 0;
    if (incomeArray.length)
      income = incomeArray.reduce((acc, curr) => acc + curr);
    if (outcomeArray.length)
      outcome = outcomeArray.reduce((acc, curr) => acc + curr);

    return { income, outcome, total: income - outcome };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
