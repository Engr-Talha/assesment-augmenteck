import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../../styles/theme';
import { InvoiceFormData, InvoiceItem } from '../../types/invoice';
interface PreviewProps {
    data: InvoiceFormData;
}

const PreviewContainer = styled.div`
  background: ${theme.colors.white};
  padding: 32px;
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.main};
  position: sticky;
  top: 32px;
`;

const PreviewHeader = styled.div`
  margin-bottom: 32px;
`;

const PreviewTitle = styled.h2`
  color: ${theme.colors.darkBlue};
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
`;

const InfoItem = styled.div`
  margin-bottom: 8px;
`;

const InfoLabel = styled.div`
font-family: Inter;
font-size: 16px;
font-weight: 400;
line-height: 38px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #76787D;


`;

const InfoValue = styled.div`
font-family: Inter;
font-size: 16px;
font-weight: 500;
line-height: 38px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;

`;

const ItemsTable = styled.div`
  margin-top: 32px;
  border-radius: ${theme.borderRadius.small};
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 16px;
  padding: 16px 32px;
  color: ${theme.colors.grayText};
  font-size: 12px;
  background: ${theme.colors.lightBg};
`;

const TableBody = styled.div`
  padding: 32px;

  border-bottom: 1px solid ${theme.colors.grayLight};
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 16px;
  padding: 8px 0;
  color: ${theme.colors.darkBlue};
  font-size: 14px;

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const TotalSection = styled.div`
  padding: 32px;
  background: white;
`;

const TotalInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

const TotalRow = styled.div`
  display: grid;
  grid-template-columns: 100px 100px;
  gap: 16px;
  align-items: center;
`;

const TotalLabel = styled.div`
  color: ${theme.colors.grayText};
  font-size: 14px;
  text-align: left;
`;

const TotalValue = styled.div`
  color: ${theme.colors.darkBlue};
  font-size: 14px;
  font-weight: 500;
  text-align: right;
`;

export const InvoicePreview: React.FC<PreviewProps> = ({ data }) => {

    const calculateItemTotal = (quantity: number, price: number): number =>
        Number(quantity) * Number(price);
    const calculateSubtotal = (): number => {
        return data.items.reduce((sum: number, item: InvoiceItem) =>
            sum + calculateItemTotal(item.quantity, item.price), 0
        );
    };


    const calculateTax = (): number => calculateSubtotal() * 0.1;
    const calculateTotal = (): number => calculateSubtotal() + calculateTax();


    if (!data?.billFrom) {
        return <div>Loading preview...</div>;
    }
    return (
        <PreviewContainer>
            <PreviewHeader>
                <PreviewTitle>New Invoice</PreviewTitle>
            </PreviewHeader>

            <InfoGrid>
                <InfoItem>
                    <InfoLabel>Invoice Date</InfoLabel>
                    <InfoValue>{data.invoiceDate}</InfoValue>
                </InfoItem>
                <InfoItem>
                    <InfoLabel>Payment Terms</InfoLabel>
                    <InfoValue>{data.paymentTerms}</InfoValue>
                </InfoItem>
            </InfoGrid>

            <InfoGrid>
                <InfoItem>
                    <InfoLabel>Billed From</InfoLabel>
                    <InfoValue>{data.billFrom.companyName}</InfoValue>
                    <InfoValue>{data.billFrom.companyEmail}</InfoValue>
                    <InfoValue>{data.billFrom.streetAddress}</InfoValue>
                    <InfoValue>{data.billFrom.city}, {data.billFrom.postalCode} </InfoValue>


                </InfoItem>
                <InfoItem>
                    <InfoLabel>Billed To</InfoLabel>
                    <InfoValue>{data.billTo.clientName}</InfoValue>
                    <InfoValue>{data.billTo.clientEmail}</InfoValue>
                    <InfoValue>{data.billTo.streetAddress}</InfoValue>
                    <InfoValue>{data.billTo.city}, {data.billTo.postalCode} </InfoValue>
                </InfoItem>
            </InfoGrid>

            <InfoItem>
                <InfoLabel>Project Description</InfoLabel>
                <InfoValue>{data.projectDescription}</InfoValue>
            </InfoItem>

            <ItemsTable>
                <TableHeader>
                    <div>Item</div>
                    <div>QTY.</div>
                    <div>Price</div>
                    <div>Total Amount</div>
                </TableHeader>

                <TableBody>
                    {data.items.map((item: InvoiceItem, index: number) => (
                        <TableRow key={index}>
                            <div>{item.itemName}</div>
                            <div>{item.quantity}</div>
                            <div>$ {Number(item.price).toFixed(2)}</div>
                            <div>$ {calculateItemTotal(item.quantity, Number(item.price)).toFixed(2)}</div>
                        </TableRow>
                    ))}
                </TableBody>

                <TotalSection>
                    <TotalInfo>
                        <TotalRow>
                            <TotalLabel>Subtotal</TotalLabel>
                            <TotalValue>$ {calculateSubtotal().toFixed(2)}</TotalValue>
                        </TotalRow>
                        <TotalRow>
                            <TotalLabel>Tax</TotalLabel>
                            <TotalValue>10%</TotalValue>
                        </TotalRow>
                        <TotalRow>
                            <TotalLabel>Total</TotalLabel>
                            <TotalValue>$ {calculateTotal().toFixed(2)}</TotalValue>
                        </TotalRow>
                    </TotalInfo>
                </TotalSection>


            </ItemsTable>
        </PreviewContainer>
    );
};