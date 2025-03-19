import { ModalWindow } from './ModalWindow.tsx'
import { useState } from 'react'
import './modal.css'

export function AuthWindow() {
  const [modalActive, setModalActive] = useState(false)

  return (
    <div>
      <button className='btnAuth' onClick={() => setModalActive(true)}>
        {'Авторизация'}
      </button>
      <ModalWindow active={modalActive} setActive={setModalActive} />
    </div>
  )
}
