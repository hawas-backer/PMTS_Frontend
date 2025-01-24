import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './HeaderCoordinator';

const Layout = () => (
  <div>
    <Header />
    <main className="container mx-auto mt-4">
      <Outlet />
    </main>
  </div>
);

export default Layout;