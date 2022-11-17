import { ReactNode } from 'react'

import {AuthProvider} from "./auth"

interface ProviderProps {
  children: ReactNode
}

const Providers = ({ children }: ProviderProps) => {
  return <AuthProvider>{children}</AuthProvider>
}

export default Providers