import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import ArrowRight from '../assets/images/chevron-forward-outline.svg';
import Dots from '../assets/images/Dots.svg';
import Edit from '../assets/images/fluent_edit-20-regular.svg';
import Remove from '../assets/images/ep_remove.svg';
import GalaAdd from '../assets/images/gala_add.svg';
import { useQueueContext } from 'src/context/QueueContext';
import TicketModal from 'src/components/modals/home-modals/TicketModal';
import { useAuthContext } from 'src/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { oneQueueI, oneUserI } from 'src/common/types/queueContext/queueInterfaceAndTypes';

function HomePage() {
  const { getCustomers, queues, deleteQueue, getActiveUsers, users, customers, getAllCustomers, deleteMainQueue, addQueue, addCustomer, getOneQueue, oneQueue, changeQueue, deleteUser } =
    useQueueContext();

  useEffect(() => {
    getCustomers();
    getActiveUsers();
    getAllCustomers()
  }, []);

  const navigate = useNavigate();

  const { user, addUser, getOneUserProfile, oneUserProfile, changeUser, Updatedusers } = useAuthContext();

  useEffect(() => {
    if(user === null) {
      navigate("/auth")
    }
  }, [user])

  const [ usersForMap, setUsersForMap ] = useState([]);

  useEffect(() => {
    if(users) {
      setUsersForMap(users);
    }
  }, [users])

  const [content1, setContent1] = useState(false);
  const [content2, setContent2] = useState(false);
  const [content3, setContent3] = useState(false);

  const [showOptions, setShowOptions] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [showModal6, setShowModal6] = useState(false);
  const [showModal7, setShowModal7] = useState(false);
  const [showModal8, setShowModal8] = useState(false);

  const [ queuesID, setQueuesID ] = useState(false);
  const [ userID, setUserID ] = useState(null);
  const [ userProfile, setUserProfile ] = useState<oneUserI | null>(null);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedTicketNumber, setSelectedTicketNumber] = useState('');

  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  // Для формочки добавление очереди 
  const [ nameInput, setNameInput ] = useState("")
  const [ desInput, setDesInput ] = useState("")
  const [ symInput, setSymInput ] = useState("")
  const [ serInput, setSerInput ] = useState("")
  const [ operInput, setOperInput ] = useState("")
  const [ docsInput, setDocsInput ] = useState("")
  const [ opDocsInput, setOpDocsInput ] = useState("")
 // Конец State для добавление очереди

 const [ queue, setQueue ] = useState<oneQueueI>();
//  const [ newData, setNewDATA ] = useState<oneUserI>();

 // Для формочки добавление пользователя
 const [ emailInput, setEmailInput ] = useState("")
 const [ usernameInput, setUsernameInput ] = useState("")
