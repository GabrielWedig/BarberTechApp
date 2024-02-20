import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { Home } from './pages'
import createStore from 'react-auth-kit/createStore'
import AuthProvider from 'react-auth-kit'
import { SnackbarProvider } from './hooks'

const App = () => {
  const store = createStore<{}>({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: false
  })

  return (
    <SnackbarProvider>
      <AuthProvider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
              {/* <Route index element={<Home />} /> */}
              {/* <Route path="*" element={<NoPage />} /> */}
              {/* <Route element={<AuthOutlet fallbackPath='/login' />}></Route> // Private route example*/}
            {/* </Route> */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </SnackbarProvider>
  )
}

const element = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(element)

root.render(<App />)
