import { HttpStatus, Injectable } from '@nestjs/common';
import { Logger } from '@us-epa-camd/easey-common/logger';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';

import { LoggingException } from '@us-epa-camd/easey-common/exceptions';
import {
  excludableColumnHeader,
  fieldMappingHeader,
  fieldMappings,
} from '../constants/field-mappings';
import { AllowanceTransactionsDTO } from '../dto/allowance-transactions.dto';
import { PaginatedAllowanceTransactionsParamsDTO } from '../dto/allowance-transactions.params.dto';
import { ApplicableAllowanceTransactionsAttributesDTO } from '../dto/applicable-allowance-transactions-attributes.dto';
import { ApplicableAllowanceTransactionsAttributesParamsDTO } from '../dto/applicable-allowance-transactions-attributes.params.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { TransactionBlockDim } from '../entities/transaction-block-dim.entity';
import { AllowanceTransactionsMap } from '../maps/allowance-transactions.map';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { TransactionBlockDimRepository } from './transaction-block-dim.repository';
import { TransactionOwnerDimRepository } from './transaction-owner-dim.repository';

@Injectable()
export class AllowanceTransactionsService {
  constructor(
    private readonly transactionBlockDimRepository: TransactionBlockDimRepository,
    private readonly allowanceTransactionsMap: AllowanceTransactionsMap,
    private readonly transactionOwnerDimRepository: TransactionOwnerDimRepository,
    private readonly ownerOperatorsMap: OwnerOperatorsMap,
    private readonly logger: Logger,
  ) {}

  async getAllowanceTransactions(
    paginatedAllowanceTransactionsParamsDTO: PaginatedAllowanceTransactionsParamsDTO,
    req: Request,
  ): Promise<AllowanceTransactionsDTO[]> {
    this.logger.info('Getting allowance transactions');
    let entities: TransactionBlockDim[];
    try {
      entities = await this.transactionBlockDimRepository.getAllowanceTransactions(
        paginatedAllowanceTransactionsParamsDTO,
        req,
      );
    } catch (e) {
      throw new LoggingException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    req.res.setHeader(
      fieldMappingHeader,
      JSON.stringify(fieldMappings.allowances.transactions.data),
    );
    req.res.setHeader(
      excludableColumnHeader,
      JSON.stringify(fieldMappings.allowances.transactions.excludableColumns),
    );
    this.logger.info('Got allowance transactions');
    return this.allowanceTransactionsMap.many(entities);
  }

  async getAllOwnerOperators(): Promise<OwnerOperatorsDTO[]> {
    const query = await this.transactionOwnerDimRepository.getAllOwnerOperators();
    return this.ownerOperatorsMap.many(query);
  }

  async getAllApplicableAllowanceTransactionsAttributes(
    applicableAllowanceTransactionsAttributesParamsDTO: ApplicableAllowanceTransactionsAttributesParamsDTO,
  ): Promise<ApplicableAllowanceTransactionsAttributesDTO[]> {
    let query;
    try {
      query = await this.transactionBlockDimRepository.getAllApplicableAllowanceTransactionsAttributes(
        applicableAllowanceTransactionsAttributesParamsDTO,
      );
    } catch (e) {
      throw new LoggingException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return query.map(item => {
      const data = plainToClass(
        ApplicableAllowanceTransactionsAttributesDTO,
        item,
        {
          enableImplicitConversion: true,
        },
      );
      const transactionDate = new Date(data.transactionDate);
      data.transactionDate = transactionDate.toISOString().split('T')[0];
      return data;
    });
  }
}
