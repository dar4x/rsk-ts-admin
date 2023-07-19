import React, { useEffect, useState } from 'react';
import styles from './QueueSettingns.module.scss';
import GalaAdd from '../assets/images/gala_add.svg';
import Edit from '../assets/images/fluent_edit-20-regular.svg';
import Remove from '../assets/images/ep_remove.svg';
import { useQueueContext } from 'src/context/QueueContext';

function QueueSettings() {
  let index = '';
  let item = '';

  const { getCustomers, queues } =
    useQueueContext();

  useEffect(() => {
    getCustomers();
  }, []);

  const calculateTimeDifference = (start: string, end: string): string => {
    const startTime = new Date(`2000-01-01 ${start}`);
    const endTime = new Date(`2000-01-01 ${end}`);

    const differenceInMilliseconds = endTime.getTime() - startTime.getTime();
    const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}:${minutes === 0 ? "00" : ""}`;
  };


  console.log(queues)

  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.users}>
          <div className={styles.users__title}>
            Список существующих очередей
          </div>
          <div className={styles.circles}>
            <div className={styles.queue__state__counter}>{ queues?.length }</div>
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

              { queues?.map((item: any, index: number) => (
                <div>
                  <div className={`${styles.tbody__item__talon}`}>
                    <div className={styles.tbody__talon}>
                      <div className={styles.tbody__name}>{index + 1}.</div>
                      
                      {item.name}
                    </div>
                    <div className={styles.tbody__question}>
                      {/* {item.queue} */}
                      {'Кредитные операции'}
                    </div>
                    <div className={styles.tbody__window}>{calculateTimeDifference(item.print_start, item.print_end)}</div>
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
              )) }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QueueSettings;
