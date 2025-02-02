import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderCoordinator from './HeaderCoordinator';

const Layout = () => (
  <div>
    <HeaderCoordinator />
    <main className="container ">
      <Outlet />
    </main>
  </div>
);

export default Layout;