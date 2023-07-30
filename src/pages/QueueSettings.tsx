import React, { useEffect, useState } from 'react';
import styles from './QueueSettings.module.scss';
import GalaAdd from '../assets/images/gala_add.svg';
import Settings from '../assets/images/solar_settings-linear.svg';
import { useQueueContext } from 'src/context/QueueContext';
import { queueSettings } from 'src/common/types/queueContext/queueInterfaceAndTypes';

function QueueSettings() {
  const { getCustomers, queues, postQueueBlock,
    postQueueMaxCalls,
    postQueueTrans,
    postQueueMaxTrans,
    postQueueOperatorWaitingTime,
    postQueuePrintingTime,
    getOneQueue, oneQueue } = useQueueContext();

  const [ modal, setShowModal ] = useState(false);

  const [ formValue, setFormValue ] = useState<queueSettings | null>(null)
  const [ queue, setQueue ] = useState<queueSettings | null>(null);

  const handleModalSettings = (id: number) => {
    setShowModal(true);
    getOneQueue(id)
  }

  useEffect(() => {
    if(oneQueue) {
        setQueue(oneQueue)
    }
  }, [oneQueue])

  useEffect(() => {
    getCustomers();
  }, []);
  
  const [switchOn, setSwitchOn] = useState(oneQueue?.is_blocked);
  const [switchOn2, setSwitchOn2] = useState(oneQueue?.auto_transfer);
  
  console.log(oneQueue)
  const calculateTimeDifference = (start: string, end: string): string => {
    const startTime = new Date(`2000-01-01 ${start}`);
    const endTime = new Date(`2000-01-01 ${end}`);

    const differenceInMilliseconds = endTime.getTime() - startTime.getTime();
    const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}:${minutes === 0 ? "00" : ""}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
  
    setQueue((prevQueue: any) => ({
      ...prevQueue,
      [name]: newValue,
    }));
  };
  
  useEffect(() => {
    if (queue) {
      setSwitchOn(queue.is_blocked);
      setSwitchOn2(queue.auto_transfer);
    }
  }, [queue]);
  

  const handlePostQueueClick = async (id: number, e: any) => {
    e.preventDefault();
    await postQueueMaxCalls(id, queue?.max_calls);
    await postQueueMaxTrans(id, queue?.max_transfers);
    await postQueueOperatorWaitingTime(id, queue?.waiting_time_operator);
    await postQueuePrintingTime(id, queue?.print_start, queue?.print_end);

    // Update the 'switchOn' and 'switchOn2' states after the API calls have completed
    setSwitchOn(!switchOn);
    setSwitchOn2(!switchOn2);
    
    postQueueBlock(id);
    postQueueTrans(id);

    setShowModal(false)

  }

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
                <div className={styles.thead__window}>Время обслуживания</div>
              </div>

              { queues?.map((item: any, index: number) => (
                <div>
                  <div className={`${styles.tbody__item__talon}`}>
                    <div className={styles.tbody__talon}>
                      <div className={styles.tbody__name}>{index + 1}.</div>                      
                      {item.name}
                    </div>
                    <div className={styles.tbody__window}>{calculateTimeDifference(item.print_start, item.print_end)}</div>
                    <div className={styles.tbody__buttons}>
                      <div className={styles.switch} onClick={() => handleModalSettings(item.id)} >
                        <img src={Settings} className={styles.switchIcon} />
                      </div>
                    </div>
                  </div>
              </div>
              )) }
            </div>
          </div>
        </div>
        {modal && (
          <div className={styles.modal2}>
            <div className={styles.modalContent2}>
              
              <p>
                Настройка очереди
              </p>
                <form className={styles.formAdd} onSubmit={(e) => {
                    handlePostQueueClick(oneQueue?.id, e)
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <label className={styles.switch}>
                        <input type="checkbox" checked={switchOn} onChange={handleChange} name='is_blocked' />
                        <span className={styles.slider}></span>
                    </label>
                    <h3 style={{textAlign: "left", fontWeight: "500", fontSize: "14px"}}>Заблокировать или разблокировать очередь</h3>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <label className={styles.switch}>
                        <input type="checkbox" checked={switchOn2} onChange={handleChange} name='auto_transfer' />
                        <span className={styles.slider}></span>
                    </label>
                    <h3 style={{textAlign: "left", fontWeight: "500", fontSize: "14px"}}>Автоматический перенос талона при длительной неявки</h3>
                  </div>
                  <h3 style={{textAlign: "left", fontWeight: "500", fontSize: "14px"}}>Макс. количество вызовов:</h3>
                  <input name='max_calls' value={queue?.max_calls} type="number" onChange={handleChange} placeholder="Настроить макс. количество вызовов посетителя к оператору" />
                  <h3 style={{textAlign: "left", fontWeight: "500" , fontSize: "14px"}}>Макс. переводов талона:</h3>
                  <input name='max_transfers' value={queue?.max_transfers} type="number" onChange={handleChange} placeholder="Настроить макс. количество переводов окна" />
                  <h3 style={{textAlign: "left", fontWeight: "500" , fontSize: "14px"}}>Время ожидание оператора талона (в секундах):</h3>
                  <input name='waiting_time_operator' value={`${queue?.waiting_time_operator}`} type="text" onChange={handleChange} placeholder="Настроить время ожидание оператора посетителя (в секундах)" />
                  <h3 style={{textAlign: "left", fontWeight: "500" , fontSize: "14px"}} >Начало печати:</h3>
                  <input type="text" name='print_start' value={queue?.print_start} onChange={handleChange} />
                  <h3 style={{textAlign: "left", fontWeight: "500" , fontSize: "14px"}}>Конец печати</h3>
                  <input type="text" name='print_end' value={queue?.print_end} onChange={handleChange} />
                  <button>Настроить</button>
                  <button className={styles.cancel} onClick={() => setShowModal(false)}>Отмена</button>
                </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QueueSettings;