import { ApiConfigService } from './api-config.service';

export class ErrorMessages {
  public static AccountCharacteristics(
    plural: boolean,
    parameter: string,
  ): string {
    const grammar = plural
      ? `One or more ${parameter}s are`
      : `The ${parameter} is`;
    const referList =
      parameter === 'state'
        ? 'Use the two letter postal abbreviation (use TX, not Texas)'
        : `Refer to the list of available ${parameter}s for valid values`;

    if (parameter === 'state') {
      return `${grammar} not valid. ${referList}`;
    }

    return `${grammar} not valid. ${referList} ${ErrorMessages.ApiConfigLink(
      parameter,
    )}`;
  }

  public static YearRange(parameter: string, minYear: string) {
    return `Update one or more ${parameter}s to a year greater than or equal to ${minYear}`;
  }

  public static DateFormat(parameter: string, format: string) {
    return `One or more ${parameter}s are not in the ${format} format. Ensure all ${parameter}s are in the ${format} format`;
  }

  static ApiConfigLink(parameter: string) {
    const mdm = `${ApiConfigService.getMdm()}`;

    switch (parameter) {
      case 'orisCode':
        return `${ApiConfigService.getFacApi()}facilities`;
      case 'accountType':
        return `${mdm}account-types`;
      case 'accountNumber':
        return `${ApiConfigService.getAcctApi()}accounts`;
      default:
        return `${mdm}${parameter}s`;
    }
  }
}
