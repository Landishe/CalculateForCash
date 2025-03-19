import './modal.css'
import styles from './MainPage.module.css'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { ActiveWindow, Users } from '../../types/types'
import { ChangeEvent } from 'react'

type FormData = Pick<Users, 'email' | 'password' | 'name'>

export function RegWindow({ active, setActive }: ActiveWindow) {
  // работа с инпутом регистрации
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
  })
  const [message, setMessage] = useState('')
  const [token, setToken] = useState<null>(null) // Для хранения токена
  const [error, setError] = useState<null>(null)
  const [registrationResponse, setRegistrationResponse] = useState<null>(null)

  function handleInputChange(e: ChangeEvent<HTMLInputElement>, name: string) {
    setFormData({ ...formData, [name]: e.target.value })
    console.log(formData)
  }

  // отправка пользователя на бэк сервер

  const registration = async () => {
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
            name: formData.name,
            email: formData.email,
            password: formData.password,
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

      console.log('Результат регистрации:', data) // Вывод JSON в консоль после регистрации
      setMessage('Успешная регистрация!')
      setRegistrationResponse(data) // Сохраняем ответ для возможного отображения
      await login()
    } catch (error: unknown) {
      setMessage(`Ошибка регистрации: ${error.message}`)
      setError(error) // Сохраняем ошибку для отображения
    }
  }

  const login = async () => {
    try {
      const response = await fetch(
        'http://185.255.133.251:8051/api/users/login',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      )
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'ошибка авторизации')
      }
      const data = await response.json()
      console.log('Результат авторизации:', data.userName)

      if (data.token) {
        Cookies.set('auth_token', data.token, {
          secure: true,
          sameSite: 'Strict',
          expires: 1,
        })
      }

      setToken(data.token)
      setMessage('Успешная авторизация!')
      console.log(data)
    } catch (error) {
      setMessage(`Ошибка авторизации: ${error.message}`)
      setError(error) // Сохраняем ошибку для отображения
    }
  }

  return (
    <>
      <div
        className={active ? 'modal2 active' : 'modal2'}
        onClick={() => setActive(false)}
      >
        <div
          className={active ? 'modalWindow2 active' : 'modalWindow'}
          onClick={(e) => e.stopPropagation()}
        >
          {message && <p>{message}</p>}
          {error && <p style={{ color: 'red' }}>{error.message}</p>}{' '}
          {/* Отображение ошибки */}
          {/* {token && <p>Вы авторизованы! Токен: {token.userName}</p>} */}
          {registrationResponse && (
            <pre>
              <code>{JSON.stringify(registrationResponse.userName)}</code>
            </pre>
          )}
          <form
            className={'RegModalFlex'}
            onSubmit={(e) => {
              e.preventDefault()
              registration()
            }}
          >
            <label> Введите Имя </label>
            <input
              type='text'
              value={formData.name}
              onChange={(e) => handleInputChange(e, 'name')}
            />

            <label> Введите Почту </label>
            <input
              type='text'
              value={formData.email}
              onChange={(e) => handleInputChange(e, 'email')}
            />
            <label> Введите Пароль </label>
            <input
              type='text'
              value={formData.password}
              onChange={(e) => handleInputChange(e, 'password')}
            />

            <input
              className={styles.buttonSub}
              type='submit'
              value='Зарегестрироваться'
            />
          </form>
        </div>
      </div>
    </>
  )
}
// 123456@123456.ru 123456
