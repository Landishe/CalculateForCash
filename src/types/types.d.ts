export interface Users {
  id: number
  name: string
  password: string | number
  email: string
  cash: [nameCash: string, price: number]
}

interface ActiveWindow {
  active: boolean
  setActive: (active: boolean) => void
}

interface DataProps {
  priceAdd: (cost: number, category: string) => void
  categories: string[]
}

interface DataPropsAndActiveWindow extends ActiveWindow, DataProps {}

type FormData = Pick<Users, 'email' | 'password'>

interface Context {
  user: string
  setUser: (user: string) => void
}
export interface DatacostAndCategoryForUser{
  userId: string
  userName:string
  expenses: {
    id: number,
    category: string,
    cost: number
  }
}

type Categories = string[]

export interface costAndCategory {
  id: number
  category: string
  cost: number
}
