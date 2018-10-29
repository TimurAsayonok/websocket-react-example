import React from 'react';
import LoginForm from './LoginForm';

const Layout = (props) => {
  const { socket, onsSetUser } = props;
  return (
    <div className="container">
      <LoginForm
        socket={socket}
        onSetUser={onsSetUser}
      />
    </div>
  )
}

export default Layout;