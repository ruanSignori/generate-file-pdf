import React from 'react';
import { FaCheck } from 'react-icons/fa';

import './Msg-sucess.css';

export default function MSG_Sucess(props) {
  return (
    <>
      <div className='content_msg_sucess'>
        <div className='flex'>
          <div><FaCheck className='icon_check' /></div>
          <div>{props.msg}</div>
        </div>
      </div>
    </>
  )
}
