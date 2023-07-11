import React, { useState } from 'react';
import styles from './Stat.module.scss';
import { LineChart, data, options } from '../components/Chart';
import { useDataBaseContext } from 'src/context/DatabaseContext';

function Statistics() {
  const { dayReport, stat } = useDataBaseContext();
  const [ date, setDate ] = useState('');


  function downloadExcelFile(data: any, filename: any) {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  
    // Освободить ресурсы URL.createObjectURL
    URL.revokeObjectURL(url);
  }

  console.log(stat)

  const handleDateReportClick = async (date: any) => {
    try {
      const response = await dayReport(date);
      
      const data = stat;

      // Здесь вы можете указать желаемое имя файла для скачивания
      const filename = 'report.xlsx';

      // Скачать файл Excel
      downloadExcelFile(data, filename);
    } catch (error) {
      // Обработка ошибок при выполнении запроса
      console.error('Ошибка при получении отчета', error);
    }
  };

  

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
