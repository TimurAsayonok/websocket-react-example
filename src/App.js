import React, { Component } from 'react';
import io from 'socket.io-client';

import * as socketActions from './actions/socketActions';
import Layout from './components/Layout';

const socketUrl = "http://192.168.1.20:3001/";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null, 
      user: null
    }
  }

  componentWillMount() {
    this.onInitSocket();
  }

  render() {
    const { socket, user } = this.state;

    return (
      <Layout 
        socket={socket}
        onSetUser={this.onSetUser}
        onLogout={this.onLogout}
        user={user}
      />
    );
  }

  /**
   * Connect and initializes the socket
   */
  onInitSocket = () => {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      console.log('React socket connected');
    })

    this.setState({ socket });
  }


  /**
   * Set the user property in state
   */

  onSetUser = (user) => {
    const { socket } = this.state;
    console.log('onSetUser', user);

    socket.emit(socketActions.USER_CONNECTED, user);
    this.setState({ user })
  }

  /**
  * Set the user property in stаte to null
  */
  onLogout = (user) => {
    const { socket } = this.state;
    socket.emit(socketActions.LOGOUT);
    this.setState({ user: null });
  }
}

export default App;
