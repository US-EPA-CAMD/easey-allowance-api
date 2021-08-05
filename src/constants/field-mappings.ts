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
  { ...allowanceFields.sellFacilityName },
  { ...allowanceFields.buyFacilityName },
  { ...allowanceFields.buyOwner },
  { ...allowanceFields.transactionId },
  { ...allowanceFields.sellFacilityId },
  { ...allowanceFields.buyAccountName },
  { ...allowanceFields.transactionDate },
  { ...allowanceFields.transactionTotal },
  { ...allowanceFields.sellState },
  { ...allowanceFields.buyAccountType },
  { ...allowanceFields.vintageYear },
  { ...allowanceFields.transactionType },
  { ...allowanceFields.sellEpaRegion },
  { ...allowanceFields.buyFacilityId },
  { ...allowanceFields.startBlock },
  { ...allowanceFields.sellAccountNumber },
  { ...allowanceFields.sellSourceCategory },
  { ...allowanceFields.buyState },
  { ...allowanceFields.endBlock },
  { ...allowanceFields.sellAccountName },
  { ...allowanceFields.sellOwner },
  { ...allowanceFields.buyEpaRegion },
  { ...allowanceFields.totalBlock },
  { ...allowanceFields.sellAccountType },
  { ...allowanceFields.buyAccountNumber },
  { ...allowanceFields.buySourceCategory },
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
