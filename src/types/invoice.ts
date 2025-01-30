// src/types/invoice.ts

  export interface InvoiceItem {
    itemName: string;
    quantity: number;
    price: number;
    total: number;
  }
  
  export interface BillFrom {
    companyName: string;
    companyEmail: string;
    streetAddress: string;
    city: string;
    postalCode: string;
    country: string;
  }
  
  export interface BillTo {
    clientName: string;
    clientEmail: string;
    streetAddress: string;
    city: string;
    postalCode: string;
    country: string;
  }
  
  export interface InvoiceFormData {
    billFrom: BillFrom;
    billTo: BillTo;
    invoiceDate: string;
    paymentTerms: InvoiceTermsEnum;
    projectDescription: string;
    items: InvoiceItem[];
  }
  export enum InvoiceTermsEnum {
    NET_10_DAYS = 'NET_10_DAYS',
    NET_20_DAYS = 'NET_20_DAYS',
    NET_30_DAYS = 'NET_30_DAYS'
  }