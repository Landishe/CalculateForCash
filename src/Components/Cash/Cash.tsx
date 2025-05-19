import { useEffect, useState } from 'react'
import styles from './Cash.module.css'
import { dataExpenses, Balance } from '../../types/types'
import { SentDateCategory } from '../../api/SentDateCategory'
import { GetExpenses } from '../../api/GetExpenses'
import { useUserContext } from '../../Context/MyContext'

export function Cash() {
  const { user, setUser } = useUserContext()
  const [dataIncome, setDataIncome] = useState<dataExpenses>({
    category: 'зарплата',
    value: 0,
    date: new Date().toJSON(),
    description: 'зарплата',
    operation_type: 'income',
  })
  const [cashInfo, setCashInfo] = useState<string>('')
  const [incomeCash, setIncomeCash] = useState<number>(0)
  const [balance, setBalance] = useState<Balance>({
    balance_income: 0,
    balance_expenses: 0,
    balance_current: 0,
  })
  
  const handleInputCash = (e: ChangeEvent<HTMLInputElement>) => {
    setCashInfo(e.target.value)
  }

  const sentDataIncomeCash = async () => {
    try {
      const newValue = Number(cashInfo)
      const newData = {
        ...dataIncome,
        value: newValue,
        date: new Date().toJSON(),
      }
      await SentDateCategory(newData)
      const updatedBalance = await GetExpenses(user.userId)
      setBalance(updatedBalance)
      setIncomeCash(newValue)
      setDataIncome(newData)
    } catch (error) {
      console.error('Ошибка:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.userId) {
          const result = await GetExpenses(user.userId)
          setBalance(result)
          console.log('Success:', result)
        }
      } catch {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [user])
  

  return (
    <>
      <div className={styles.Cash}>
        {'Калькулятор трат'}
        <p className={styles.infoCash}>{'Приход денег'}</p>
        <label className={styles.inputsCash}>
          {' '}
          Добавить сумму
          <input type='text' onChange={handleInputCash} />
          <input
            type='button'
            className={styles.addCash}
            value={'+'}
            onClick={sentDataIncomeCash}
          />
        </label>
        <div className={styles.dynamics}>
          <p>
            {`Доход `}
            <span>{balance.balance_income}</span>
          </p>
          <p>
            {'Расход '}
            <span>{balance.balance_expenses}</span>
          </p>
          <p>
            {'Остаток '}
            <span>{balance.balance_current}</span>
          </p>
        </div>
      </div>
    </>
  )
}
