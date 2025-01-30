// src/components/Layout/Header.tsx
import styled from '@emotion/styled'

const HeaderContainer = styled.header`
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`

const Title = styled.h1`
  color: #1E2139;
  font-size: 1.25rem;
  font-weight: 600;
`

export const Header = () => (
  <HeaderContainer>
    <Title>Invoice Generator</Title>
  </HeaderContainer>
)