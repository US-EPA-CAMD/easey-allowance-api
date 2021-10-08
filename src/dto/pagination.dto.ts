import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-constants/lib';

export class PaginationDTO {
  @IsOptional()
  @ApiPropertyOptional({
    description: propertyMetadata.page.description,
  })
  page: number;

  @IsOptional()
  @ApiPropertyOptional({
    description: propertyMetadata.perPage.description,
  })
  perPage: number;
}
