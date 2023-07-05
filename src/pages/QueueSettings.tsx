import React, { useState } from 'react';
import styles from './QueueSettingns.module.scss';
import GalaAdd from '../assets/images/gala_add.svg';
import Edit from '../assets/images/fluent_edit-20-regular.svg';
import Remove from '../assets/images/ep_remove.svg';

function QueueSettings() {
  let index = '';
  let item = '';

  const convertTime = (timeInMinutes: number) => {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    return `${hours}ч ${minutes}мин`;
  };

  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.users}>
          <div className={styles.users__title}>
            Список существующих очередей
          </div>
          <div className={styles.circles}>
            <div className={styles.queue__state__counter}>8</div>
            <div className={styles.queue__state__add}>
              <img src={GalaAdd} alt="" />
            </div>
          </div>
        </div>
        <div className={styles.table}>
          <div className={styles.tableItems}>
            <div className={styles.tableItem__tbody}>
              <div className={styles.tableItem__thead}>
                <div className={styles.thead__name}>Название</div>
                <div className={styles.thead__post}>Группа</div>
                <div className={styles.thead__window}>Время обслуживания</div>
              </div>

              <div>
                <div className={`${styles.tbody__item__talon}`}>
                  <div className={styles.tbody__talon}>
                    <div className={styles.tbody__name}>{index + 1}.</div>
                    {'Обслуживание кредитов'}
                    {/* {item.ticket_number} */}
                  </div>
                  <div className={styles.tbody__question}>
                    {/* {item.queue} */}
                    {'Кредитные операции'}
                  </div>
                  <div className={styles.tbody__window}>{'Окно 5'}</div>
                  <div className={styles.tbody__buttons}>
                    <div className={styles.switch}>
                      <img src={Edit} className={styles.switchIcon} />
                    </div>
                    <img
                      src={Remove}
                      className={styles.tripledots}
                      // onClick={() =>
                      //   handleOptionsClick(item.id, item.ticket_number)
                      // }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QueueSettings;
