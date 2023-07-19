import React, { useEffect, useState } from 'react';
import styles from './Users.module.scss';
import GalaAdd from '../assets/images/gala_add.svg';
import Edit from '../assets/images/fluent_edit-20-regular.svg';
import Remove from '../assets/images/ep_remove.svg';
import { useQueueContext } from 'src/context/QueueContext';

function UsersEqs() {
  let index = '';
  let item = '';

  const { getActiveUsers, users } =
    useQueueContext();

  useEffect(() => {
    getActiveUsers();
  }, []);

  const [editStates, setEditStates] = useState(users.map(() => false));

  const handleEditClick = (index: number) => {
    const newEditStates = [...editStates];
    newEditStates[index] = true;
    setEditStates(newEditStates);
  };

  const handleSaveClick = (index: number) => {
    const newEditStates = [...editStates];
    newEditStates[index] = false;
    setEditStates(newEditStates);
  };


  console.log(users)

  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.users}>
          <div className={styles.users__title}>
            Количество активных очередей
          </div>
          <div className={styles.circles}>
            <div className={styles.queue__state__counter}>{ users?.length }</div>
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
                { users?.map((item: any, index: number) => (
                  <>
                    <div className={`${styles.tbody__item__talon}`} key={item.id} >
                    <div className={styles.tbody__talon}>
                      <div className={styles.tbody__name} style={{ width: "40px", display: "flex", gap: "33px" }}>{index + 1}.</div>
                      {item.first_name}
                    </div>
                    <div className={styles.tbody__question}>
                      { item.position === "operator" ? "Оператор" : item.position }
                    </div>
                    <div className={styles.tbody__window}>Окно №{ item.window_number }</div>
                    {/* <div className={styles.tbody__buttons}>
                      <div className={styles.edit} onClick={() => handleEditClick(index)} >
                        <img src={Edit} className={styles.editIcon} />
                      </div>
                      <img
                        src={Remove}
                        className={styles.tripledots}
                        // onClick={() =>
                        //   handleOptionsClick(item.id, item.ticket_number)
                        // }
                      />
                    </div> */}
                  </div>
                  { editStates[index] && (
                    <form className={styles.editForm} >
                      <input type="text" placeholder='Введите ФИО' className={styles.fio}/>
                      <input type="text" placeholder='Введите должность' className={styles.job}/>
                      <input type="text" placeholder='Введите номер окна' className={styles.window}/>
                      <button onClick={() => handleSaveClick(index)} className={styles.btn_f} >Сохранить</button>
                    </form>
                  ) }
                  </>
                )) }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersEqs;
