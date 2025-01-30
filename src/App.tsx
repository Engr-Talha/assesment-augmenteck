// src/App.tsx
import { InvoiceForm } from './components/Invoice/InvoiceForm';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { client } from './apollo/client';

import { theme } from './theme';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <div className="app-container">
          <InvoiceForm />
        </div>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;