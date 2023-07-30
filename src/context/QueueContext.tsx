import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';
import { QueueI } from 'src/common/types/queueContext/queueInterfaceAndTypes';
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
    case ACTIONS.oneQueue:
      return { ...state, oneQueue: action.payload };
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
      const res = await $axios.get(`${BASE_URL}/admins/protocol/get_operator_actions/`, {
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

  const deleteUser = async (id:number) => {
    try {
      const resposne = await $axios.delete(`${BASE_URL}/admins/users/${id}/`);
      console.log(resposne.data);
      getActiveUsers();
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

  const addQueue = async (name: string, description: string, symbol: string, services: number, operator: number[]) => {
    try {
      const data = {
        name: name,
        description: description,
        symbol: symbol,
        services: services,
        operator: operator
      }
      const res = await $axios.post(`${BASE_URL}/queues/`, data);
      console.log(res.data);
      getCustomers()
    } catch (error) {
        console.log(error)
    }
  }


  const addCustomer = async (category: string, queue: number) => {
    try {
      const data = {
        category: category,
        queue: queue
      }
      const response = await $axios.post(`${BASE_URL}/customers/`, data);
      console.log(response.data)
      getAllCustomers();
    } catch (error) {
      console.log(error)
    }
  }

  const changeQueue = async (id: number, data: QueueI) => {
    try {
      const response = await $axios.patch(`${BASE_URL}/queues/${id}/`, data);
      console.log(response.data);
      getCustomers();
    } catch (error) {
      console.log(error)
    }
  }

  const getOneQueue = async (id: number) => {
    try {
      const response = await $axios.get(`${BASE_URL}/queues/${id}/`);
      dispatch({
        type: ACTIONS.oneQueue,
        payload: response.data
      })
    } catch (error) {
      console.log(error)
    }
  }

  const postQueueBlock = async (id: number) => {
    try {
      const response = await $axios.post(`${BASE_URL}/admins/${id}/block_queues/`);
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  const postQueueTrans = async (id: number) => {
    try {
      const response = await $axios.post(`${BASE_URL}/admins/${id}/change_auto_transfer/`);
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  }
  
  const postQueueMaxCalls = async (id: number, calls: any) => {
    try {
      const numberedCalls = parseInt(calls, 10);
      const dataCalls = {
        number: numberedCalls
      }
      const response = await $axios.post(`${BASE_URL}/admins/${id}/change_max_calls/`, dataCalls);
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  const postQueueMaxTrans = async (id: number, maxTrans: any) => {
    try {
      const data = {
        number: maxTrans
      }
      const response = await $axios.post(`${BASE_URL}/admins/${id}/change_max_transfers/`, data);
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  const postQueueOperatorWaitingTime = async (id: number, time: any) => {
    try {
      const data = {
        time: time
      }
      const response = await $axios.post(`${BASE_URL}/admins/${id}/change_operator_waiting_time/`, data);
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  const postQueuePrintingTime = async (id: number, start: any, end: any) => {
    try {
      const dataTime = {
        start: start,
        end: end
      }
      const response = await $axios.post(`${BASE_URL}/admins/${id}/change_printing_time/`, dataTime);
      console.log(response.data);
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
    talonActions: state.talonActions,
    addQueue,
    addCustomer,
    changeQueue,
    getOneQueue,
    oneQueue: state.oneQueue,
    deleteUser,
    postQueueBlock,
    postQueueMaxCalls,
    postQueueTrans,
    postQueueMaxTrans,
    postQueueOperatorWaitingTime,
    postQueuePrintingTime,
  };

  return (
    <queueContext.Provider value={value}>{children}</queueContext.Provider>
  );
};
