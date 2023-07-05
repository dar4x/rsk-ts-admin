import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import AuthContext from './context/AuthContext';
import { QueueContext } from './context/QueueContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthContext>
      <QueueContext>
        <App />
      </QueueContext>
    </AuthContext>
  </BrowserRouter>
);
