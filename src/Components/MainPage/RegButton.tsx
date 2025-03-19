import { useState } from 'react'
import styles from './MainPage.module.css'
import { RegWindow } from './RegWindow.tsx'


export function RegButton() {
  
  const[modalActive, setModalActive] = useState(false)


  return(
    <>
      <button className={styles.buttonSub} onClick={() => setModalActive(true)}>{'Регестрация нового пользователя'}</button>
      <RegWindow active={modalActive} setActive={setModalActive}/>
    </>
  )

}
