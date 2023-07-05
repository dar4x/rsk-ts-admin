import React, { useState } from 'react';
import styles from './Users.module.scss';
import GalaAdd from '../assets/images/gala_add.svg';
import Edit from '../assets/images/fluent_edit-20-regular.svg';
import Remove from '../assets/images/ep_remove.svg';

function UsersEqs() {
  let index = '';
  let item = '';

  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.users}>
          <div className={styles.users__title}>
            Количество активных очередей
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
                <div className={styles.thead__name}>Ф.И.О</div>
                <div className={styles.thead__post}>Должность</div>
                <div className={styles.thead__window}>Окно</div>
              </div>

              <div>
                <div className={`${styles.tbody__item__talon}`}>
                  <div className={styles.tbody__talon}>
                    <div className={styles.tbody__name}>{index + 1}.</div>
                    {'Аманова Роза Калыбова'}
                    {/* {item.ticket_number} */}
                  </div>
                  <div className={styles.tbody__question}>
                    {/* {item.queue} */}
                    {'Главный менеджер'}
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

export default UsersEqs;
