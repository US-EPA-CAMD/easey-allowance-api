import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { PaginationDTO } from './pagination.dto';
import { ActiveAllowanceProgram } from '../enum/active-allowance-program.enum';
import { State } from 'src/enum/state.enum';

export class AllowanceHoldingsParamsDTO extends PaginationDTO {
  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  vintageYear?: number[];

  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  accountNumber: string[];

  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  orisCode: number[];

  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  ownerOperator: string[];

  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  state: State[];

  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  program: ActiveAllowanceProgram[];
}
