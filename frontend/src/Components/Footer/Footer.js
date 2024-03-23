import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="bg-dark text-light d-flex justify-content-around p-3">
      <address>
        <p className="lead">PVPSIT</p>
        <p className="lead">Vijayawada</p>
      </address>
      <div>
        <p className="lead">pvpsit@mail.com</p>
        <p className="lead">999999999</p>
      </div>
    </div>
  );
}

export default Footer;
