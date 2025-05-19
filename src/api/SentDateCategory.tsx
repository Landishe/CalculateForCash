import Cookies from 'js-cookie'
import { dataExpenses } from '../types/types'


export async function SentDateCategory(data: dataExpenses, data2:dataExpenses) {
  const token = Cookies.get('auth_token')
  console.log(token)
  console.log(data)
  try {
    const requestData = data2 || data;

    const response = await fetch(
      `http://185.255.133.251:8051/api/balance/addNewItem`,
      {
        method: 'POST',
        // credentials: 'include',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      }
    )
    const responseData = await response.json()
    console.log('Полный ответ сервера:', responseData)
    if (!response.ok) {
      console.log('Сообщение об ошибке:', responseData.message)
      throw new Error('Данные не отправились')
    }

    console.log(responseData)
    
    return responseData
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
