export class AllowanceComplianceDTO {
  programCodeInfo: string;
  year: number;
  accountNumber: string;
  accountName: string;
  facilityName: string;
  facilityId: number;
  unitsAffected: string;
  allocated: number;
  bankedHeld: number;
  currentHeld: number;
  totalAllowancesHeld: number;
  complianceYearEmissions: number;
  otherDeductions: number;
  totalRequiredDeductions: number;
  currentDeductions: number;
  deductOneToOne: number;
  deductTwoToOne: number;
  totalAllowancesDeducted: number;
  carriedOver: number;
  excessEmissions: number;
  ownerOperator: string;
  state: string;
}
