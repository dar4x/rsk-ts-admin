import React, { useEffect, useState } from 'react';
import styles from './Protocol.module.scss';
import ArrowRight from '../assets/images/chevron-forward-outline.svg';
import GalaAdd from '../assets/images/gala_add.svg';
import Eye from '../assets/images/mdi_eye-outline.svg';
import Remove from '../assets/images/ep_remove.svg';
import Search from '../assets/images/search.svg';
import Settings from '../assets/images/setting4.svg';
import Dropdown from 'src/components/modals/dropmenu/DropMenu';
import { Link } from 'react-router-dom';
import { IDropPage } from 'src/common/types/dropdown';
import classNames from 'classnames';
import { useQueueContext } from 'src/context/QueueContext';

function ProtocolPage() {

  const { operatorActions, getOperatorActions, getTalonActions, talonActions } =
    useQueueContext();

  useEffect(() => {
    getOperatorActions();
    getTalonActions();
  }, []);

  console.log(operatorActions)

  const [opContentVisible, setOpContentVisible] = useState(false);
  const [tickContentVisible, setTickContentVisible] = useState(false);

  const [content1, setContent1] = useState(false);

  const [showOptions, setShowOptions] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedTicketNumber, setSelectedTicketNumber] = useState('');

  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const handleOptionsClick = (itemId: any, ticketNumber: any) => {
    setSelectedItemId(itemId);
    setSelectedTicketNumber(ticketNumber);
    setShowOptions(!showOptions);
    setShowTable(!showTable);
  };

  const handleTicketModalOpen = (ticketId: any) => {
    setSelectedTicketId(ticketId);
    setShowTicketModal(true);
  };

  const closeModal = () => {
    setSelectedTicketId(null);
    setShowTicketModal(false);
  };

  let item = '';
  let index = '';

  const convertTime = (timeInMinutes: number) => {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    return `${hours}: ${minutes}`;
  };

  function convertCreatedAtToHours(created_at: string) {
    const date = new Date(created_at);
  
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    return `${hours}:${minutes}`;
  }  

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleToggleDropDown = () => {
    setIsDropDownOpen((prevState) => !prevState);
  };

  const dropPages: IDropPage[] = [
    {
      title: 'По дате',
      link: '',
    },
    {
      title: 'Удаленные',
      link: '',
    },
    {
      title: 'Перемещенные',
      link: '',
    },

    {
      title: 'Созданные',
      link: '',
    },
    {
      title: 'В процессе',
      link: '',
    },
  ];

  console.log(talonActions)

  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.links}>
          <button
            className={`${styles.btn} ${
              opContentVisible ? styles.btn__active : ''
            }`}
            onClick={() => {
              setOpContentVisible(true);
              setTickContentVisible(false);
            }}
          >
            Протоколы по операторам
          </button>
          <button
            className={`${styles.btn} ${
              !opContentVisible ? styles.btn__active : ''
            }`}
            onClick={() => {
              setOpContentVisible(false);
              setTickContentVisible(true);
            }}
          >
            Протоколы по талонам
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
              Действия операторов
            </div>
            <div className={styles.circles}>
              <div className={styles.queue__state__counter}>{ operatorActions?.length }</div>
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
                <div className={styles.tableItem__tbody}>
                  <div className={styles.tableItem__thead}>
                    <div className={styles.thead__name}>Время</div>
                    <div className={styles.thead__post}>Оператор</div>
                    <div className={styles.thead__window}>Действия </div>
                  </div>
                  {operatorActions?.reverse().map((item: any, index: number) => (
                  <div
                  key={item.id}
                    className={`${styles.tbody__item__talon}`}
                    style={
                      index % 2 === 1
                        ? { background: 'rgba(248, 248, 248, 1)' }
                        : undefined
                    }
                  >
                    <div className={styles.tbody__time}>
                      <div className={styles.tbody__number}>{index + 1}.</div>
                      {convertCreatedAtToHours(item.created_at)}

                      {item.ticket_number}
                    </div>
                    <div className={styles.tbody__operator}>
                      {`Оператор ${item.operator}`}
                    </div>
                    <div className={styles.tbody__actions}>
                      { item.event }
                    </div>
                    <div className={styles.tbody__buttons}>
                      <img
                        src={Eye}
                        className={styles.tripledots}
                        onClick={() =>
                          handleOptionsClick(item.id, item.ticket_number)
                        }
                      />

                      <img
                        src={Remove}
                        className={styles.tripledots}
                        onClick={() => {
                          handleOptionsClick(item.id, item.ticket_number);
                          setShowModal(true);
                        }}
                      />
                    </div>
                  </div>
                  ))}
                </div>
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
            <div className={styles.search}>
              <div className={styles.filter}>
                <div className={styles.settings} onClick={handleToggleDropDown}>
                  <img src={Settings} alt="" />
                </div>
                {isDropDownOpen && (
                  <Dropdown
                    className={styles.drop__menu}
                    isOpen={isDropDownOpen}
                  >
                    {dropPages.map((page) => (
                      <ul className={styles.drop__catalog} key={page.title}>
                        <Link to={page.link}>
                          <li
                            className={classNames(styles.drop__catalog__item, {
                              [styles.logout]: page.title === 'Выход',
                            })}
                          >
                            {page.title}
                          </li>
                        </Link>
                      </ul>
                    ))}
                  </Dropdown>
                )}
              </div>
              <div className={styles.search__bar}>
                <div>
                  <input
                    className={styles.search__input}
                    type="text"
                    placeholder="Поиск талонов"
                  />
                </div>
                <div className={styles.find__btn}>
                  <img src={Search} alt="" />
                </div>
              </div>
            </div>
            <div className={styles.tableItem__tbody}>
              <div className={styles.tableItem__head}>
                <div className={styles.thead__name}>Время</div>
                <div className={styles.thead__window}>Действия </div>
                <div className={styles.thead__post}>Особенности</div>
              </div>
              {talonActions?.map((item: any, index: number) => (
              <div
                key={item.id}
                className={`${styles.tbody__item__talon}`}
                style={
                  index % 2 === 1
                    ? { background: 'rgba(248, 248, 248, 1)' }
                    : undefined
                }
              >
                <div className={styles.tbody__time}>
                  <div className={styles.tbody__number}>{index + 1}.</div>
                  {convertTime(item.waiting_time)}

                  
                </div>
                <div className={styles.tbody__actions}>
                  {`Создан новый талон №${item?.ticket_number}`}
                </div>
                <div className={styles.tbody__operator}>{ item?.category === 'regular' ? "-" : item?.category }</div>
                <div className={styles.tbody__buttons}>
                  <img
                    src={Eye}
                    className={styles.tripledots}
                    onClick={() =>
                      handleOptionsClick(item.id, item.ticket_number)
                    }
                  />

                  <img
                    src={Remove}
                    className={styles.tripledots}
                    onClick={() => {
                      handleOptionsClick(item.id, item.ticket_number);
                      setShowModal(true);
                    }}
                  />
                </div>
              </div>
              ))} 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProtocolPage;
