import './modal.css'
import styles from './MainPage.module.css'

import { useState } from 'react'
import { ActiveWindow, Users } from '../../types/types'
import { ChangeEvent } from 'react'
import { Registration } from '../../api/Registration'

type FormData = Pick<Users, 'email' | 'password' | 'name'>

export function RegWindow({ active, setActive }: ActiveWindow) {
  // работа с инпутом регистрации
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState<null>(null)
  const [registrationResponse, setRegistrationResponse] = useState<null>(null)

  function handleInputChange(e: ChangeEvent<HTMLInputElement>, name: string) {
    setFormData({ ...formData, [name]: e.target.value })
    console.log(formData)
  }

  const regData = async () => {
    console.log('regData тут работает')
    console.log(formData)
    try {
      const resultReg = await Registration(
        formData.email,
        formData.name,
        formData.password
      )
      console.log('Success:', resultReg)
    } catch (error) {
      console.error('Error:', error)
      setError(error)
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
          {registrationResponse && (
            <pre>
              <code>{JSON.stringify(registrationResponse.userName)}</code>
            </pre>
          )}
          <form
            className={'RegModalFlex'}
            onSubmit={(e) => {
              e.preventDefault()
              regData()
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
