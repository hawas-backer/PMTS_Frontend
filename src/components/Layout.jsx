import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderCoordinator from './HeaderCoordinator';

const Layout = () => (
  <div>
    <HeaderCoordinator />
    <main className="container mx-auto mt-4">
      <Outlet />
    </main>
  </div>
);

export default Layout;