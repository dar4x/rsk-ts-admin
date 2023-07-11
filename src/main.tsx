import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import AuthContext from './context/AuthContext';
import { DataBaseContext } from './context/DatabaseContext';
import { QueueContext } from './context/QueueContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthContext>
      <QueueContext>
        <DataBaseContext>
          <App />
        </DataBaseContext>
      </QueueContext>
    </AuthContext>
  </BrowserRouter>
);
