import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';


@Injectable()
export class AllowanceService {
  constructor(private configService: ConfigService) {}

  getAllowanceHoldings(): string {
    return 'Hello allowanceHoldings';
  }

  getAllowanceTransactions(): string {
    return 'Hello allowanceTransactions';
  }
}
