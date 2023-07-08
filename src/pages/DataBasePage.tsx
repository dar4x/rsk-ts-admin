import React from 'react';
import styles from './DataBase.module.scss';

function DataBasePage() {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.data}>
          <div className={styles.data__title}>Копирование базы данных:</div>
        </div>
        <div className={styles.data__items}>
          Выберите базу данных для копирования
          <ul className={styles.data__head}>
            <li className={styles.data__item}>
              Основная база данных системы администрирования:
            </li>
            <li className={styles.data__item}>База данных клиентов</li>
            <li className={styles.data__item}>База данных операторов</li>
            <li className={styles.data__item}>База данных талонов:</li>
            <li className={styles.data__item}>База данных отчетов:</li>
          </ul>
        </div>
        <div className={styles.data}>
          <div className={styles.data__title}>Восстановление базы данных:</div>
        </div>
      </div>
    </div>
  );
}

export default DataBasePage;
