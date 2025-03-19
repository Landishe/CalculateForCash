import { CategoryWindow } from './CategoryWimdow.tsx'
import styles from './HystoryPayment.module.css'
import { useState } from 'react'
import { Categories, costAndCategory } from '../../types/types.d.ts'
import { CostAndCategory } from '../../Context/MyContext.tsx'

export function HistoryPaymant() {
  const [costAndCategory, setCostAndCategory] = useState<costAndCategory[]>([
    { id: 0, category: '', cost: 0 },
  ])

  // колбек на получение категории и стоимости
  const priceAdd = (cost: number, category: string) => {
    // сохранение состояние категории и стоимости
    setCostAndCategory((prevState) => [
      ...prevState,
      { id: Date.now(), category: category, cost: cost },
    ])
  }

  console.log(costAndCategory)

  //  массив для категорий
  const categories: Categories = [
    'Одежда',
    'Продукты',
    'Автомобиль',
    'КвартПлата',
    'Мобильная связь и интернет',
    'Вредные привычки',
    'Медецина',
    'Кафе и Рестораны',
    'Досуг',
    'Дети',
    'Спорт',
    'Домашние Животные',
    'Путешествия',
    'Образование',
    'Другое',
  ]

  return (
    <CostAndCategory.Provider value={{ costAndCategory }}>
      <div className={styles.hystoryPayment}>
        {'История платежей'}
        <div className={styles.information}>
          <div>{'Название каттегории'}</div>
          <CategoryWindow priceAdd={priceAdd} categories={categories} />
        </div>
        <div className={styles.hystory}>
          <ul className={styles.namesCost}>
            {costAndCategory &&
              costAndCategory.map((categoryName) => (
                <li key={categoryName.id}>{categoryName.category}</li>
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
