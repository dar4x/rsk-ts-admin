export type User = {
  email: string;
  position: any
};

export type AuthState = {
  user: User | null;
};

export type Action = {
  type: string;
  payload: any;
};

export interface IAuthContextType {
  user: User | null;
  register: (credential: any) => Promise<void>;
  login: (credentials: any) => Promise<void>;
  activateUser: (uid: string, token: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}
