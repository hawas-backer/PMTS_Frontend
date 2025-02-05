import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => (
  <div>
    <Header />
    <main className="container ">
      <Outlet />
    </main>
    <Footer/>
  </div>
);

export default Layout;