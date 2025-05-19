import Cookies from 'js-cookie'
import {getExpensesDate} from '../../src/types/types'

export async function GetMonthyTransaction(data: getExpensesDate) {
  const token = Cookies.get('auth_token')

  const queryData = new URLSearchParams(data).toString()
  try {
    const response = await fetch(
      `http://185.255.133.251:8051/api/balance/getMonthlyTransactions?${queryData}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      console.error(response.status)

      throw new Error('Данные не отправились')
    }
    const result = await response.json()
    console.log(result)
    return result
  } catch (error) {
    console.error('не работает строка 82:', error)
    throw error
  }
}
