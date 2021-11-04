import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';

import { BeginDate, EndDate } from '../utils/validator.const';

export class ApplicableAllowanceTransactionsAttributesParamsDTO {
  @ApiProperty({
    description: propertyMetadata.transactionBeginDate.description,
  })
  @BeginDate()
  transactionBeginDate: Date;

  @ApiProperty({
    description: propertyMetadata.transactionEndDate.description,
  })
  @EndDate()
  transactionEndDate: Date;
}
