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

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  const [showDeleted, setShowDeleted] = useState(false); // Step 1: State variable for deleted talons filter
  const [showCreated, setShowCreated] = useState(false);
  const [showServed, setShowServed] = useState(false);
  const [showStarted, setShowStarted] = useState(false);

  // Step 2: Modify handleFilterChange to handle "Удаленные" filter
  const handleFilterChange = (filterOption: string) => {
    setSelectedFilter(filterOption);
  
    if (filterOption === 'cancelled') {
      setShowDeleted(true);
      setShowServed(false);
      setShowCreated(false); // Reset "Созданные" filter state when "Удаленные" filter is selected
      setShowStarted(false);
    } else if (filterOption === 'created') {
      setShowCreated(true);
      setShowDeleted(false); // Reset "Удаленные" filter state when "Созданные" filter is selected
      setShowServed(false);
      setShowStarted(false);
    } else if(filterOption === 'served') {
      setShowServed(true);
      setShowDeleted(false);
      setShowCreated(false);
      setShowStarted(false);
    } else if(filterOption === 'started') {
      setShowStarted(true);
      setShowDeleted(false);
      setShowCreated(false);
      setShowServed(false);
    } else {
      setShowDeleted(false);
      setShowCreated(false);
      setShowServed(false);
      setShowStarted(false);
    }
  
    setCurrentPage(1); // Reset pagination to the first page when filter changes
  };  
  

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

  function convertCreatedAtToHours(created_at: string) {
    const date = new Date(created_at);
  
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    return `${hours}:${minutes}`;
  }  

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleDropDown = () => {
    if (isDropDownOpen) {
      setIsDropDownOpen(false);
    } else {
      setIsDropDownOpen(true);
      // If "По дате" is clicked, toggle the ascending state
      setAscending((prevState) => !prevState);
      setCurrentPage(1); // Reset pagination to the first page when sorting order changes
    }
  };
  
  const [ascending, setAscending] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Количество элементов на странице

  // Вычисление индексов элементов для текущей страницы
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Отфильтрованный список талонов для текущей страницы
  const currentTalonActions = talonActions
  ? talonActions
      .filter((item: any) =>
        item.event.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (showDeleted ? item.action === 'cancelled' : true) &&
        (showCreated ? item.action === 'created' : true) &&
        (showServed ? item.action === 'served' : true) &&
        (showStarted ? item.action === 'started' : true)
      )
      .sort((a: any, b: any) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return ascending ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
      })
  : [];

  // Функция для переключения на следующую страницу
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Функция для переключен+ия на предыдущую страницу
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  console.log(talonActions)

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
            Протоколы по операторам
          </button>
          <button
            className={`${styles.btn}`}
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
                  {operatorActions?.map((item: any, index: number) => (
                  <div
                  key={`item_${index}`}
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
                   
                  </div>
                  ))}
                  { operatorActions?.length === 0 && (
                    <div className={styles.actionsIsZero} >Действия операторов не наблюдается</div>
                  ) }
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
                <div className={styles.settings} onClick={handleDropDown}>
                  <img src={Settings} alt="" />
                </div>
                {isDropDownOpen && (
                  <Dropdown
                    className={styles.drop__menu}
                    isOpen={isDropDownOpen}
                  >
                      <ul className={styles.drop__catalog}>
                        <Link to={''}>
                          <li className={classNames(styles.drop__catalog__item)} onClick={() => handleFilterChange('date')}>По дате</li>
                          <li className={classNames(styles.drop__catalog__item)} onClick={() => handleFilterChange('cancelled')} >Удаленные</li>
                          <li className={classNames(styles.drop__catalog__item)} onClick={() => handleFilterChange('served')} >Обслуженные</li>
                          <li className={classNames(styles.drop__catalog__item)} onClick={() => handleFilterChange('created')}>Созданные</li>
                          <li className={classNames(styles.drop__catalog__item)} onClick={() => handleFilterChange('started')}>Начали обслуживать</li>
                        </Link>
                      </ul>
                  </Dropdown>
                )}
              </div>
              <div className={styles.search__bar}>
                  <div>
                    <input
                      className={styles.search__input}
                      type="text"
                      placeholder="Поиск талонов"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className={styles.find__btn}>
                    <img src={Search} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.tableItem__tbody}>
              <div className={styles.tableItem__head}>
                <div className={styles.thead__name}>Время</div>
                <div className={styles.thead__window}>Действия </div>
              </div>
              {currentTalonActions?.map((item: any, index: number) => (
              <div
                key={`item_${index}`}
                className={`${styles.tbody__item__talon}`}
                style={
                  item.id % 2 === 1
                    ? { background: 'rgba(248, 248, 248, 1)' }
                    : undefined
                }
              >
                <div className={styles.tbody__time}>
                  <div className={styles.tbody__number}>{ index + 1 }.</div>
                  {formatDate(item.created_at)}
                </div>
                <div className={styles.tbody__actions}>
                  {item.event}
                </div>
                
              </div>
              ))} 
              <div className={styles.pagination}>
                <button disabled={currentPage === 1} onClick={prevPage}>
                  Назад
                </button>
                <button
                  disabled={indexOfLastItem >= (talonActions?.length || 0)}
                  onClick={nextPage}
                >
                  Вперед
                </button>
                {currentTalonActions.length === 0 && (
                  <div className={styles.actionsIsZero}>Нет результатов поиска</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ProtocolPage;
