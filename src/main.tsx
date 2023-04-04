import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './core/theme'
import { Provider } from 'react-redux'
import { store } from './redux/store/store'
import { Header } from './components/Header'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ChakraProvider>
      <ThemeProvider theme={defaultTheme}>
        <App />
        <Header />
      </ThemeProvider>
    </ChakraProvider>
  </Provider>,
)
