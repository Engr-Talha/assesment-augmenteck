import React from 'react';
import styled from '@emotion/styled';
import { useReactToPrint } from 'react-to-print';
import { 
  FaPrint, 
  FaEnvelope, 
  FaFilePdf, 
  FaLink, 
  FaCopy, 
  FaBell 
} from 'react-icons/fa';
import  { useCallback } from 'react';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
`;

const SuccessHeader = styled.div`
  text-align: center;
  margin-bottom: 24px;

  h2 {
    font-size: 24px;
    color: #0C0E16;
    margin: 16px 0 8px;
  }

  p {
    color: #888EB0;
    font-size: 14px;
  }
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 24px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 1px solid #DFE3FA;
  border-radius: 8px;
  background: white;
  color: #0C0E16;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F8F8FB;
    border-color: #7C5DFA;
  }

  svg {
    color: #7C5DFA;
    font-size: 18px;
  }
`;

const CloseButton = styled.button`
  display: block;
  width: 100%;
  padding: 16px;
  margin-top: 24px;
  border: none;
  border-radius: 8px;
  background: #7C5DFA;
  color: white;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #9277FF;
  }
`;

interface InvoiceSuccessModalProps {
  onClose: () => void;
  invoiceData: any;
  previewRef: React.RefObject<HTMLDivElement>;
}

export const InvoiceSuccessModal: React.FC<InvoiceSuccessModalProps> = ({
  onClose,
  invoiceData,
  previewRef
}) => {
    const handlePrint = useReactToPrint({
        documentTitle: `Invoice-${Date.now().toString().slice(-6)}`,
        onAfterPrint: () => console.log('Printed successfully'),

    });
      
      const onPrintClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handlePrint();
      };
  const handleEmailInvoice = () => {
    // Dummy email function
    console.log('Email invoice to:', invoiceData.billTo.clientEmail);
  };

  const handleDownloadPDF = () => {
    // Dummy PDF download
    console.log('Downloading PDF...');
  };

  const handleShareLink = () => {
    // Generate dummy invoice link
    const dummyLink = `https://yourdomain.com/invoice/${Date.now()}`;
    navigator.clipboard.writeText(dummyLink);
    alert('Invoice link copied to clipboard!');
  };

  const handleDuplicate = () => {
    // Dummy duplicate function
    console.log('Duplicating invoice...');
  };

  const handleScheduleReminder = () => {
    // Dummy reminder function
    console.log('Scheduling payment reminder...');
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <SuccessHeader>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
          <h2>Invoice Created Successfully!</h2>
          <p>Invoice #{Date.now().toString().slice(-6)}</p>
        </SuccessHeader>

        <ActionGrid>
        <ActionButton onClick={onPrintClick}>
        <FaPrint />
            Print Invoice
          </ActionButton>
          
          <ActionButton onClick={handleEmailInvoice}>
            <FaEnvelope />
            Email Invoice
          </ActionButton>
          
          <ActionButton onClick={handleDownloadPDF}>
            <FaFilePdf />
            Download PDF
          </ActionButton>
          
          <ActionButton onClick={handleShareLink}>
            <FaLink />
            Share Link
          </ActionButton>
          
          <ActionButton onClick={handleDuplicate}>
            <FaCopy />
            Duplicate
          </ActionButton>
          
          <ActionButton onClick={handleScheduleReminder}>
            <FaBell />
            Set Reminder
          </ActionButton>
        </ActionGrid>

        <CloseButton onClick={onClose}>
          Close
        </CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};