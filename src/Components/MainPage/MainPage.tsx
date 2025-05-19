import styles from './MainPage.module.css'

import { HistoryPaymant } from '../HistoryPayment/HystoryPayment.tsx'
import { Cash } from '../Cash/Cash.tsx'
import { Grafic } from '../Grafics/Grafics.tsx'
import { AuthWindow } from './AuthorizationWindow'
import { useUserContext  } from '../../Context/MyContext.tsx'


export function MainPage() {
  const { user, setUser } = useUserContext()
console.log(user)
  return (
    <>
      <div>
        <div className={styles.forReg}>
          <p>
            {user.userName
              ? `Добро пожаловать: ${user.userName}`
              : 'Добро пожаловать: Гость'}
          </p>
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
