import { createContext, useContext, useState } from 'react'

interface ContextProps {
  snackbar: SnackbarProps
  showSuccessSnackbar(message: string): void
  showErrorSnackbar(message: string): void
}

interface ProviderProps {
  children: React.ReactNode
}

interface SnackbarProps {
  type: SnackbarType
  open: boolean
  message: string
}

type SnackbarType = 'success' | 'error' | 'info' | 'warning'

export const SnackbarContext = createContext<ContextProps>({} as ContextProps)

export const SnackbarProvider = ({ children }: ProviderProps) => {
  const [snackbar, setSnackbar] = useState<SnackbarProps>({} as SnackbarProps)

  const showSuccessSnackbar = (message: string) => {
    setSnackbar({ type: 'success', message: message, open: true })
    delay()
  }

  const showErrorSnackbar = (message: string) => {
    setSnackbar({ type: 'error', message: message, open: true })
    delay()
  }

  const delay = () => {
    setTimeout(() => {
      setSnackbar((current) => ({ ...current, open: false }))
    }, 5000)
  }

  return (
    <SnackbarContext.Provider
      value={{
        snackbar,
        showSuccessSnackbar,
        showErrorSnackbar
      }}
    >
      {children}
    </SnackbarContext.Provider>
  )
}

export const useSnackbarContext = () => useContext(SnackbarContext)
