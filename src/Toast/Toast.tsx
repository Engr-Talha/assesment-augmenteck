// src/components/Toast/Toast.tsx
import React from 'react';
import styled from '@emotion/styled';

const ToastContainer = styled.div<{ type: 'success' | 'error' | 'warning'}>`
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  background-color: ${({ type }) => 
    type === 'success' ? '#10B981' : 
    type === 'error' ? '#EF4444' : 
    '#F59E0B'
  };
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <ToastContainer type={type}>
      {message}
    </ToastContainer>
  );
};