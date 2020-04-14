import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    if (
      this.transactionsRepository.getBalance().total < value &&
      type === 'outcome'
    )
      throw Error('Saldo insuficiente!');
    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
