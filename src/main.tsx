import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './core/theme'
import { Toggle } from './components/Toggle'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <ThemeProvider theme={defaultTheme}>
        <App />
        <Toggle />
      </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
