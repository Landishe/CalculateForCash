
import Cookies from 'js-cookie'

export async function GetExpenses() {
  const token = Cookies.get('auth_token')
  
  try {
    const response = await fetch(
      `http://185.255.133.251:8051/api/balance/getBalance`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }
    )

    if (!response.ok) {
      throw new Error('Данные не отправились')
    }
    const result = await response.json()
    console.log(result)
    return result
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
