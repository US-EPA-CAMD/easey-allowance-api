import { AllowanceProgram } from '@us-epa-camd/easey-common/enums';

export function includesOtcNbp(params): boolean {
  const { programCodeInfo } = params;
  return (
    !programCodeInfo ||
    programCodeInfo.includes(AllowanceProgram.OTC) ||
    programCodeInfo.includes(AllowanceProgram.NBP)
  );
}
