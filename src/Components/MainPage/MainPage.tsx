import styles from './MainPage.module.css'
import { HistoryPaymant } from '../HistoryPayment/HystoryPayment.tsx'
import { Cash } from '../Cash/Cash.tsx'
import { Grafic } from '../Grafics/Grafics.tsx'
import { AuthWindow } from './AuthorizationWindow'

export function MainPage() {
  return (
    <>
      <div>
        <div className={styles.forReg}>
          <p>{`Добро пожаловать ${'Пользователь'}`}</p>
          <AuthWindow />
        </div>
      </div>
      <div className={styles.mainPage}>
        <div>
          <div className={styles.forCashAndHystory}>
            <div>
              <Cash />
            </div>
            <div className={styles.hystoryCash}>
              <HistoryPaymant />
            </div>
          </div>
        </div>
        <div className={styles.forGrafics}>
          <Grafic />
        </div>
      </div>
    </>
  )
}
