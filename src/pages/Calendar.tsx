import React, { useEffect, useState } from 'react';
import styles from './Protocol.module.scss';
import styles2 from './Calendar.module.scss';
import ArrowRight from '../assets/images/chevron-forward-outline.svg';
import GalaAdd from '../assets/images/gala_add.svg';
import EditSVG from '../assets/images/tabler_edit.svg';
import ArrowSVG from '../assets/images/Vector (8).svg';
import { useQueueContext } from 'src/context/QueueContext';
import { calendarI } from 'src/common/types/queueContext/queueInterfaceAndTypes';


function Calendar() {
  const { getCalendar, weekendCalendar, addCalendar, changeCalendar, deleteCalendar, getBranches, branches, getOneWeekend, oneWeekend } = useQueueContext();

  useEffect(() => {
    getCalendar();
    getBranches();
  }, []);

  const [opContentVisible, setOpContentVisible] = useState(false);
  const [tickContentVisible, setTickContentVisible] = useState(false);

  const [content1, setContent1] = useState(false);
  const [content2, setContent2] = useState(false);

  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
  
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Массив с названиями месяцев на русском
    const monthNames = [
      "января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];
  
    const formattedDate = `${day} ${monthNames[monthIndex]} ${year}, ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  
    return formattedDate;
  }

  const [ formValue, setFormValue ] = useState<calendarI | null>(null)
  const [ formValue2, setFormValue2 ] = useState<calendarI | null>(null)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValue((prevFormValue: any) => ({
      ...prevFormValue,
      [name]: value,
    }));
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValue2((prevFormValue2: any) => ({
      ...prevFormValue2,
      [name]: value,
    }));
  };

  const handleChangeWeekend = (id: number) => {
    setShowModal4(true);
    getOneWeekend(id);
  }

  useEffect(() => {
    if(oneWeekend) {
      setFormValue2(oneWeekend)
    }
  }, [oneWeekend])
  

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formValue)
    addCalendar(formValue)
    setShowModal3(false)
  }

  const handleSubmit2 = (e: any) => {
    e.preventDefault();
    console.log(formValue2)
    changeCalendar(formValue2?.id ,formValue2);
    setShowModal4(false)
  }

  function convertCreatedAtToHours(created_at: string) {
    const date = new Date(created_at);
  
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    return `${hours}:${minutes}`;
  }  

  console.log(weekendCalendar)

  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.links}>
          <button
            className={`${styles.btn}`}
            onClick={() => {
              setOpContentVisible(true);
              setTickContentVisible(false);
            }}
          >
            Календарь рабочих дней
          </button>
          <button
            className={`${styles.btn}`}
            onClick={() => {
              setOpContentVisible(false);
              setTickContentVisible(true);
            }}
          >
            Календарь 
          </button>
        </div>

        <div
          style={{
            maxHeight: opContentVisible ? '100%' : '0px',
            display: opContentVisible ? 'block' : 'none',
          }}
        >
          <div
            onClick={(e) => setContent1(!content1)}
            className={styles.queue__state}
          >
            <div className={styles.queue__state__title}>
              <img
                src={ArrowRight}
                className={`${styles.arrowRight} ${
                  content1 ? `${styles.reverseArrow}` : ``
                }`}
              />
              Общий календарь рабочих дней
            </div>
            <div className={styles.circles}>
              <div className={styles.queue__state__counter}>{  }</div>
              <div className={styles.queue__state__add}>
                <img src={GalaAdd} alt="" />
              </div>
            </div>
          </div>
          <div
            style={
              content1
                ? {
                    maxHeight: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }
                : { maxHeight: '0px', display: 'none' }
            }
            className={styles.tableBlock}
          >
            <div className={styles.table}>
              <div className={styles.tableItems}>
                { content1 && (
                  <div className={styles2.mainCalendar} style={{ marginTop: "100px" }} >
                  <div className={styles2.calendat__titles}>
                    <p>Рабочий день</p>
                    <p>Выходной</p>
                    <p>График</p>
                    <p style={{marginRight: "250px"}} >Перерыв</p>
                    <p>Нерабочие дни в банке</p>
                  </div>
                  <div className={styles2.schedule}>
                    <div className={styles2.schedule__item}>
                      <p>Понедельник</p>
                      <p>Вторник</p>
                      <p>Среда</p>
                      <p>Четверг</p>
                      <p>Пятница</p>
                    </div>
                    <div className={styles2.schedule__item}>
                      <p>Суббота</p>
                      <p>Воскресенье</p>
                    </div>
                    <div className={styles2.schedule__item}>
                      <p>9:00 - 18:00</p>
                    </div>
                    <div className={styles2.schedule__item}>
                      <p>12:00 - 13:00</p>
                    </div>
                  </div>
                </div>
                ) }
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            maxHeight: tickContentVisible ? '100%' : '0px',
            display: tickContentVisible ? 'block' : 'none',
          }}
        >
          <div className={styles.content}>
            </div>
            <div className={styles.tableItem__tbody}>
              <div className={styles2.calendar_block}>
                Календарь рабочих и не рабочих дней
              </div>
              <div className={styles2.calendarWindow_block} onClick={(e) => setContent2(!content2)}>
                <div className={styles2.caledarArrow} style={{ width: "300px" }} >
                  <img src={ArrowSVG} className={`${styles.arrowRight} ${content2 ? `${styles.reverseArrow}` : ``}`} />
                  Расписание и выходные дни
                </div>
                <img src={EditSVG} onClick={() => setShowModal3(true)} />
              </div>
              { content2 && (
                <div className={styles2.mainCalendar}>
                  <div className={styles2.calendat__titles}>
                    <p>Рабочий день</p>
                    <p>Выходной</p>
                    <p>График</p>
                    <p>Перерыв</p>
                  </div>
                  <div className={styles2.schedule}>
                    <div className={styles2.schedule__item}>
                      <p>Понедельник</p>
                      <p>Вторник</p>
                      <p>Среда</p>
                      <p>Четверг</p>
                      <p>Пятница</p>
                    </div>
                    <div className={styles2.schedule__item}>
                      <p>Суббота</p>
                      <p>Воскресенье</p>
                    </div>
                    <div className={styles2.schedule__item}>
                      <p>9:00 - 18:00</p>
                    </div>
                    <div className={styles2.schedule__item}>
                      <p>12:00 - 13:00</p>
                    </div>
                    <div style={{ marginLeft: "70px", width: "400px" }} className={styles2.schedule__item}>
                      { weekendCalendar.map((item: any) => (
                        <>
                          <h3>Филиал №{item.branch}) { item.holiday }</h3>
                          <p>{ item.date }</p>
                          <div>
                            { item.branch === 1 ? (
                              <>
                                <button onClick={() => deleteCalendar(item.id)} style={{ background: "red", color: "white", padding: "10px 30px", border: "none", borderRadius: "8px", marginTop: "0px", marginBottom: "15px", cursor: "pointer" }} >Удалить</button>
                                <button onClick={() => handleChangeWeekend(item.id)} style={{ background: "lightyellow", border: "none", padding: "10px 30px", borderRadius: "8px", cursor: "pointer", marginLeft: "10px" }}>Изменить</button>
                              </>
                              ) : (
                              <button disabled style={{ background: "darkred", color: "white", padding: "10px 30px", border: "none", borderRadius: "8px", marginTop: "0px", marginBottom: "15px", cursor: "not-allowed" }} >Удалить может админ филиала</button>
                              ) }
                          </div>
                        </>
                      )) }
                    </div>    
                  </div>
                </div>
              ) }
            </div>
          </div>
          {showModal3 && (
          <div className={styles2.modal2}>
            <div className={styles2.modalContent2}>
              
              <p>
                Добавление выходного дня
              </p>
              <form className={styles2.formAdd} onSubmit={handleSubmit} >
                <input type="text" name='holiday' onChange={handleChange} className={styles2.name} placeholder='Причина выходного дня или название*'/>
                <input type="text" name='date' onChange={handleChange} className={styles2.description} placeholder='Дата в формате (yyyy-mm-dd) *' />
                <select name='branch' onChange={handleChange}>
                    <option value={1}>Филиал { weekendCalendar[0].branch }</option>
                </select>
                <button>Добавить</button>
                <button className={styles2.cancel} onClick={() => setShowModal3(false)}>Отмена</button>
              </form>
            </div>
          </div>
          )}
          {showModal4 && (
          <div className={styles2.modal2}>
            <div className={styles2.modalContent2}>
              
              <p>
                Изменение выходного дня
              </p>
              <form className={styles2.formAdd} onSubmit={handleSubmit2} >
                <input type="text" value={formValue2?.holiday} name='holiday' onChange={handleChange2} className={styles2.name} placeholder='Причина выходного дня или название*'/>
                <input type="text" value={formValue2?.date} name='date' onChange={handleChange2} className={styles2.description} placeholder='Дата в формате (yyyy-mm-dd) *' />
                <select name='branch' onChange={handleChange}>
                    <option value={1}>Филиал { weekendCalendar[0].branch }</option>
                </select>
                <button>Добавить</button>
                <button className={styles2.cancel} onClick={() => setShowModal4(false)}>Отмена</button>
              </form>
            </div>
          </div>
          )}
        </div>
      </div>
  );
}

export default Calendar;
