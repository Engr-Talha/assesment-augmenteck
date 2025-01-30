import styled from '@emotion/styled';
import { theme } from '../../styles/theme';
import { css } from '@emotion/react';
export const FormContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    max-width: 800px;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1.5rem;
  }
`;

export const Form = styled.form`
  padding: 2rem;
  border-radius: ${theme.borderRadius.medium};
  border: 1px solid #D0D5DD;
  background: #FFFFFF;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;
export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${theme.colors.darkBlue};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const InputGrid = styled.div`
  display: grid;
  gap: 24px;

  &.two-columns {
    grid-template-columns: repeat(2, 1fr);
  }

  &.three-columns {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;





export const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${theme.colors.grayLight};
  border-radius: ${theme.borderRadius.small};
  font-size: 0.875rem;
  background-color: ${theme.colors.white};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

// export const ItemsList = styled.div`
//   margin-top: 2rem;
// `;

// export const ItemRow = styled.div`
//   display: grid;
//   grid-template-columns: 2fr 1fr 1fr 1fr auto;
//   gap: 1rem;
//   align-items: center;
//   margin-bottom: 1rem;
// `;






export  const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
  height: 48px;
  padding: 0 24px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s;

  ${props => props.variant === 'primary' && css`
    background: #7C5DFA;
    color: white;
    &:hover {
      background: #9277FF;
    }
  `}

  ${props => props.variant === 'secondary' && css`
    background: #F8F8FB;
    color: #7E88C3;
    &:hover {
      background: #DFE3FA;
    }
  `}
`;

export const Label = styled.label`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #344054; // Using the hex color from the image
`;


export const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: ${theme.spacing.input.padding};
  border: 1px solid ${theme.colors.grayLight};
  border-radius: ${theme.borderRadius.small};
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${theme.colors.darkBlue};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.grayText};
  }

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;
export const FormSection = styled.section`
  margin-bottom: 30px;

  h2 {
    font-family: 'Inter', sans-serif;
    font-size: 24px;
    font-weight: 600;
    line-height: 38px;
    color: #101828;
    margin-bottom: 5px;
  }
`;


export const PreviewTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 38px;
  color: #101828;
  margin-bottom: 24px;
`;


export  const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

export  const HeaderLeft = styled.div`
  h1 {
    font-size: 24px;
    font-weight: 700;
    color: #0C0E16;
    margin-bottom: 4px;
  }
  
  p {
    font-size: 14px;
    color: #888EB0;
  }
`;

export  const HeaderButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;
export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(600px, 1fr) 420px;
  gap: 40px;
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    max-width: 800px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;


export const ItemsTable = styled.div`
  display: grid;
  gap: 16px;
`;



  
  export const ItemsList = styled.div`
    margin-top: 32px;
  `;
  
  export const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 0.7fr 1fr 1fr 40px;
  gap: 16px;
  align-items: center; // Changed to center for vertical alignment
`;
export const TotalInput = styled(Input)`
  background-color: ${theme.colors.lightBg};
  cursor: not-allowed;
  color: ${theme.colors.darkBlue};
  
  &:disabled {
    opacity: 1;
    -webkit-text-fill-color: ${theme.colors.darkBlue};
  }
`;

  
export const DeleteButton = styled.button`
width: 40px;
height: 40px;
display: flex;
align-items: center;
justify-content: center;
border: none;
background: transparent;
color: #888EB0;
cursor: pointer;
padding: 0;
margin: 0;
align-self: center; // This ensures vertical centering
`;

  export const AddItemButton = styled.button`
    width: 100%;
    height: 48px;
    background: #7C5DFA;
    color: white;
    border: none;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 15px;
    line-height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    margin-top: 24px;
  
    &:hover {
      background: #9277FF;
    }
  
    svg {
      width: 16px;
      height: 16px;
    }
  `;
  