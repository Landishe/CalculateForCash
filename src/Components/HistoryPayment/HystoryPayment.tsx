import { CategoryWidow } from './CategoryWimdow.tsx'
import styles from './HystoryPayment.module.css'
import { useState } from 'react'

type Categories = string[]
interface costAndCategory {
    category: string
    cost: number
}
export function HistoryPaymant() {

  const [costAndCategory, setCostAndCategory] = useState<costAndCategory[]>([{category:'', cost: 0 }]);

// колбек на получение категории и стоимости
  const priceAdd = (cost: number, category: string) => {
    // сохранение состояние категории и стоимости
    
    setCostAndCategory((prevState) => [...prevState, { category: category, cost: cost }])
    console.log(category, cost)
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
    <>
      <div className={styles.hystoryPayment}>
        {'История платежей'}
        <div className={styles.information}>
          <div>{'Название каттегории'}</div>
          <CategoryWidow priceAdd={priceAdd} categories={categories} />
        </div>
        <div className={styles.hystory}>
          <ul className={styles.namesCost}>
            {costAndCategory && costAndCategory.map((categoryName) => (
              <li key={categoryName.category}>{categoryName.category}</li>
            ))}
           
          </ul>
          <ul className={styles.costNum}>
            {costAndCategory && costAndCategory.map((costCategory) => (costCategory.cost !==0 &&
              <li key={costCategory.cost}>{costCategory.cost}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
