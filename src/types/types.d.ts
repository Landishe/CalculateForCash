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
  priceAdd: (cost: number, name: string) => void
}

interface DataPropsAndActiveWindow extends ActiveWindow, DataProps {}

type FormData = Pick<Users, 'email' | 'password'>

interface UserName {
  userName: string
 
}

interface UsersContext {
  user: UserName
  setUser: Dispatch<SetStateAction<UserName>>;
}
export interface dataExpenses {
  category: string
  value: number
  date: string
  description: string
  operation_type: string
}

interface Categories {
  value: string
  name: string
}

export interface costAndCategory {
  id: number
  cost: number
  name: string
}
interface getExpensesDate {
  year: number
  month: number
  operation_type: string
}
interface Balance{
   balance_income: number;
  balance_expenses: number;
  balance_current: number;
}