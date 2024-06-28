import React from 'react';
import ReactDOM from 'react-dom/client';
import {ChakraProvider} from '@chakra-ui/react';
import {configureAxios} from './axiosConfiguration';

import App from './app/App';
import theme from './theme';
import './theme/index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
configureAxios();
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <App/>
    </ChakraProvider>
  </React.StrictMode>,
);
