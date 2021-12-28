import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
import { Logger } from '@us-epa-camd/easey-common/logger';
import { ApplicableAllowanceTransactionsAttributesDTO } from '../dto/applicable-allowance-transactions-attributes.dto';
import { ApplicableAllowanceTransactionsAttributesMap } from '../maps/applicable-allowance-transactions-attributtes.map';
import { ApplicableAllowanceTransactionsAttributesParamsDTO } from '../dto/applicable-allowance-transactions-attributes.params.dto';

@Injectable()
export class AllowanceTransactionsService {
  constructor(
    @InjectRepository(TransactionBlockDimRepository)
    private readonly transactionBlockDimRepository: TransactionBlockDimRepository,
    private readonly allowanceTransactionsMap: AllowanceTransactionsMap,
    @InjectRepository(TransactionOwnerDimRepository)
    private readonly transactionOwnerDimRepository: TransactionOwnerDimRepository,
    private readonly ownerOperatorsMap: OwnerOperatorsMap,
    private readonly applicableAllowanceTransactionsAttributesMap: ApplicableAllowanceTransactionsAttributesMap,
    private logger: Logger,
  ) {}

  async getAllowanceTransactions(
    allowanceTransactionsParamsDTO: AllowanceTransactionsParamsDTO,
    req: Request,
  ): Promise<AllowanceTransactionsDTO[]> {
    this.logger.info('Getting allowance transactions');
    let query;
    try {
      query = await this.transactionBlockDimRepository.getAllowanceTransactions(
        allowanceTransactionsParamsDTO,
        req,
      );
    } catch (e) {
      this.logger.error(InternalServerErrorException, e.message, true);
    }

    req.res.setHeader(
      'X-Field-Mappings',
      JSON.stringify(fieldMappings.allowances.transactions),
    );
    this.logger.info('Got allowance transactions');
    return this.allowanceTransactionsMap.many(query);
  }

  async getAllOwnerOperators(): Promise<OwnerOperatorsDTO[]> {
    this.logger.info('Getting all owner operators');
    let query;
    try {
      query = await this.transactionOwnerDimRepository.getAllOwnerOperators();
    } catch (e) {
      this.logger.error(InternalServerErrorException, e.message, true);
    }

    this.logger.info('Got all owner operators');

    return this.ownerOperatorsMap.many(query);
  }

  async getAllApplicableAllowanceTransactionsAttributes(
    applicableAllowanceTransactionsAttributesParamsDTO: ApplicableAllowanceTransactionsAttributesParamsDTO,
  ): Promise<ApplicableAllowanceTransactionsAttributesDTO[]> {
    this.logger.info('Getting all applicable allowance transaction attributes');

    let query;
    try {
      query = await this.transactionBlockDimRepository.getAllApplicableAllowanceTransactionsAttributes(
        applicableAllowanceTransactionsAttributesParamsDTO,
      );
    } catch (e) {
      this.logger.error(InternalServerErrorException, e.message, true);
    }

    this.logger.info('Got all applicable allowance transaction attributes');

    return this.applicableAllowanceTransactionsAttributesMap.many(query);
  }
}
