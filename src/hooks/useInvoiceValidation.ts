import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InvoiceFormData, InvoiceTermsEnum, BillFrom, BillTo, InvoiceItem } from '../types/invoice';

// Define typed schema
const schema: yup.ObjectSchema<InvoiceFormData> = yup.object({
  billFrom: yup.object({
    companyName: yup.string().required('Company name is required'),
    companyEmail: yup.string().email('Invalid email').required('Email is required'),
    streetAddress: yup.string().required('Street address is required'),
    city: yup.string().required('City is required'),
    postalCode: yup.string().required('Postal code is required'),
    country: yup.string().required('Country is required')
  }) as yup.ObjectSchema<BillFrom>,

  billTo: yup.object({
    clientName: yup.string().required('Client name is required'),
    clientEmail: yup.string().email('Invalid email').required('Email is required'),
    streetAddress: yup.string().required('Street address is required'),
    city: yup.string().required('City is required'),
    postalCode: yup.string().required('Postal code is required'),
    country: yup.string().required('Country is required')
  }) as yup.ObjectSchema<BillTo>,

  invoiceDate: yup.string().required('Invoice date is required'),
  
  paymentTerms: yup.mixed<InvoiceTermsEnum>()
    .oneOf(Object.values(InvoiceTermsEnum))
    .required('Payment terms are required'),
  
  projectDescription: yup.string().required('Project description is required'),
  
  items: yup.array().of(
    yup.object({
      itemName: yup.string().required('Item name is required'),
      quantity: yup.number().required('Quantity is required').min(1, 'Quantity must be positive'),
      price: yup.number().required('Price is required').min(0, 'Price must be positive'),
      total: yup.number().required()
    }) as yup.ObjectSchema<InvoiceItem>
  ).required().min(1, 'At least one item is required')
}) as yup.ObjectSchema<InvoiceFormData>;

export const useInvoiceValidation = () => {
  return useForm<InvoiceFormData>({
    defaultValues: {
      billFrom: {
        companyName: '',
        companyEmail: '',
        streetAddress: '',
        city: '',
        postalCode: '',
        country: ''
      },
      billTo: {
        clientName: '',
        clientEmail: '',
        streetAddress: '',
        city: '',
        postalCode: '',
        country: ''
      },
      invoiceDate: new Date().toISOString().split('T')[0],
      paymentTerms: InvoiceTermsEnum.NET_30_DAYS,
      projectDescription: '',
      items: [{ 
        itemName: '', 
        quantity: 0, 
        price: 0, 
        total: 0 
      }]
    },
    resolver: yupResolver<InvoiceFormData>(schema),
    mode: 'onChange', // Change this from 'onBlur' to 'onChange'
    reValidateMode: 'onChange'  });
};