import './modal.css'
import styles from './MainPage.module.css'
import { RegButton } from './RegButton.js'
import { useState } from 'react'
import { FormData } from '../../types/types'
import { useUserContext  } from '../../Context/MyContext.js'
import { ActiveWindow } from '../../types/types'
import { ChangeEvent } from 'react'
import { Login } from '../../api/Login'

export function ModalWindow({ active, setActive }: ActiveWindow) {
  const { setUser } = useUserContext()
  const [userName, setUserName] = useState<string>('')
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })

  function handleInputChange(e: ChangeEvent<HTMLInputElement>, name: string) {
    setFormData({ ...formData, [name]: e.target.value })
  }

  const handleSendData = async () => {
    try {
      const result = await Login(formData.email, formData.password)
      console.log('Success:', result)
      setUser({ userName: result.userName, userId: result.userId})
      setUserName(result.userName)
    } catch (error) {
      console.error('Error:', error)
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
          {userName && (
            <p style={{ backgroundColor: 'rgb(155, 248, 194)' }}>
              {`Добро пожаловать: ${userName}`}
            </p>
          )}
          <form
            className={'RegModalFlex'}
            onSubmit={(e) => {
              e.preventDefault()
              handleSendData()
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
