export type User = {
  email: string;
  position: any
  id: number
};

export type AuthState = {
  user: User | null;
  oneUserProfile: any,
  Updatedusers: [],
  tcp: any
};

export type Action = {
  type: string;
  payload: any;
};

export interface IAuthContextType {
  user: User | null;
  Updatedusers: []
  register: (credential: any) => Promise<void>;
  login: (credentials: any) => Promise<void>;
  activateUser: (uid: string, token: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  addUser: any;
  getOneUserProfile: any,
  oneUserProfile: any,
  changeUser: any,
  tcp: any,
  changeTCP: any,
  getTCPConfig: any
}
