import './modal.css'
import styles from './MainPage.module.css'
import { RegButton } from './RegButton.js'
import { useState } from 'react'

export function ModalWindow({ active, setActive }) {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)
  const [registrationResponse, setRegistrationResponse] = useState(null);


  function handleInputChange(e, name) {
    setFormData({ ...formData, [name]: e.target.value })
  }

  const login = async (email, password) => {
    try {
      const response = await fetch('http://185.255.133.251:8051/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          `HTTP ошибка, регистрация не удалась: ${
            response.status
          }, ${JSON.stringify(errorData)}}`
        )

      }
      const data = await response.json();
      console.log('Результат авторизации:', data.userName)
      setToken(data.token); // Правильное использование setToken
      setMessage('Успешная авторизация!');
      
    } catch (error) {
      setMessage(`Ошибка авторизации: ${error.message}`);
      setError(error); // Сохраняем ошибку для отображения
    }
  };

  

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
            </pre>)}
          <form className={'RegModalFlex'} onSubmit={(e) => {e.preventDefault(); login()}}>
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
