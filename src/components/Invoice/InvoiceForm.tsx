// src/components/Invoice/InvoiceForm.tsx
import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import dustBinLogo from '../../assets/icons8-dustbin-66.png'
import { useForm, useFieldArray } from 'react-hook-form';
import {
    FormContainer,
    Form,
    FormHeader,
    ButtonGroup,
    Button,
    FormSection,
    InputGrid,
    InputGroup,
    Label,
    Input,
    Select,
    ItemsList,
    ItemRow,
    DeleteButton,
    AddItemButton,
    Header,
    HeaderLeft,
    HeaderButtons,
    PageContainer,
    ContentGrid,
    ItemsTable,
    TotalInput,
    ItemsListTitle

} from './styles';
import { InvoiceFormData, InvoiceTermsEnum } from '../../types/invoice';
import { InvoicePreview } from './InvoicePreview';
import { calculateSubtotal, calculateTax, calculateTotal } from '../../utils/calculations';
import { useInvoiceValidation } from '../../hooks/useInvoiceValidation';
import { Toast } from '../../Toast/Toast';
import { InvoiceSuccessModal } from '../modal/InvoiceSuccessModal';

export const InvoiceForm = () => {
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);
    const { register, handleSubmit, control, watch, reset, formState: { errors }, trigger } = useInvoiceValidation();
    const { fields, append, remove } = useFieldArray({ control, name: 'items' });
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const previewRef = useRef<HTMLDivElement>(null);





    const formData = watch();

    const calculateItemTotal = (quantity: number, price: number): number => {
        return quantity * price;
    };

    const onSubmit = async (data: InvoiceFormData) => {
        try {
            // Check if there are any form errors
            if (Object.keys(errors).length > 0) {
                setToast({
                    message: 'Please fix all validation errors before submitting',
                    type: 'error'
                });
                return;
            }

            // Validation check for items
            if (fields.length === 0) {
                setToast({
                    message: 'Please add at least one item',
                    type: 'error'
                });
                return;
            }

            // Rest of your existing submit logic...
            setShowSuccessModal(true);

        } catch (error: unknown) {
            // ... existing error handling ...
        }
    };

    const handleSaveClick = async () => {
        // Trigger validation for all fields
        const result = await trigger();

        if (!result) {
            setToast({
                message: 'Please fix all validation errors before submitting',
                type: 'error'
            });
            return;
        }

        handleSubmit(onSubmit)();
    };





    return (
        <>

            <>
                <PageContainer>
                    <Header>
                        <HeaderLeft>
                            <h1>New Invoice</h1>
                            <p>Create new invoice for your customers</p>
                        </HeaderLeft>
                        <HeaderButtons>
                            <Button variant="secondary" type="button" onClick={() => reset()}>
                                Reset
                            </Button>
                            <Button variant="primary" type="submit" onClick={handleSaveClick}>
                                Save
                            </Button>
                        </HeaderButtons>
                    </Header>

                    <ContentGrid>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <FormSection>
                                <h2>Bill From</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <InputGroup>
                                        <Label>Company Name</Label>
                                        <Input
                                            {...register('billFrom.companyName')}
                                            placeholder="Enter company name"
                                        />
                                        {errors.billFrom?.companyName && (
                                            <span className="error">{errors.billFrom.companyName.message}</span>
                                        )}
                                    </InputGroup>

                                    <InputGroup>
                                        <Label>Company Email</Label>
                                        <Input
                                            type="email"
                                            {...register('billFrom.companyEmail')}
                                            placeholder="Enter company email"
                                        />
                                        {errors.billFrom?.companyEmail && (
                                            <span className="error">{errors.billFrom.companyEmail.message}</span>
                                        )}
                                    </InputGroup>

                                    <InputGroup>
                                        <Label>Country</Label>
                                        <Select {...register('billFrom.country')}>
                                            <option value="">Select Country</option>
                                            <option value="United States">United States</option>
                                        </Select>
                                        {errors.billFrom?.country && (
                                            <span className="error">{errors.billFrom.country.message}</span>
                                        )}
                                    </InputGroup>

                                    <InputGroup>
                                        <Label>City</Label>
                                        <Input
                                            {...register('billFrom.city')}
                                            placeholder="Enter city"
                                        />
                                        {errors.billFrom?.city && (
                                            <span className="error">{errors.billFrom.city.message}</span>
                                        )}
                                    </InputGroup>

                                    <InputGroup>
                                        <Label>Postal Code</Label>
                                        <Input
                                            {...register('billFrom.postalCode')}
                                            placeholder="Enter postal code"
                                        />
                                        {errors.billFrom?.postalCode && (
                                            <span className="error">{errors.billFrom.postalCode.message}</span>
                                        )}
                                    </InputGroup>

                                    <InputGroup>
                                        <Label>Street Address</Label>
                                        <Input
                                            {...register('billFrom.streetAddress')}
                                            placeholder="Enter street address"
                                        />
                                        {errors.billFrom?.streetAddress && (
                                            <span className="error">{errors.billFrom.streetAddress.message}</span>
                                        )}
                                    </InputGroup>
                                </div>
                            </FormSection>

                            <FormSection>
                                <h2>Bill To</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {/* First row - two columns */}
                                    <InputGrid className="two-columns">
                                        <InputGroup>
                                            <Label>Client's Name</Label>
                                            <Input
                                                {...register('billTo.clientName', { required: 'Client name is required' })}
                                                placeholder="Enter client name"
                                            />
                                            {errors.billTo?.clientName && (
                                                <span className="error">{errors.billTo.clientName.message}</span>
                                            )}
                                        </InputGroup>

                                        <InputGroup>
                                            <Label>Client's Email</Label>
                                            <Input
                                                type="email"
                                                {...register('billTo.clientEmail', {
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: 'Invalid email address'
                                                    }
                                                })}
                                                placeholder="Enter client email"
                                            />
                                            {errors.billTo?.clientEmail && (
                                                <span className="error">{errors.billTo.clientEmail.message}</span>
                                            )}
                                        </InputGroup>
                                    </InputGrid>

                                    {/* Second row - three columns */}
                                    <InputGrid className="three-columns">
                                        <InputGroup>
                                            <Label>Country</Label>
                                            <Select {...register('billTo.country', { required: 'Country is required' })}>
                                                <option value="">Select Country</option>
                                                <option value="United States">United States</option>
                                            </Select>
                                            {errors.billTo?.country && (
                                                <span className="error">{errors.billTo.country.message}</span>
                                            )}
                                        </InputGroup>

                                        <InputGroup>
                                            <Label>City</Label>
                                            <Input
                                                {...register('billTo.city', { required: 'City is required' })}
                                                placeholder="Enter city"
                                            />
                                            {errors.billTo?.city && (
                                                <span className="error">{errors.billTo.city.message}</span>
                                            )}
                                        </InputGroup>

                                        <InputGroup>
                                            <Label>Postal Code</Label>
                                            <Input
                                                {...register('billTo.postalCode', { required: 'Postal code is required' })}
                                                placeholder="Enter postal code"
                                            />
                                            {errors.billTo?.postalCode && (
                                                <span className="error">{errors.billTo.postalCode.message}</span>
                                            )}
                                        </InputGroup>
                                    </InputGrid>

                                    {/* Third row - full width */}
                                    <InputGroup>
                                        <Label>Street Address</Label>
                                        <Input
                                            {...register('billTo.streetAddress', { required: 'Street address is required' })}
                                            placeholder="Enter street address"
                                        />
                                        {errors.billTo?.streetAddress && (
                                            <span className="error">{errors.billTo.streetAddress.message}</span>
                                        )}
                                    </InputGroup>
                                </div>
                            </FormSection>

                            <FormSection>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {/* First row - two columns */}
                                    <InputGroup>
                                        <Label>Invoice Date</Label>
                                        <Input
                                            type="date"
                                            {...register('invoiceDate')}
                                        />
                                        {errors.invoiceDate && (
                                            <span className="error">{errors.invoiceDate.message}</span>
                                        )}
                                    </InputGroup>

                                    <InputGroup>
                                        <Label>Payment Terms</Label>
                                        <Select {...register('paymentTerms')}>
                                            <option value="NET_10_DAYS">Net 10 days</option>
                                            <option value="NET_20_DAYS">Net 20 days</option>
                                            <option value="NET_30_DAYS">Net 30 days</option>
                                        </Select>
                                        {errors.paymentTerms && (
                                            <span className="error">{errors.paymentTerms.message}</span>
                                        )}
                                    </InputGroup>

                                    <InputGroup>
                                        <Label>Project Description</Label>
                                        <Input
                                            {...register('projectDescription')}
                                            placeholder="Enter project description"
                                        />
                                        {errors.projectDescription && (
                                            <span className="error">{errors.projectDescription.message}</span>
                                        )}
                                    </InputGroup>
                                </div>
                            </FormSection>

                            <ItemsList>
                                <ItemsListTitle>Items List</ItemsListTitle>
                                {fields.map((field, index) => (
                                    <ItemRow key={field.id}>
                                        <InputGroup>
                                            <Label>Item Name</Label>
                                            <Input
                                                {...register(`items.${index}.itemName`)}
                                                placeholder="Enter item name"
                                            />
                                            {errors.items?.[index]?.itemName && (
                                                <span className="error">{errors.items[index].itemName?.message}</span>
                                            )}
                                        </InputGroup>

                                        <InputGroup>
                                            <Label>Qty.</Label>
                                            <Input
                                                type="number"
                                                {...register(`items.${index}.quantity`)}
                                                placeholder="0"
                                            />
                                            {errors.items?.[index]?.quantity && (
                                                <span className="error">{errors.items[index].quantity?.message}</span>
                                            )}
                                        </InputGroup>

                                        <InputGroup>
                                            <Label>Price</Label>
                                            <Input
                                                type="number"
                                                {...register(`items.${index}.price`)}
                                                placeholder="0"
                                            />
                                            {errors.items?.[index]?.price && (
                                                <span className="error">{errors.items[index].price?.message}</span>
                                            )}
                                        </InputGroup>

                                        <InputGroup>
                                            <Label>Total</Label>
                                            <TotalInput
                                                type="text"
                                                value={`$${calculateItemTotal(
                                                    watch(`items.${index}.quantity`) || 0,
                                                    watch(`items.${index}.price`) || 0
                                                ).toFixed(2)}`}
                                                disabled
                                            />
                                        </InputGroup>
                                    </ItemRow>
                                ))}

                                <AddItemButton
                                    type="button"
                                    onClick={() => append({ itemName: '', quantity: 0, price: 0, total: 0 })}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 0V16M0 8H16" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                    Add New Item
                                </AddItemButton>
                            </ItemsList>
                        </Form>
                        <InvoicePreview data={formData} />
                    </ContentGrid>
                </PageContainer>
                {showSuccessModal && (
        <InvoiceSuccessModal
          onClose={() => setShowSuccessModal(false)}
          invoiceData={formData}
          previewRef={previewRef}
        />
      )}

            </>






            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </>

    );
};

export const DeleteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33334 14.6667C3.33334 15.4 3.93334 16 4.66668 16H11.3333C12.0667 16 12.6667 15.4 12.6667 14.6667V4H3.33334V14.6667ZM13.3333 1.33333H10.6667L9.99999 0.666667H6L5.33334 1.33333H2.66668V2.66667H13.3333V1.33333Z"
            fill="currentColor" />
    </svg>
);