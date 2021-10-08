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

  public static SingleFormat(parameter: string, format: string) {
    return `Ensure that ${parameter} is in the ${format}.`;
  }

  public static MultipleFormat(parameter: string, format: string) {
    return `One or more ${parameter}s are not in the ${format} format. Ensure all ${parameter}s are in the ${format} format`;
  }

  public static DateRange(
    parameter: string,
    plural: boolean,
    validRange: string,
  ) {
    const grammar = plural
      ? `Update one or more ${parameter}s to`
      : `Update the ${parameter} to`;

    return `${grammar} ${validRange}`;
  }

  public static DateValidity() {
    return `The provided $property $value is not a valid date.`;
  }

  public static BeginEndDate(constraint: string) {
    return `Enter an $property that is greater than or equal to the ${constraint}`;
  }

  public static RequiredProperty() {
    return `$property should not be null or undefined`;
  }

  static ApiConfigLink(parameter: string) {
    const mdm = `${ApiConfigService.getMdm()}`;

    switch (parameter) {
      case 'facilityId':
        return `${ApiConfigService.getFacApi()}facilities`;
      case 'accountType':
        return `${mdm}account-types`;
      case 'accountNumber':
        return `${ApiConfigService.getAcctApi()}accounts`;
        case 'transactionType':
          return `${mdm}transaction-types`;
      default:
        return `${mdm}${parameter}s`;
    }
  }
}
