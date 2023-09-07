import React from 'react';
import '../styles/login.css';
import '../index.css';
const AuthPagesLayout = ({ children }) => {
  return (
    <main className="authPages login">
      <section className="relative left !bg-white/90 flex overflow-auto">{children}</section>
    </main>
  );
};

export default AuthPagesLayout;
