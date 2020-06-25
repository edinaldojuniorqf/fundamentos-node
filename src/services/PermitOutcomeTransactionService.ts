import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class PermitOutcomeTransactoinService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactinsRepository: TransactionsRepository) {
    this.transactionsRepository = transactinsRepository;
  }

  public execute(transaction: Transaction): boolean {
    if (transaction.type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();
      return transaction.value <= total;
    }

    return true;
  }
}

export default PermitOutcomeTransactoinService;
