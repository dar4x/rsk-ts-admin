import axios from 'axios';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';
import { data } from 'src/components/Chart';
import $axios from 'src/utils/axios';
import { ACTIONS, BASE_URL } from 'src/utils/const';

interface DatabaseTypes {
  databeses: object;
}

const databaseContext = createContext<DatabaseTypes | any>(null);

export function useDataBaseContext() {
  return useContext(databaseContext);
}

export interface DataBaseProps {
  children?: React.ReactNode | any;
}

const initState = {
  databases: [],
  stat: []
};



function reducer(state: any, action: any) {
  switch (action.type) {
    case ACTIONS.databases:
      return { ...state, databases: action.payload };
    case ACTIONS.stat:
      return { ...state, stat: action.payload };
    default:
      return state;
  }
}

export const DataBaseContext = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const getDatabase = async () => {
    try {
      const res = await $axios.get(`${BASE_URL}/admins/backups/get_backups/`);
      dispatch({
        type: ACTIONS.databases,
        payload: res.data.reverse()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const createDataBase = async (data_name: string) => {
    try {
        const newData_name = {
            backup_name: data_name
        }
        const res = await $axios.post(`${BASE_URL}/admins/backups/create_backup/`, newData_name)
        console.log(res.data, "Создано!");
        getDatabase()
    } catch (error) {
        console.log(error)
    }
  }

  // Statistics (время до дедлайна мало осталось.);

  const dayReport = async (date: string) => {
    try {
      const res = await $axios.get(`${BASE_URL}/reports/customers-cancelled/excel/get_day_report/`);
      
      dispatch({
        type: ACTIONS.stat,
        payload: res.data
      })
    } catch (error) {
      console.log(error)
    }
  }
  

  const value = {
    createDataBase,
    getDatabase,
    databases: state.databases,
    dayReport,
    stat: state.stat
  };

  return (
    <databaseContext.Provider value={value}>{children}</databaseContext.Provider>
  );
};
