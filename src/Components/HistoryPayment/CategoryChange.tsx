import { useState } from 'react'
import './historyModal.css'
import styles from './HystoryPayment.module.css'
import { DataPropsAndActiveWindow } from '../../types/types'



export function CategoryChange({ active, setActive, priceAdd, categories }: DataPropsAndActiveWindow) {
  
  const [costAdd, setCostAdd] = useState<number>(0)


  function handleInputChange(e) {
    setCostAdd(e.target.value)
    
  }
//  получаем в колбек данные о нажатии на кнопку
  const categoryClick = (category: string[]) => () => {
    priceAdd(costAdd, category)
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
              type='text'
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
              <button className={styles.buttonSub}>
                {'Добавить категорию'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
