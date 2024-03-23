import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
function RootLayout() {
  return (
    <div>
      <Header />
      <div style={{ minHeight: '90vh' }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default RootLayout;
