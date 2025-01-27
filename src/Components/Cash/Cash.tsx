import styles from './Cash.module.css'
export function Cash (){

    return (<>
        <div className={styles.Cash}>{'Калькулятор трат'}
            <p className={styles.infoCash}>{'Приход денег'}</p>
            <div className={styles.inputsCash}>
                <input type="text" />
            </div>
            <div className={styles.dynamics}>
                <p>{`Доход `}
                    <span>{'0'}</span>
                </p>
                <p>{'Расход '}
                    <span>{'0'}</span>
                </p>
                <p>{'Остаток '}
                    <span>{'0'}</span>
                </p>
            </div>
        </div>
    </>)
}