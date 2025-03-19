import { createContext } from 'react'
import { Context,  } from '../types/types'

export const UserContext = createContext<Context>({
  user: '',
  setUser: () => {},
})

export const CostAndCategory = createContext<costAndCategory>({
  costAndCategory: [],
  
})
