import axios from 'axios';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';
import $axios from 'src/utils/axios';
import { ACTIONS, BASE_URL } from 'src/utils/const';

interface QueueTypes {
  queues: object;
}

const queueContext = createContext<QueueTypes | any>(null);

export function useQueueContext() {
  return useContext(queueContext);
}

export interface QueueProps {
  children?: React.ReactNode | any;
}

const initState = {
  queue: [],
  oneQueue: null,
  rejectedQueue: [],
  users: [],
  customers: []
};

let newQueues = [];

function reducer(state: any, action: any) {
  switch (action.type) {
    case ACTIONS.queues:
      return { ...state, queues: action.payload };
    case ACTIONS.rejectedQueue:
      return { ...state, rejectedQueue: action.payload };
    case ACTIONS.users:
      return { ...state, users: action.payload };
    case ACTIONS.customers:
      return { ...state, customers: action.payload };
    default:
      return state;
  }
}

export const QueueContext = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initState);

  async function getCustomers() {
    try {
      const res = await $axios.get(`${BASE_URL}/queues/`);
      dispatch({
        type: ACTIONS.queues,
        payload: res.data.results,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteQueue(id: number) {
    try {
      const res = await axios.delete(`${BASE_URL}/customers/${id}`);
      getCustomers();
    } catch (error) {
      console.log(error);
    }
  }

  

  const getActiveUsers = async () => {
    try {
      const res = await $axios.get(`${BASE_URL}/admins/users/`);
      dispatch({
        type: ACTIONS.users,
        payload: res.data.results
      })
    } catch (error) {
      console.log(error)
    }
  }


  const getAllCustomers = async () => {
    try {
      const res = await $axios.get(`${BASE_URL}/customers/`);
      dispatch({
        type: ACTIONS.customers,
        payload: res.data.results
      })
    } catch (error) {
      console.log(error)
    }
  }
  

  const value = {
    getCustomers,
    queues: state.queues,
    deleteQueue,
    getActiveUsers,
    users: state.users,
    getAllCustomers,
    customers: state.customers
  };

  return (
    <queueContext.Provider value={value}>{children}</queueContext.Provider>
  );
};
