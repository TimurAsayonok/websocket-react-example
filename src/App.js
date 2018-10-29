import React, { Component } from 'react';
import io from 'socket.io-client';

import Layout from './components/Layout';

const socketUrl = "http://192.168.1.20:3001/";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null
    }
  }

  componentWillMount() {
    this.onInitSocket();
  }

  render() {
    return (
      <Layout 
        title="Chat"
      />
    );
  }

  onInitSocket = () => {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      console.log('React socket connected');
    })

    this.setState({ socket });
  }
}

export default App;
