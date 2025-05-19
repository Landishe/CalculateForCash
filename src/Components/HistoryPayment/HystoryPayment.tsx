import { CategoryWindow } from './CategoryWimdow.tsx'
import styles from './HystoryPayment.module.css'
import { useState } from 'react'
import { costAndCategory } from '../../types/types'
import { CostAndCategory } from '../../Context/MyContext.tsx'

export function HistoryPaymant() {
  const [costAndCategory, setCostAndCategory] = useState<costAndCategory[]>([
    {
      id: Date.now(),
      cost: 0,
      name: '',
    },
  ])

  // колбек на получение категории и стоимости
  const priceAdd = (cost: number, name: string) => {
    // сохранение состояние категории и стоимости
    setCostAndCategory((prevState) => [
      ...prevState,
      {
        id: Date.now(),
        cost: cost,
        name: name,
      },
    ])
  }

 
  return (
    <CostAndCategory.Provider value={{ costAndCategory }}>
      <div className={styles.hystoryPayment}>
        {'История платежей'}
        <div className={styles.information}>
          <div>{'Название каттегории'}</div>
          <CategoryWindow priceAdd={priceAdd} />
        </div>
        <div className={styles.hystory}>
          <ul className={styles.namesCost}>
            {costAndCategory &&
              costAndCategory.map((categoryName) => (
                <li key={categoryName.id}>{categoryName.name}</li>
              ))}
          </ul>
          <ul className={styles.costNum}>
            {costAndCategory &&
              costAndCategory.map(
                (costCategory) =>
                  costCategory.cost !== 0 && (
                    <li key={costCategory.id}>{costCategory.cost}</li>
                  )
              )}
          </ul>
        </div>
      </div>
    </CostAndCategory.Provider>
  )
}
