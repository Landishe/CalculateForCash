import { useContext, useState } from 'react'
import './historyModal.css'
import styles from './HystoryPayment.module.css'
import {
  DataPropsAndActiveWindow,
  DatacostAndCategoryForUser,
} from '../../types/types'
import { sendCostAndCatgory } from '../../api/postSent'
import { CostAndCategory } from '../../Context/MyContext'
import { UserContext } from '../../Context/MyContext'

export function CategoryChange({
  active,
  setActive,
  priceAdd,
  categories,
}: DataPropsAndActiveWindow) {
  const { user, setUser } = useContext(UserContext)
  const [costAdd, setCostAdd] = useState<number>(0)
  const { costAndCategory } = useContext(CostAndCategory)
  const [error, setError] = useState<string>('ошбика')

  
  console.log(costAndCategory)
  
  function handleInputChange(e) {
    setCostAdd(e.target.value)
  }
  // передаем данные на сервер
  const handleSendData = async () => {
    console.log('тут работает')
    try {
      const result = await sendCostAndCatgory()
      console.log('Success:', result)
    } catch {
      console.error('Error:', error)
    }
  }
  //  получаем в колбек данные о нажатии на кнопку
  const categoryClick = (category: string) => () => {
    if (typeof costAdd === 'string') {
      const numberCostAdd = Number(costAdd)
      priceAdd(numberCostAdd, category)
    }
    handleSendData()
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
              onChange={handleInputChange}
            />

            <div className='category'>
              {categories.map((category: string) => (
                <button
                  className={styles.buttonSub}
                  key={category}
                  onClick={categoryClick(category)}
                >
                  {category}
                </button>
              ))}
              <button className={styles.buttonSub} onClick={handleSendData}>
                {'Добавить категорию'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
