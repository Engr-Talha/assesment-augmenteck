import styled from '@emotion/styled';
import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning';
  onClose: () => void;
}

const ToastContainer = styled.div<{ type: string }>`
  position: fixed;
  top: 24px;
  right: 24px;
  padding: 16px 24px;
  border-radius: 8px;
  background: ${({ type }) => 
    type === 'success' ? '#0E9F6E' :
    type === 'error' ? '#F05252' :
    '#F6AD55'};
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const ToastIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToastMessage = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
`;

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <ToastContainer type={type}>
      <ToastIcon>
        {type === 'success' && '✓'}
        {type === 'error' && '✕'}
        {type === 'warning' && '⚠'}
      </ToastIcon>
      <ToastMessage>{message}</ToastMessage>
    </ToastContainer>
  );
};