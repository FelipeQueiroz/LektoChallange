import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './core/theme'
import { Toggle } from './components/Toggle'
import { Provider } from 'react-redux'
import { store } from './redux/store/store'
import { Contact } from './components/Contact'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ChakraProvider>
      <ThemeProvider theme={defaultTheme}>
        <App />
        <Contact />
        <Toggle />
      </ThemeProvider>
    </ChakraProvider>
  </Provider>,
)
