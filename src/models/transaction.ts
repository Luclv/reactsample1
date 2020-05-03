export interface TransactionModel {
    id: number;
    subject: string;
    requestedDate: Date;
    latestUpdate: Date;
    status: string;
  }