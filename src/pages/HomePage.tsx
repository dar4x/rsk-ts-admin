import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import ArrowRight from '../assets/images/chevron-forward-outline.svg';
import Dots from '../assets/images/Dots.svg';
import Settings from '../assets/images/solar_settings-linear.svg';
import Remove from '../assets/images/ep_remove.svg';
import GalaAdd from '../assets/images/gala_add.svg';
import SwitchSVG from '../assets/images/Vecto3.svg';
import { useQueueContext } from 'src/context/QueueContext';
import TicketModal from 'src/components/modals/home-modals/TicketModal';
import { useAuthContext } from 'src/context/AuthContext';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const { getCustomers, queues, deleteQueue, getActiveUsers, users, customers, getAllCustomers, deleteMainQueue } =
    useQueueContext();

  useEffect(() => {
    getCustomers();
    getActiveUsers();
    getAllCustomers()
  }, []);

  const navigate = useNavigate();

  const { user } = useAuthContext();

  useEffect(() => {
    if(user === null) {
      navigate("/auth")
    }
  }, [user])

  console.log(customers)
  const [content1, setContent1] = useState(false);
  const [content2, setContent2] = useState(false);
  const [content3, setContent3] = useState(false);
  const [content4, setContent4] = useState(false);

  const [showOptions, setShowOptions] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [ queuesID, setQueuesID ] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedTicketNumber, setSelectedTicketNumber] = useState('');

  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const [newItem, setNewItem] = useState(false);

  interface currentITEMType {
    id: number;
    ticket_number: string;
    queue: string;
    waiting_time: number;
    category: string;
    position: number;
  }

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

  const handleDeleteConfirm = () => {
    if(selectedItemId) {
      deleteQueue(selectedItemId)
    }
    setShowModal(false);
  };

  const convertTime = (timeInMinutes: number) => {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    return `${hours}ч ${minutes}мин`;
  };

  let index = '';
  let item = '';


  return (
    <div className={styles.hero}>
      <div className={styles.content}>
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
            Количество активных очередей
          </div>
          <div className={styles.circles}>
            <div className={styles.queue__state__counter}>{ queues?.length }</div>
            <div className={styles.queue__state__add}>
              <img src={GalaAdd} alt="" />
            </div>
          </div>
        </div>
        <div
          style={
            content1
              ? { maxHeight: '100%', display: 'block' }
              : { maxHeight: '0px', display: 'none' }
          }
          className={styles.tableBlock}
        >
          <div className={styles.table}>
            <div className={styles.tableItems}>
              <div className={styles.tableItem__tbody}>
                {queues?.map((item: any, index: number) => (
                <div
                  className={`${styles.tbody__item__talon}`}
                  style={
                    index % 2 === 1
                      ? { background: 'rgba(248, 248, 248, 1)' }
                      : undefined
                  }
                  key={item.id}
                >
                  <div className={styles.tbody__talon} style={{ width: "300px" }}>
                    <div className={styles.tbody__number}>{index + 1}.</div>
                    {item.name}
                  </div>
                  <div className={styles.tbody__buttons}>
                    <img
                      src={Settings}
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
                        setQueuesID(item.id);
                        setShowModal2(true);
                      }}
                    />
                  </div>
                </div>
                 ))} 
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={(e) => setContent2(!content2)}
          className={styles.queue__state}
        >
          <div className={styles.queue__state__title}>
            <img
              src={ArrowRight}
              className={`${styles.arrowRight} ${
                content2 ? `${styles.reverseArrow}` : ``
              }`}
            />
            Количество активных операторов
          </div>
          <div className={styles.circles}>
            <div className={styles.queue__state__counter}>{ users?.length }</div>
            <div className={styles.queue__state__add}>
              <img src={GalaAdd} alt="" />
            </div>
          </div>
        </div>

        <div
          style={
            content2
              ? { maxHeight: '100%', display: 'block' }
              : { maxHeight: '0px', display: 'none' }
          }
          className={styles.tableBlock}
        >
          <div className={styles.table}>
            <div className={styles.tableItems}>
              <div className={styles.tableItem__tbody}>
                {users?.map((item: any, index: number) => (
                <div
                  className={`${styles.tbody__item__talon}`}
                  style={
                    index % 2 === 1
                      ? { background: 'rgba(248, 248, 248, 1)' }
                      : undefined
                  }
                >
                  <div className={styles.tbody__talon}>
                    <div className={styles.tbody__number}>{index + 1}.</div>
                    <span
                      style={
                        item.category === 'pregnant'
                          ? {
                              background: 'rgba(252, 190, 183, 1)',
                            }
                          : item.category === 'veteran'
                          ? {
                              background: 'rgba(155, 228, 129, 1)',
                            }
                          : item.category === 'pensioner'
                          ? {
                              background: 'rgba(234, 237, 93, 1)',
                            }
                          : item.category === 'disabled person'
                          ? {
                              background: 'rgba(228, 129, 201, 1)',
                            }
                          : undefined
                      }
                    ></span>
                    {` Окно ${item.window_number}`}
                  </div>
                  <div className={styles.tbody__question}>
                    {item.first_name}
                  </div>
                  <div className={styles.tbody__operat_state}>
                    {/* {convertTime(item.waiting_time)} */}
                    {/* {'Принимает'} */}
                  </div>
                  <div className={styles.tbody__buttons}>
                    <img
                      src={Settings}
                      className={styles.tripledots}
                      onClick={() =>
                        handleOptionsClick(item.id, item.ticket_number)
                      }
                    />

                    <img
                      src={Remove}
                      className={styles.tripledots}
                      onClick={() => {
                        handleOptionsClick(item.id, item.ticket_number)
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
        <div
          onClick={(e) => setContent3(!content3)}
          className={styles.queue__state}
        >
          <div className={styles.queue__state__title}>
            <img
              src={ArrowRight}
              className={`${styles.arrowRight} ${
                content3 ? `${styles.reverseArrow}` : ``
              }`}
            />
            Общее количество посетителей в очереди
          </div>
          <div className={styles.circles}>
            <div className={styles.queue__state__counter}>{ customers?.length }</div>
            <div
              className={styles.queue__state__add}
              onClick={() => setShowModal(true)}
            >
              <img src={GalaAdd} alt="" />
            </div>
          </div>
        </div>
        <div
          style={
            content3
              ? { maxHeight: '100%', display: 'block' }
              : { maxHeight: '0px', display: 'none' }
          }
          className={styles.tableBlock}
        >
          { customers?.map((item:any, index: number) => (
            <div
            className={`${styles.tbody__item__talon}`}
            style={
              index % 2 === 1
                ? { background: 'rgba(248, 248, 248, 1)' }
                : undefined
            }
          >
            <div className={styles.tbody__talon}>
              <div className={styles.tbody__number}>{index + 1}.</div>
              <span
                style={
                  item.category === 'pregnant'
                    ? {
                        background: 'rgba(252, 190, 183, 1)',
                      }
                    : item.category === 'veteran'
                    ? {
                        background: 'rgba(155, 228, 129, 1)',
                      }
                    : item.category === 'pensioner'
                    ? {
                        background: 'rgba(234, 237, 93, 1)',
                      }
                    : item.category === 'disabled person'
                    ? {
                        background: 'rgba(228, 129, 201, 1)',
                      }
                    : undefined
                }
              ></span>
              
              {item.ticket_number}
            </div>
            <div className={styles.tbody__question}>
              {item.queue}
              
            </div>
            <div className={`${styles.tbody__state}`}>
              {'Ожидает'}
            </div>
            <div className={styles.tbody__time}>
              {convertTime(item.waiting_time)}
            </div>
            <div className={styles.tbody__buttons}>
              <img
                src={Dots}
                className={styles.tripledots}
                onClick={() => handleOptionsClick(item.id, item.ticket_number)}
              />
            </div>
            {showOptions && item.id === selectedItemId && (
              <div className={styles.optionsBlock}>
                <button
                  onClick={(e) => {
                    handleTicketModalOpen(item.id);
                    setShowOptions(false);
                  }}
                >
                  Посмотреть талон
                </button>
                <button
                  style={{
                    color: 'red',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '5px',
                  }}
                  onClick={() => {
                    setShowModal(true);
                    setShowOptions(false);
                  }}
                >
                  Удалить
                </button>
              </div>
            )}
          </div>
          )) }
        </div>
        {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <p>
                Вы действительно хотите удалить <br /> очередь{' '}
                <span className={styles.modalSpan}>
                  №{selectedTicketNumber}
                </span>
              </p>
              <div className={styles.modalButtons}>
                <button
                  onClick={() => setShowModal(false)}
                  className={styles.cancelBTN}
                >
                  Отмена
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className={styles.deleteBTN}
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        )}
        {showModal2 && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <p>
                Вы действительно хотите удалить <br /> очередь{' '}
                <span className={styles.modalSpan}>
                  №{queuesID}
                </span>
              </p>
              <div className={styles.modalButtons}>
                <button
                  onClick={() => setShowModal2(false)}
                  className={styles.cancelBTN}
                >
                  Отмена
                </button>
                <button
                  onClick={() => deleteMainQueue(queuesID)}
                  className={styles.deleteBTN}
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        )}
        {showTicketModal && (
          <TicketModal ticketId={selectedTicketId} closeModal={closeModal} />
        )}
      </div>
    </div>
  );
}

export default HomePage;
