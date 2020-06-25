import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import PermitOutcomeTransactoinService from './PermitOutcomeTransactionService';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw new Error(
        'Transaction not allowed, use type=income or type=outcome.',
      );
    }

    const transaction = new Transaction({ title, value, type });

    const permitOutcomeTransactoin = new PermitOutcomeTransactoinService(
      this.transactionsRepository,
    );

    if (!permitOutcomeTransactoin.execute(transaction)) {
      throw new Error('Insuficient balance.');
    }

    return this.transactionsRepository.create({
      title: transaction.title,
      value: transaction.value,
      type: transaction.type,
    });
  }
}

export default CreateTransactionService;
