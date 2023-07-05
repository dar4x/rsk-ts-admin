import React, { FC, useState } from 'react';
import styles from './DeleteModal.module.scss';

const DeleteModal: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTicketNumber, setSelectedTicketNumber] = useState('');

  const handleDeleteConfirm = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <p>
          Вы действительно хотите удалить <br /> очередь{' '}
          <span className={styles.modalSpan}>№{selectedTicketNumber}</span>
        </p>
        <div className={styles.modalButtons}>
          <button
            onClick={() => setShowModal(false)}
            className={styles.cancelBTN}
          >
            Отмена
          </button>
          <button onClick={handleDeleteConfirm} className={styles.deleteBTN}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
