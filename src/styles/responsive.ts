// src/styles/responsive.ts
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { theme } from './theme'; // Make sure to import theme

export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1440px'
};

export const FormContainer = styled.div`
  max-width: 1440px;
  margin: 2rem auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: ${breakpoints.laptop}) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin: 1rem auto;
    gap: 2rem;
  }
`;

export const InputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 0.7fr 1fr 1fr 40px;
  gap: 16px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

