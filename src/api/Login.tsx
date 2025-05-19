import Cookies from 'js-cookie'
import { GetMonthyTransaction } from './GetMonthyTransaction'

import { GetExpenses } from './GetExpenses';

export async function Login(email: string, password: string | number) {
  const date = new Date();
  const dateObject = {
    year: date.getFullYear(),
    month: date.getMonth() + 1, 
    operation_type: 'expenses',
  }
  
  try {
    const response = await fetch(
      'http://185.255.133.251:8051/api/users/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    )
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'ошибка авторизации')
    }

    const data = await response.json()

    // console.log('Результат авторизации:', data)

    if (data.token) {
      // console.log(data.token)
      Cookies.set('auth_token', data.token, {
        secure: false,
        sameSite: 'Lax',
        expires: 1,
      })
    }
    GetMonthyTransaction(dateObject)
    GetExpenses()
    return { ...data, message: `Успешная регистрация ${data.userName}` }
  } catch (error) {
    throw new Error(`Ошибка авторизации: ${error}`)
  }
}
