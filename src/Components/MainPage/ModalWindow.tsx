import './modal.css'
import styles from './MainPage.module.css'
import Cookies from 'js-cookie'
import { RegButton } from './RegButton.js'
import { useState, useContext } from 'react'
import { FormData } from '../../types/types'
import { UserContext } from '../../Context/MyContext.js'
import { ActiveWindow } from '../../types/types'
import { ChangeEvent } from 'react'
import axios from 'axios'

export function ModalWindow({ active, setActive }: ActiveWindow) {
  const { user, setUser } = useContext(UserContext)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<null>(null)
  //
  const [registrationResponse, setRegistrationResponse] = useState(null)

  function handleInputChange(e: ChangeEvent<HTMLInputElement>, name: string) {
    setFormData({ ...formData, [name]: e.target.value })
  }

  const login = async () => {
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
            email: formData.email,
            password: formData.password,
          }),
        }
      )
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'ошибка авторизации')
      }
    
      // await axios
      //   .post(
      //     'http://185.255.133.251:8051/api/users/login',
      //     {
      //       email: formData.email,
      //       password: formData.password,
      //     },
      //     {
      //       withCredentials: true,
      //     }
      //   )
      //   .then((res) => {
      //     console.log(res)
      //   })

      console.log(response)
      console.log(response?.cookies)
      console.log(response?.token)
      const data = await response.json()

      console.log('Результат авторизации:', data)

      if (data.token) {
        console.log('Токен сохранен в куки:', Cookies.get('auth_token'))
        Cookies.set('auth_token', data.token, {
          secure: false,
          sameSite: 'Lax',
          expires: 1,
        })
      }
      setUser(data)
      setMessage('Успешная авторизация!')
    } catch (error) {
      setMessage(`Ошибка авторизации: ${error.message}`)
      setError(error) // Сохраняем ошибку для отображения
    }
  }

  return (
    <>
      <div
        className={active ? 'modal active' : 'modal'}
        onClick={() => setActive(false)}
      >
        <div
          className={active ? 'modalWindow active' : 'modalWindow'}
          onClick={(e) => e.stopPropagation()}
        >
          {registrationResponse && (
            <pre>
              <code>{JSON.stringify(registrationResponse.userName)}</code>
            </pre>
          )}
          <form
            className={'RegModalFlex'}
            onSubmit={(e) => {
              e.preventDefault()
              login()
            }}
          >
            <label> Введите Логин </label>
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
            <input className={styles.buttonSub} type='submit' value='Войти' />

            <button className={styles.buttonSub}>{'Забыли пароль'}</button>
          </form>
          <RegButton />
        </div>
      </div>
    </>
  )
}
