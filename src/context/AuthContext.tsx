import { createContext, useContext, useReducer } from 'react';
import { BASE_URL } from '../utils/const';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import $axios from 'src/utils/axios';

import {
  Action,
  AuthState,
  IAuthContextType,
} from 'src/common/types/auth-context';

const authContext = createContext<IAuthContextType | null>(null);

export function useAuthContext(): IAuthContextType {
  const context = useContext(authContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider'
    );
  }
  return context;
}

const initialState: AuthState = {
  user: null,
};

const ACTIONS = {
  user: 'USER',
};

function reducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case ACTIONS.user:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

function AuthContext({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  async function register(credential: any): Promise<void> {
    try {
      await axios.post(`${BASE_URL}/user/users/`, credential);
    } catch (error) {
      console.log(error);
    }
  }

  async function login(credentials: any): Promise<void> {
    try {
      const { data: tokens } = await $axios.post(
        `${BASE_URL}/login/jwt/create/`,
        credentials
      );
      localStorage.setItem('tokens', JSON.stringify(tokens));
      console.log(tokens)
      sessionStorage.setItem('access_token', tokens.access);
      sessionStorage.setItem('refresh_token', tokens.refresh);

      const { data } = await $axios.get(`${BASE_URL}/profile/`);

      dispatch({
        type: ACTIONS.user,
        payload: data,
      });

      if( state.user?.position === 'operator' ) {
        try {
          const res = await $axios.post(`${BASE_URL}/operator/`);
          console.log(res);
        } catch (error) {
          console.log(error)
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  function logout(): void {
    localStorage.removeItem('tokens');
    dispatch({
      type: ACTIONS.user,
      payload: null,
    });
  }

  async function checkAuth(): Promise<void> {
    try {
      const tokens = JSON.parse(localStorage.getItem('tokens') || '');
      if (tokens) {
        const { data } = await $axios.get(`${BASE_URL}/user/profile/`);

        dispatch({
          type: ACTIONS.user,
          payload: data,
        });
      } else {
        dispatch({
          type: ACTIONS.user,
          payload: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function activateUser(uid: string, token: string): Promise<void> {
    try {
      await axios.post(`${BASE_URL}/user/users/activation/`, {
        uid,
        token,
      });
      navigate('/auth');
    } catch (error) {
      console.log(error);
    }
  }

  const addUser = async (email: string, username: string) => {
    const data = {
      email: email,
      username: username
    }
    try {
      const resposne = await $axios.post(`${BASE_URL}/admins/users/`, data);
      console.log(resposne?.data);
    } catch (error) {
      console.log(error)
    }
  }

  const value: IAuthContextType = {
    user: state.user,
    register,
    login,
    activateUser,
    logout,
    checkAuth,
    addUser
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthContext;
