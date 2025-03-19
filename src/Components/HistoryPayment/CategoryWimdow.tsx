import { useState } from 'react'
import { CategoryChange } from './CategoryChange.tsx'
import './historyModal.css'
import styles from './HystoryPayment.module.css'
import { DataProps } from '../../types/types'


export function CategoryWindow({priceAdd, categories}: DataProps) {
  const [modalActive, setModalActive] = useState(false)

  return (
    <div>
      <button className={styles.btnAdd} onClick={() => setModalActive(true)}>
        {'+'}
      </button>
      <CategoryChange active={modalActive} setActive={setModalActive} priceAdd={priceAdd} categories={categories}/>
    </div>
  )
}
