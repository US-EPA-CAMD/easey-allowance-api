import { allowanceFields } from './allowance-fields';

const holdings = [
  { ...allowanceFields.accountNumber },
  { ...allowanceFields.accountName },
  { ...allowanceFields.orisCode },
  { ...allowanceFields.prgCode },
  { ...allowanceFields.vintageYear },
  { ...allowanceFields.totalBlock },
  { ...allowanceFields.startBlock },
  { ...allowanceFields.endBlock },
  { ...allowanceFields.state },
  { ...allowanceFields.epaRegion },
  { ...allowanceFields.ownerOperator },
  { ...allowanceFields.accountType },
];

const transactions = [
  { ...allowanceFields.prgCode },
  { ...allowanceFields.transactionId },
  { ...allowanceFields.transactionTotal },
  { ...allowanceFields.transactionType },
  { ...allowanceFields.sellAccountNumber },
  { ...allowanceFields.sellAccountName },
  { ...allowanceFields.sellAccountType },
  { ...allowanceFields.sellFacilityName },
  { ...allowanceFields.sellFacilityId },
  { ...allowanceFields.sellState },
  { ...allowanceFields.sellEpaRegion },
  { ...allowanceFields.sellSourceCategory },
  { ...allowanceFields.sellOwner },
  { ...allowanceFields.buyAccountNumber },
  { ...allowanceFields.buyAccountName },
  { ...allowanceFields.buyAccountType },
  { ...allowanceFields.buyFacilityName },
  { ...allowanceFields.buyFacilityId },
  { ...allowanceFields.buyState },
  { ...allowanceFields.buyEpaRegion },
  { ...allowanceFields.buySourceCategory },
  { ...allowanceFields.buyOwner },
  { ...allowanceFields.transactionDate },
  { ...allowanceFields.vintageYear },
  { ...allowanceFields.startBlock },
  { ...allowanceFields.endBlock },
  { ...allowanceFields.totalBlock },
];

const accountInfo = [
  { ...allowanceFields.accountNumber },
  { ...allowanceFields.accountName },
  { ...allowanceFields.prgCode },
  { ...allowanceFields.accountType },
  { ...allowanceFields.orisCode },
  { ...allowanceFields.unitId },
  { ...allowanceFields.owner },
  { ...allowanceFields.operator },
  { ...allowanceFields.state },
  { ...allowanceFields.epaRegion },
  { ...allowanceFields.nercRegion },
];

export const fieldMappings = {
  allowances: {
    holdings: holdings,
    transactions: transactions,
    accountInfo: accountInfo,
  },
};
