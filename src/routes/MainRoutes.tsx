import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from 'src/layouts/MainLayout';
import { AuthPage } from 'src/pages/AuthPage';
import DataBasePage from 'src/pages/DataBasePage';
import HomePage from 'src/pages/HomePage';
import ProtocolPage from 'src/pages/ProtocolPage';
import QueueSettings from 'src/pages/QueueSettings';
import SoftwareUpd from 'src/pages/SoftwareUpd';
import Statistic from 'src/pages/Statistic';
import UsersEqs from 'src/pages/UsersEqs';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/users" element={<UsersEqs />} />
        <Route path="/admin/database" element={<DataBasePage />} />
        <Route path="/admin/queue-setttings" element={<QueueSettings />} />
        <Route path="/admin/protocol" element={<ProtocolPage />} />
        <Route path="/admin/software/update" element={<SoftwareUpd />} />
        <Route path="/admin/statistic" element={<Statistic />} />
      </Route>
      <Route path="auth" element={<AuthPage />} />
    </Routes>
  );
};

export default MainRoutes;