// Конец State для добавление пользователя

  // Для формочки добавление пользователя
  const [ categoryInput, setCategoryInput ] = useState("")
  const [ queueInput, setQueueInput ] = useState("")
  // Конец State для добавление пользователя

  const handleOptionsClick = (itemId: any, ticketNumber: any) => {
    setSelectedItemId(itemId);
    setSelectedTicketNumber(ticketNumber);
    setShowOptions(!showOptions);
    setShowTable(!showTable);
  };

  const handleOptionsClick2 = (itemId: any) => {
    setUserID(itemId);
  };

  const handleOptionsClick3 = async (itemId: any) => {
    const id = itemId;
    await getOneUserProfile(id);
    setShowModal8(true);
  };

  useEffect(() => {
    if(oneUserProfile) {
      setUserProfile(oneUserProfile);
    }
  }, [oneUserProfile])

  const handleDeleteConfirm2 = () => {
    deleteUser(userID)
  }

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(!nameInput.trim() || !desInput.trim || !symInput.trim()) {
      alert("Заполните обязательные поля")
    }
     // Приводим serInput и operInput к числовому типу
    const parsedSerInput = parseInt(serInput, 10); // Парсим строку в число
    const parsedOperInput = parseInt(operInput, 10); // Парсим строку в число
    console.log(typeof parsedOperInput, typeof parsedSerInput)
    addQueue(nameInput, desInput, symInput, serInput, [operInput]);
    console.log("Добавлено!");
    setShowModal3(false)
  }

  const handleOperatorSubmit = (e:any) => {
    e.preventDefault();
    if(!emailInput.trim()) {
      alert("Заполните обязательные поля")
    }
    addUser(emailInput, usernameInput)
    console.log(`Добавлен ${usernameInput}`)
    setShowModal4(false)
  }

  const handleCustomersSubmit = (e: any) => {
    e.preventDefault();
    if(!categoryInput.trim() || !queueInput.trim()) {
      alert("Заполните обязательные поля")
    }
    // Приводим queueInput к числовому типу
    const parsedQueueInput = parseInt(queueInput, 10); // Парсим строку в число
    addCustomer(categoryInput, parsedQueueInput)
    setShowModal5(false)
  }

  const handleDetailQueue = async (queueId: number) => {
    const id = queueId;
    await getOneQueue(id);
    console.log(queue)
    setShowModal6(true)
  }

  useEffect(() => {
    if(oneQueue) {
      setQueue(oneQueue)
    }
  }, [oneQueue])


  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setQueue((prevQueue: any) => ({
      ...prevQueue,
      [name]: value,
    }));
  }  

  const [modifiedFields, setModifiedFields] = useState({});

  function handleChange2(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    
    // Обновляем состояние локально при изменении
    setModifiedFields((prevModifiedFields) => ({
      ...prevModifiedFields,
      [name]: value,
    }));
    console.log(modifiedFields)
    setUserProfile((prevUserProfile: any) => ({
      ...prevUserProfile,
      [name]: value
    }))
  }
  

  const handleCustomersSubmit2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changeQueue(oneQueue?.id, queue)
    setShowModal6(false);
  };
  
  const handleCustomersSubmit3 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changeUser(oneUserProfile?.id, modifiedFields)
    setUsersForMap(Updatedusers)
    console.log(Updatedusers)
    setShowModal6(false);
  }; 

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
            <div className={styles.queue__state__add} onClick={() => setShowModal3(true)} >
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
                  <div className={styles.tbody__talon} style={{ width: "330px" }}>
                    <div className={styles.tbody__number}>{index + 1}.</div>
                    <div className={styles.tbody_name}>{item.name}</div>
                  </div>
                  <div className={styles.tbody__buttons}>
                    <img
                      src={Edit}
                      className={styles.tripledots}
                      onClick={() =>
                        handleDetailQueue(item.id)
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
            <div className={styles.queue__state__add} onClick={() => setShowModal4(true)} >
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
                {usersForMap?.map((item: any, index: number) => (
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
                      src={Edit}
                      className={styles.tripledots}
                      onClick={() =>
                        handleOptionsClick3(item.profile_pk)
                      }
                    />

                    <img
                      src={Remove}
                      className={styles.tripledots}
                      onClick={() => {
                        handleOptionsClick2(item.profile_pk)
                        setShowModal7(true);
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
              onClick={() => setShowModal5(true)}
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
          <div className={styles.modal2}>
            <div className={styles.modalContent2}>
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
          <div className={styles.modal2}>
            <div className={styles.modalContent2}>
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
                  onClick={() => {
                    deleteMainQueue(queuesID)
                    setShowModal2(false)
                  }}
                  className={styles.deleteBTN}
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        )}
        {showModal3 && (
          <div className={styles.modal2}>
            <div className={styles.modalContent2}>
              
              <p>
                Добавление очереди
              </p>
              <form className={styles.formAdd} onSubmit={(e) => handleSubmit(e)} >
                <input type="text" className={styles.name} placeholder='Название *' value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
                <input type="text" className={styles.description} placeholder='Описание *' value={desInput} onChange={(e) => setDesInput(e.target.value)} />
                <input type="text" className={styles.symbol} placeholder='Символ *' maxLength={2} value={symInput} onChange={(e) => setSymInput(e.target.value.toUpperCase())} />
                <select className={styles.services} value={serInput} onChange={(e) => setSerInput(e.target.value)}>
                  <option value={1} >Физическое лицо</option>
                  <option value={2}>Юридическое лицо</option>
                  <option value={3}>Платежные карты</option>
                </select>
                <select className={styles.operator} value={operInput} onChange={(e) => setOperInput(e.target.value)}>
                {users.map((item: any) => (
                  <option key={item.id} value={item.profile_pk}>
                    Оператор {item.first_name}
                  </option>
                ))}
                </select>
                <input type="text" className={styles.docs} placeholder='Обязательные документы' value={docsInput} onChange={(e) => setDocsInput(e.target.value)} />
                <input type="text" className={styles.optional_documents} placeholder='Необязательные документы' value={opDocsInput} onChange={(e) => setOpDocsInput(e.target.value)} />
                <button>Добавить</button>
                <button className={styles.cancel} onClick={() => setShowModal3(false)}>Отмена</button>
              </form>
            </div>
          </div>
        )}
        {showModal4 && (
          <div className={styles.modal2}>
            <div className={styles.modalContent2}>
              
              <p>
                Создание пользователя (оператор, админ и.т.д.)
              </p>
              <form className={styles.formAdd} onSubmit={(e) => handleOperatorSubmit(e)} >
                <input type="email" className={styles.name} placeholder='E-mail *' value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                <input type="text" className={styles.description} placeholder='Имя пользователя' value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
                <button style={{ background: "green" }} >Добавить</button>
                <button className={styles.cancel} onClick={() => setShowModal4(false)}>Отмена</button>
              </form>
            </div>
          </div>
        )}
        {showModal5 && (
          <div className={styles.modal2}>
            <div className={styles.modalContent2}>
              
              <p>
                Создание талона (админ).
              </p>
              <form className={styles.formAdd} onSubmit={(e) => handleCustomersSubmit(e)} >
                <p style={{ textAlign: "left" }} >Категория:</p>
                <select value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)}>
                  <option value={"regular"}>Обычный</option>
                  <option value={"pensioner"}>Пенсионер</option>
                  <option value={"pregnant"}>Беременная</option>
                  <option value={"veteran"}>Ветеран</option>
                  <option value={"disabled person"}>Инвалид</option>
                </select>
                <p style={{ textAlign: "left" }} >Очередь:</p> 
                <select value={queueInput} onChange={(e) => setQueueInput(e.target.value)}>
                  { queues.map((queue: any) => (
                    <option value={queue.id}>{ queue.name }, Филиал №{ queue.branch }</option>
                  )) }
                </select>
                <button>Создать</button>
                <button className={styles.cancel} onClick={() => setShowModal4(false)}>Отмена</button>
              </form>
            </div>
          </div>
        )}
        {showModal6 && (
          <div className={styles.modal2}>
            <div className={styles.modalContent2}>
              
              <p>
                Изменить очередь (админ).
              </p>
                <form className={styles.formAdd} onSubmit={(e) => handleCustomersSubmit2(e)} >
                  <input type="text" name='name' value={queue?.name} onChange={handleChange}  />
                  <input type="text" name='description' value={queue?.description} onChange={handleChange}  />
                  <input type="text" name='documents' value={queue?.documents} onChange={handleChange}  />
                  <input type="text" name='optional_documents' value={queue?.optional_documents} onChange={handleChange}  />
                  <input type="text" name='symbol' value={queue?.symbol.toUpperCase()} maxLength={2} onChange={handleChange}  />
                  <select name='operator' onChange={handleChange} >
                    { queue?.operator?.map(( item: any ) => (
                      <option>Оператор №{ item }</option>
                    )) }
                  </select>
                  <button>Изменить</button>
                  <button className={styles.cancel} onClick={() => setShowModal6(false)}>Отмена</button>
                </form>
            </div>
          </div>
        )}
        {showModal7 && (
          <div className={styles.modal2}>
            <div className={styles.modalContent2}>
              <p>
                Вы действительно хотите удалить <br /> пользователя{' '}
                <span className={styles.modalSpan}>
                  №{userID}
                </span>
              </p>
              <div className={styles.modalButtons}>
                <button
                  onClick={() => setShowModal7(false)}
                  className={styles.cancelBTN}
                >
                  Отмена
                </button>
                <button
                  onClick={handleDeleteConfirm2}
                  className={styles.deleteBTN}
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        )}
        {showModal8 && (
          <div className={styles.modal2}>
            <div className={styles.modalContent2}>
              
              <p>
                Изменить User
              </p>
                <form className={styles.formAdd} onSubmit={(e) => handleCustomersSubmit3(e)} >
                  <input type="text" name='first_name' value={userProfile?.first_name} onChange={handleChange2}  />
                  <input type="text" name='last_name' value={userProfile?.last_name} onChange={handleChange2}  />
                  <input type="text" name='surname' value={userProfile?.surname} onChange={handleChange2}  />
                  <input type="text" name='phone' value={userProfile?.phone} onChange={handleChange2}  />
                  <select name='position' onChange={handleChange2} >
                    <option value={"operator"}>Оператор</option>
                    <option value={"admin"} >Администратор</option>
                    <option value={"registrator"} >Регистратор</option>
                    <option value={"regular"} >Обычный</option>
                  </select>
                  <select name='banned' onChange={handleChange2} >
                    <option value={"true"}>Заблокировать</option>
                    <option value={"false"} >Разблокировать</option>
                  </select>
                  <button>Изменить</button>
                  <button className={styles.cancel} onClick={() => setShowModal8(false)}>Отмена</button>
                </form>
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
