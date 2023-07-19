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
  customers: [],
  operatorActions: [],
  talonActions: []
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
    case ACTIONS.operatorActions:
      return { ...state, operatorActions: action.payload };
    case ACTIONS.talonActions:
      return { ...state, talonActions: action.payload };
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
      const res = await $axios.delete(`${BASE_URL}/customers/${id}`);
      getAllCustomers();
    } catch (error) {
      console.log(error);
    }
  }


  async function deleteMainQueue(id: number) {
    try {
      await $axios.delete(`${BASE_URL}/queues/${id}/`)
      getCustomers()
    } catch (error) {
      console.log(error)
    }
  }

  async function getOperatorActions() {
    try {
      const token = sessionStorage.getItem('access_token');
      const res = await $axios.get(`http://35.184.55.194/admins/protocol/get_operator_actions/`, {
        headers: {
          "Authorization": `Token ${token}`
        }
      });
      console.log(res)
      dispatch({
        type: ACTIONS.operatorActions,
        payload: res.data
      })
    } catch (error) {
      console.log(error) 
    }
  }

  async function getTalonActions() {
    try {
      const token = sessionStorage.getItem('access_token');
      const res = await $axios.get(`${BASE_URL}/admins/protocol/get_customer_actions/`, {
        headers: {
          "Authorization": `Token ${token}`
        }
      })
      console.log(res)
      dispatch({
        type: ACTIONS.talonActions,
        payload: res.data
      })
    } catch (error) {
      console.log(error)
    }
  }

  

  const getActiveUsers = async () => {
    try {
      const res = await $axios.get(`${BASE_URL}/admins/get_online_operators/`);
      console.log(res)
      dispatch({
        type: ACTIONS.users,
        payload: res.data
      })
    } catch (error) {
      console.log(error)
    }
  }


  const getAllCustomers = async () => {
    try {
      const res = await $axios.get(`${BASE_URL}/customers/`);
      const filteredCustomers = res.data.results.filter((customer: any) => customer.is_served === null);
      dispatch({
        type: ACTIONS.customers,
        payload: filteredCustomers
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
    customers: state.customers,
    deleteMainQueue,
    getOperatorActions,
    operatorActions: state.operatorActions,
    getTalonActions,
    talonActions: state.talonActions
  };

  return (
    <queueContext.Provider value={value}>{children}</queueContext.Provider>
  );
};
