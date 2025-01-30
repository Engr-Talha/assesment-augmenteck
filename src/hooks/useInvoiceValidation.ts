// src/hooks/useInvoiceValidation.ts
import { useForm } from 'react-hook-form';
import { InvoiceFormData, InvoiceTermsEnum } from '../types/invoice';

export const useInvoiceValidation = () => {
  return useForm<InvoiceFormData>({
    defaultValues: {
      invoiceDate: new Date().toISOString().split('T')[0],
      paymentTerms: InvoiceTermsEnum.NET_30_DAYS, // Use the enum value directly
      items: [{ itemName: '', quantity: 0, price: 0, total: 0 }]
    },
    mode: 'onBlur',
    resolver: (values) => {
      const errors: any = {};
      
      // Validate Bill From
      if (!values.billFrom?.companyName?.trim()) {
        errors.billFrom = { ...errors.billFrom, companyName: 'Company name is required' };
      }
      if (!values.billFrom?.companyEmail?.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
        errors.billFrom = { ...errors.billFrom, companyEmail: 'Valid email is required' };
      }

      // Validate Bill To
      if (!values.billTo?.clientName?.trim()) {
        errors.billTo = { ...errors.billTo, clientName: 'Client name is required' };
      }
      if (!values.billTo?.clientEmail?.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
        errors.billTo = { ...errors.billTo, clientEmail: 'Valid email is required' };
      }

      // Validate Items
      if (!values.items?.length) {
        errors.items = 'At least one item is required';
      } else {
        const itemsErrors = values.items.map(item => {
          const itemError: any = {};
          if (!item.itemName?.trim()) itemError.itemName = 'Item name is required';
          if (item.quantity <= 0) itemError.quantity = 'Quantity must be greater than 0';
          if (item.price <= 0) itemError.price = 'Price must be greater than 0';
          return Object.keys(itemError).length ? itemError : undefined;
        });
        if (itemsErrors.some(error => error)) {
          errors.items = itemsErrors;
        }
      }

      return {
        values,
        errors: Object.keys(errors).length ? errors : null
      };
    }
  });
};