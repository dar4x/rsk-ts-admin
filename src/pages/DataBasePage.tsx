import React, { useEffect, useState } from 'react';
import { useDataBaseContext } from 'src/context/DatabaseContext';
import styles from './DataBase.module.scss';

function DataBasePage() {
  const { createDataBase,getDatabase,databases } = useDataBaseContext();

  useEffect(() => {
    getDatabase()
  }, [])

  const [ inputValue, setInputValue ] = useState("");

  const [ showModal, setShowModal ] = useState(false);
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.data}>
          <div className={styles.data__title} onClick={() => setShowModal(true)}>Создание базы данных:</div>
        </div>
        <div className={styles.data}>
          <div className={styles.data__title}>Восстановление базы данных:</div>
        </div> 
        <div className={styles.data__items}>
          Лист БД:
          <ul className={styles.data__head}>
            { databases?.map((item: any) => (
              <li className={styles.data__item}>
              { item }
              </li>
            )) }
          </ul>
        </div>
      </div>
      {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <p>
                Копирования БД
                <span className={styles.modalSpan}>
                  
                </span>
              </p>
              <input type="text" placeholder="Name" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className={styles.modalInput} />
              <div className={styles.modalButtons}>
                <button
                  onClick={() => setShowModal(false)}
                  className={styles.cancelBTN}
                >
                  Отмена
                </button>
                <button
                  onClick={() => {
                    createDataBase(inputValue),
                    setShowModal(false);
                  }}
                  className={styles.deleteBTN}
                >
                  Создать
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default DataBasePage;
