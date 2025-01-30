import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../../styles/theme';
import { InvoiceFormData, InvoiceItem } from '../../types/invoice';
import { border } from '@chakra-ui/react';
interface PreviewProps {
    data: InvoiceFormData;
}
const PreviewWrapper = styled.div`
  background: #F8F8FB;
  padding: 30px;
  border-radius: 16px;
  height: fit-content;
  position: relative;

  @media (max-width: 768px) {
    padding: 20px;
    margin: 0;
    width: 100%;
  }
`;

const PreviewContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 24px;
  max-width: 100%;
  overflow-y: auto;
  max-height: calc(100vh - 48px);
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px;
    position: static;
    max-height: none;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin: 15px 0;
`;

const InfoItem = styled.div`
  margin-bottom: 16px;
`;

const ItemsTable = styled.div`
  margin-top: 30px;
  border-radius: ${theme.borderRadius.small};
  background: #F8F8FB;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 20px;
  padding: 12px 24px;
  background: #F8F8FB;
  color: #7E88C3;
  font-size: 13px;
  font-weight: 600;
  border-bottom: 1px solid #EAECF0;
`;

const TableBody = styled.div`
  padding: 24px;
  background: white;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 20px;
  padding: 12px 0;
  color: ${theme.colors.darkBlue};
  font-size: 14px;
  word-wrap: break-word;
  
  & > div {
    min-width: 0;
    overflow-wrap: break-word;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #EAECF0;
  }
`;

const TotalSection = styled.div`
  padding: 20px 24px;
  background: white;
  border-top: 1px solid #EAECF0;
`;

const TotalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-left: auto;
  width: 100%;
  max-width: 280px;
`;

const TotalRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: center;
`;

const InfoLabel = styled.div`
  color: #76787D;
  font-size: 13px;
  line-height: 18px;
  margin-bottom: 6px;
  font-weight: 500;
`;

const InfoValue = styled.div`
  color: #0C0E16;
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
`;

const PreviewTitle = styled.h2`
  color: #0C0E16;
  font-size: 22px;
  font-weight: 700;
  line-height: 30px;
  margin-bottom: 24px;
`;

const Headingto = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #101828;
  margin-bottom: 12px;
`;

const HorizontalRule = styled.hr`
  border: none;
  border-top: 1px solid #EAECF0;
`;

const TotalLabel = styled.div`
  color: black;
  font-size: 13px;
  text-align:right
`;

const TotalValue = styled.div`
  color: black;
  font-size: 14px;
  font-weight: 700;
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
      <PreviewWrapper>


                <PreviewTitle>Preview</PreviewTitle>

        <PreviewContainer>
                <Headingto>New Invoice</Headingto>
                <HorizontalRule />


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
                <HorizontalRule />

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

        </PreviewWrapper>
    );
};