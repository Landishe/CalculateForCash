import styles from './MainPage.module.css'

import { HistoryPaymant } from '../HistoryPayment/HystoryPayment.tsx'
import { Cash } from '../Cash/Cash.tsx'
import { Grafic } from '../Grafics/Grafics.tsx'
import { AuthWindow } from './AuthorizationWindow'
import { UserContext } from '../../Context/MyContext.tsx'
import { useState } from 'react'

export function MainPage() {
  const [user, setUser] = useState({userName:'', id:''})

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        <div className={styles.forReg}>
          <p>{`Добро пожаловать: ${user.userName}`}</p>
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
    </UserContext.Provider>
  )
}
