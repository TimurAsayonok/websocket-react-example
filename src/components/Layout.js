import React from 'react';

//components
import LoginForm from './LoginForm';
import ChatComponent from './chat/ChatComponent'


const Layout = (props) => {
  const { socket, onSetUser, user, onLogout } = props;
  return (
    <div className="container">
      {
        !user
          ? <LoginForm
            socket={socket}
            onSetUser={onSetUser}
          />
          : <ChatComponent
              socket={socket}
              user={user}
              onLogout={onLogout}
            />
      }
    </div>
  )
}

export default Layout;