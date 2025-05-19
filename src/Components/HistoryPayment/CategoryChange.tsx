import { ChangeEvent, useEffect, useState } from 'react'
import './historyModal.css'
import styles from './HystoryPayment.module.css'
import {
  DataPropsAndActiveWindow,
  Categories,
  dataExpenses,
  getExpensesDate,
} from '../../types/types'

import { SentDateCategory } from '../../api/SentDateCategory'
import { GetMonthyTransaction } from '../../api/GetMonthyTransaction'
import { useUserContext } from '../../Context/MyContext'

export function CategoryChange({
  active,
  setActive,
  priceAdd,
}: DataPropsAndActiveWindow) {
  const { user, setUser } = useUserContext()
  const [costAdd, setCostAdd] = useState<number>(0)
  const [error, setError] = useState<string>('ошбика')
  const [description, setDiscription] = useState<string>('')
  const [dataSent, setDataSent] = useState<dataExpenses>({
    category: '',
    value: 0,
    date: new Date().toJSON(),
    description: '',
    operation_type: 'expenses',
  })
  const [dataExpense, setDataExpese] = useState()
  const [click, setClick] = useState<boolean>(false)


  function handleInputChangeCost(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    const numValue = value === '' ? 0 : Number(value)
    setCostAdd(numValue)
  }
  function handleInputChangeDiscription(e: ChangeEvent<HTMLInputElement>) {
    setDiscription(e.target.value)
  }

  const categories: Categories[] = [
    { name: 'Продукты', value: 'food' },
    { name: 'Транспорт', value: 'transport' },
    { name: 'Коммунальные услуги', value: 'utilities' },
    { name: 'Развлечения', value: 'entertainment' },
    { name: 'Одежда', value: 'clothing' },
    { name: 'Прочее', value: 'other' },
    { name: 'Подарки', value: 'gifts' },
  ]

  // передаем данные на сервер
  useEffect(()=>{

    const handleSendData = async () => {
      const dataDate: getExpensesDate = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        operation_type: 'expenses',
      }
      if (user.userId) {
        try {
          const result = await GetMonthyTransaction(dataDate)
          console.log('Success:', result)
          setDataExpese(result)
        } catch {
          console.error('Error:', error)
        }
      }
    }
    if(click){
      handleSendData()
      setClick(false)
    }
  },[click, user.userId])


  // передачи данных на сервер о тратах в категориях
  const sentDataExpensis = async (dataSent: dataExpenses) => {
    try {
      await SentDateCategory(dataSent)
    } catch {
      console.error('не работает функция sentDataExpensis', error)
    }
  }
  console.log(dataExpense)
  console.log(dataExpense.monthlyTransactions)
// создание объекта для передачи данных
  function dataForSent(valueCategory: string, costAdd: number) {
    setDataSent({
      value: costAdd,
      category: valueCategory,
      date: new Date().toJSON(),
      description: description,
      operation_type: 'expenses',
    })
    sentDataExpensis(dataSent)
    console.log(dataSent)
  }
  //  получаем в колбек данные о нажатии на кнопку для передачи в разметку
  const categoryClick = (categoryName: string, valueCategory: string) => () => {
    priceAdd(costAdd, categoryName)
    dataForSent(valueCategory, costAdd)
    console.log(valueCategory)
    console.log(categoryName)
  }


  return (
    <>
      <div
        className={active ? 'modal active' : 'modal'}
        onClick={() => setActive(false)}
      >
        <div
          className={active ? 'modalWindowHystory active' : 'modalWindow'}
          onClick={(e) => e.stopPropagation()}
        >
          {'Выбирете категорию'}
          <form
            className={styles.FormCategory}
            action=''
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <label>Введите сумму</label>
            <input
              className={styles.inputPrice}
              type='number'
              value={costAdd}
              onChange={handleInputChangeCost}
            />
            <label>Введите описание</label>
            <input
              className={styles.inputDiscription}
              type='string'
              value={description}
              onChange={handleInputChangeDiscription}
            />
            <div className='category'>
              {categories.map((category) => (
                <button
                  className={styles.buttonSub}
                  key={category.value}
                  onClick={categoryClick(category.name, category.value)}
                >
                  {category.name}
                </button>
              ))}
              <button className={styles.buttonSub} onClick={() => setClick(true)}>
                {'Записать'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
