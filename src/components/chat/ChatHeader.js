import React, { Component } from 'react';
import _ from 'lodash';

import { FaSearch } from 'react-icons/fa';
import { MdEject } from 'react-icons/md';


// import * as socketActions from '../../../actions/socketActions';

const ChatHeader = ({ name, numberOfUsers }) => {
  return (
    <div id="chat-header">
      <div className="user-info">
        <div className="user-name">{name}</div>
        <div className="status">
          <div className="indicator"></div>
          <span>{numberOfUsers ? numberOfUsers : null}</span>
        </div>
      </div>
      <div className="options">
        
      </div>
    </div>
  );
}

export default ChatHeader;