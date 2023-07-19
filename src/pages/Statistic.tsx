import React, { useState } from 'react';
import styles from './Stat.module.scss';
import { LineChart, data, options } from '../components/Chart';
import { useDataBaseContext } from 'src/context/DatabaseContext';
import { writeFile } from 'xlsx';


function Statistics() {
  const { dayReport, stat } = useDataBaseContext();
  
  const [ date, setDate ] = useState('');
  
  return (
    <div className={styles.header}>
      <div className={styles.stat_bar}>
        <div>
          <h1 className={styles.title}>Статистика</h1>
        </div>
        <div className={styles.timelaps}>
          <button onClick={() => {
            const today = new Date().toISOString().slice(0, 10);
            setDate(today)
            handleDateReportClick(date)
            }} >Сегодня</button>
          <button>За неделю</button>
          <button>За месяц</button>
          <button>за 3 месяца</button>
          <button>За полгода</button>
          <button>За год</button>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
