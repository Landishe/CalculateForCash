import { Login } from './Login'
import Cookies from 'js-cookie'

export async function Registration(
  email: string,
  name: string,
  password: string | number
) {
  try {
    const response = await fetch(
      'http://185.255.133.251:8051/api/users/register',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      }
    )
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `HTTP ошибка! status: ${response.status}`
      )
    }
    const data = await response.json()

    if (data.token) {
      Cookies.set('auth_token', data.token, {
        secure: true,
        sameSite: 'Strict',
        expires: 1,
      })
    }

    await Login(email, password)
    return { ...data, message: `успешная регистрация${data.user}` }
  } catch (error: unknown) {
    throw new Error(`Ошибка авторизации: ${error}`)
  }
}
