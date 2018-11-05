import React, { Component } from 'react';
import _ from 'lodash';

import { FaEllipsisV } from 'react-icons/fa';


// import * as socketActions from '../../../actions/socketActions';

const ChatHeader = ({ name, numberOfUsers }) => {
  return (
    <div
      id="chat-header"
      className="header-chat py-3"
    >
      <div className="mx-3 d-flex justify-content-between align-items-center">
        <div className="user-info">
          <div className="user-name">{name}</div>
          <div className="status">
            <div className="indicator"></div>
            <span>{numberOfUsers ? numberOfUsers : null}</span>
          </div>
        </div>
        <i className="options-icon"><FaEllipsisV /></i>
      </div>
    </div>
  );
}

export default ChatHeader;