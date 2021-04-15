import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    category,
    title,
    type,
    value,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const balance = await transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total < value) {
      throw new AppError("You don't have enough money to do this operation");
    }

    const categoriesRepository = getRepository(Category);

    let categoryExists = await categoriesRepository.findOne({
      where: {
        title: category,
      },
    });

    if (!categoryExists) {
      categoryExists = categoriesRepository.create({
        title: category,
      });

      await categoriesRepository.save(categoryExists);
    }

    const transaction = transactionsRepository.create({
      title,
      type,
      value,
      category_id: categoryExists.id,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
