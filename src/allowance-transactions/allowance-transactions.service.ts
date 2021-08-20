import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';

import { fieldMappings } from '../constants/field-mappings';
import { TransactionBlockDimRepository } from './transaction-block-dim.repository';
import { TransactionOwnerDimRepository } from './transaction-owner-dim.repository';
import { AllowanceTransactionsMap } from '../maps/allowance-transactions.map';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { AllowanceTransactionsParamsDTO } from '../dto/allowance-transactions.params.dto';
import { AllowanceTransactionsDTO } from '../dto/allowance-transactions.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';

@Injectable()
export class AllowanceTransactionsService {
  constructor(
    @InjectRepository(TransactionBlockDimRepository)
    private readonly transactionBlockDimRepository: TransactionBlockDimRepository,
    private readonly allowanceTransactionsMap: AllowanceTransactionsMap,
    @InjectRepository(TransactionOwnerDimRepository)
    private readonly transactionOwnerDimRepository: TransactionOwnerDimRepository,
    private readonly ownerOperatorsMap: OwnerOperatorsMap,
  ) {}

  async getAllowanceTransactions(
    allowanceTransactionsParamsDTO: AllowanceTransactionsParamsDTO,
    req: Request,
  ): Promise<AllowanceTransactionsDTO[]> {
    const query = await this.transactionBlockDimRepository.getAllowanceTransactions(
      allowanceTransactionsParamsDTO,
      req,
    );

    req.res.setHeader(
      'X-Field-Mappings',
      JSON.stringify(fieldMappings.allowances.transactions),
    );

    return this.allowanceTransactionsMap.many(query);
  }

  async getAllOwnerOperators(): Promise<OwnerOperatorsDTO[]> {
    const query = await this.transactionOwnerDimRepository.getAllOwnerOperators();
    return this.ownerOperatorsMap.many(query);
  }
}
