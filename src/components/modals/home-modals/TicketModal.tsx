import { useState, useEffect } from 'react';
import { BASE_URL } from '../../../utils/const';
import styles from '../../../pages/HomePage.module.scss';
import TimeSVG from '../../../assets/images/pepicons-print_clock.svg';
import StreamLineSVG from '../../../assets/images/streamline.svg';
import CloseSVG from '../../../assets/images/Close6.svg';

interface TicketInfo {
  ticket_number: string;
  queue: string;
  minutes_in_queue: number;
  category: string;
  first_name: string;
  last_name: string;
  surname: string;
}

const TicketModal: React.FC<{ ticketId: any; closeModal: () => void }> = ({
  ticketId,
  closeModal,
}) => {
  const [ticketInfo, setTicketInfo] = useState<TicketInfo | null>(null);

  const [editDataTicket, setEditDataTicket] = useState(false);

  useEffect(() => {
    const fetchTicketInfo = async () => {
      try {
        const response = await fetch(`${BASE_URL}/customers/${ticketId}`);
        const data = await response.json();
        setTicketInfo(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTicketInfo();
  }, [ticketId]);

  const convertTime = (timeInMinutes: number) => {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    return `${hours}ч ${minutes}мин`;
  };

  return (
    <>
      <div className={styles.modal2}>
        <div className={styles.modalContent2}>
          {ticketInfo ? (
            <>
              <div className={styles.modalHeader}>
                <div className={styles.modalTime}>
                  <img src={TimeSVG} alt="" />
                  <span>{convertTime(ticketInfo.minutes_in_queue)}</span>
                </div>
                <img
                  src={CloseSVG}
                  className={styles.closeSVGBTN}
                  onClick={closeModal}
                />
                <div className={styles.modalInfo}>
                  <div className={styles.modalInfo__talon__question}>
                    <div className={styles.modalInfo__talon}>
                      <span
                        style={
                          ticketInfo.category === 'pregnant'
                            ? { background: 'rgba(252, 190, 183, 1)' }
                            : ticketInfo.category === 'veteran'
                            ? { background: 'rgba(155, 228, 129, 1)' }
                            : ticketInfo.category === 'pensioner'
                            ? { background: 'rgba(234, 237, 93, 1)' }
                            : ticketInfo.category === 'disabled person'
                            ? { background: 'rgba(228, 129, 201, 1)' }
                            : undefined
                        }
                      ></span>
                      <div className={styles.talonInfo}>
                        {ticketInfo.ticket_number}
                      </div>
                    </div>
                    <div className={styles.modalInfo__quesiton}>
                      {ticketInfo.queue}
                    </div>
                  </div>
                </div>
                <div className={styles.modalData}>
                  <div className={styles.modalData__item}>Данные клиента</div>
                  <div className={styles.modalData__item}>
                    <img
                      src={StreamLineSVG}
                      onClick={(e) => {
                        setEditDataTicket(true);
                      }}
                      className={styles.streamLine}
                    />
                  </div>
                </div>
                <form className={styles.modalData__form}>
                  {editDataTicket ? (
                    <>
                      <input
                        type="text"
                        placeholder="first_name"
                        className={styles.editData__name}
                      />
                      <input
                        type="text"
                        placeholder="last_name"
                        className={styles.editData__lastName}
                      />
                      <input
                        type="text"
                        placeholder="surname"
                        className={styles.editData__surname}
                      />
                      <input
                        type="text"
                        placeholder="passport"
                        className={styles.editData__passport}
                      />
                      <input
                        type="date"
                        placeholder="date"
                        className={styles.editData__date}
                      />
                      <input
                        type="phone"
                        placeholder="phone"
                        className={styles.editData__phone}
                      />
                      <input
                        type="text"
                        placeholder="category"
                        className={styles.editData__category}
                      />
                    </>
                  ) : (
                    <>
                      <input
                        className={styles.modalData__name}
                        readOnly
                        placeholder={ticketInfo.first_name}
                      />
                      <input
                        className={styles.modalData__lastName}
                        readOnly
                        placeholder={ticketInfo.last_name}
                      />
                      <input
                        className={styles.modalData__surname}
                        readOnly
                        placeholder={ticketInfo.surname}
                      />
                      <input
                        className={styles.modalData__passport}
                        readOnly
                        placeholder="ID 421234"
                      />
                      <input
                        className={styles.modalData__date}
                        readOnly
                        placeholder="12.03.2003"
                      />
                      <input
                        className={styles.modalData__phone}
                        readOnly
                        placeholder="+996 778342132"
                      />
                      <input
                        className={styles.modalData__category}
                        readOnly
                        placeholder={ticketInfo.category}
                      />
                    </>
                  )}
                </form>
              </div>
            </>
          ) : (
            <div>
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TicketModal;
