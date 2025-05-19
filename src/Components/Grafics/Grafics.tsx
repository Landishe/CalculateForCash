import styles from './Grafics.module.css'
import { GetMonthyTransaction } from '../../api/GetMonthyTransaction'

export function Grafic() {
  // тестоваая отправка даты на сервер
  const getExpensesDate = {
    year: 2025,
    month: 5,
    operation_type: 'expenses',
  }

  const HandlGetMonthyTransaction = async () => {
    try {
      const result = await GetMonthyTransaction(getExpensesDate)
      console.log('Работает:', result)
    } catch {
      console.error('Error:', error)
    }
    console.log(getExpensesDate)
  }

  return (
    <>
      <div className={styles.grafics}>{'тут график'}</div>
      <button className={styles.buttonSub} onClick={HandlGetMonthyTransaction}>
        {' '}
        {'Получить дату'}{' '}
      </button>
    </>
  )
}
