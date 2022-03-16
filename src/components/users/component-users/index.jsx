import React, { useState } from 'react';

import { FaUser, FaClock, FaEdit, FaTrash, FaAngleDown} from 'react-icons/fa';
import { BsTelephoneFill } from 'react-icons/bs';

import FormUpdateUser from '../../formUpdateUser';
import DialogBox from '../../dialogBox';
import MoreUserInfo from '../../moreUserInfo';

import './ComponentUsers.css';

export default function ComponentUsers(props) {
  const [deleteUser, setDeleteUser] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);

  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [classMoreInfo, setClassMoreInfo] = useState('');
  const [indexUser, setIndexUser] = useState();

  const controlUserDelete = (index) => {
    setIndexUser(index);
    setDeleteUser(true);
  };

  const controlUserUpdate = (index) => {
    setIndexUser(index);
    setUpdateUser(true);
  }

  const moreOptions = (index) => {
    setIndexUser(index);
    showMoreInfo ? setClassMoreInfo('') : setClassMoreInfo('more-info-rotate');
    !showMoreInfo ? setShowMoreInfo(true) : setShowMoreInfo(false);
  };

  const handleHiddenElement = () => {
    setUpdateUser(false);
  }

  return (
    <div className='parent-list-users'>
      <div
        className='child-list-users'
        onDoubleClick={() => moreOptions(props.index)}
      >
        <div className='name-list' title='Nome do cadastro'>
          <FaUser className='icon user' />
          <div>{props.name}</div>
        </div>
        <div className='tel-list'>
          <BsTelephoneFill className='icon tel' />
          <div>{props.tel || 'Vazio'}</div>
        </div>
        <div
          className='date-list'
          title='Data em que o cadastro foi modificado'
        >
          <FaClock className='icon clock' />
          <div>{props.date}</div>
        </div>
        <div className='action-list'>
          <FaTrash
            className='icon-action delete'
            title='Deletar usuário'
            onClick={() => controlUserDelete(props.index)}
          />
          <FaEdit
            className='icon-action edit'
            title='Editar usuário'
            onClick={() => controlUserUpdate(props.index)}
          />
          <FaAngleDown
            className={`icon-action more-info ${classMoreInfo}`}
            title='Mais informações...'
            onClick={() => moreOptions(props.index)}
          />
        </div>
      </div>

      {deleteUser &&
        <DialogBox
          type="delete"
          onClickConfirmation={() => {
            props.deleteUser(indexUser);
            setDeleteUser(false);
          }}
          onClickCancel={() => setDeleteUser(false)}
        />
      }

      {updateUser &&
        <FormUpdateUser
          index={indexUser}
          closeFormEdit={() => setUpdateUser(false)}
          hiddenElements={() => handleHiddenElement()}
        />
      }

      {showMoreInfo &&
        <MoreUserInfo index={indexUser}/>
      }

    </div>
  )
}
