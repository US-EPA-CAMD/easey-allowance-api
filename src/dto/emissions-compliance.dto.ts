export class EmissionsComplianceDTO {
  year: number;
  facilityName: string;
  facilityId: number;
  unitId: string;
  ownerOperator: string;
  state: string;
  complianceApproach: string;
  avgPlanId: number;
  emissionsLimitDisplay: number;
  actualEmissionsRate: number;
  avgPlanActual: number;
  inCompliance: string;
}
