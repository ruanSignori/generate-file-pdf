import React, { useEffect, useMemo, useState } from "react";
import { FaUserAltSlash } from 'react-icons/fa'

import NoneRegister from "../none-register";
import ComponentUsers from "./component-users";
import MSG_Sucess from '../msg-sucess'
import './User.css';

const NoUserFiltered = () => {
  return (
    <div className="no_user_filtered">
      <div className="flex">
        <div className="icon_no_user">
          <FaUserAltSlash />
        </div>
        <div>
          Cadastro não encontrado!
        </div>
      </div>
    </div>
  );
}

export default function Users() {
  const [dataUser, setDataUser] = useState(JSON
    .parse(localStorage.getItem('DataUser')));
  const [currentDate] = useState(JSON
    .parse(localStorage.getItem('CurrentDate')));

  const [search, setSearch] = useState('');
  const [showMsgSucess, setShowMsgSucess] = useState(false);

  if (!dataUser) return <NoneRegister />;

  const confirmationDeletingUser = (indexUser) => {
    const copyDataUser = dataUser;
    copyDataUser.splice(indexUser, 1);
    currentDate.splice(indexUser, 1);

    if (!dataUser.length && !currentDate.length) {
      localStorage.removeItem('DataUser');
      localStorage.removeItem('CurrentDate');
    } else {
      localStorage.setItem('DataUser', JSON.stringify(dataUser));
      localStorage.setItem('CurrentDate', JSON.stringify(currentDate));
    }

    setShowMsgSucess(true)
    setDataUser([...copyDataUser]);
  }

  useEffect(() => {
    showMsgSucess &&
      setTimeout(() => {
        setShowMsgSucess(false);
      }, 3500);
  }, [showMsgSucess]);

  const searchFiltred = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return dataUser.filter(value =>
      value.name.toLowerCase().includes(lowerSearch));
  }, [search, dataUser]);

  return (
    <>
      {dataUser &&
          <div className="list-user">
            <div className="content-table">
              <div className="header-table grid_table">
                <div>Nome</div>
                <div>Telefone</div>
                <div>Última modificação</div>
                <div>
                  <input
                    type="text"
                    placeholder="Pesquisar..."
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="body-list ">
                {searchFiltred.map((value, index) => (
                  <div key={index} className="alternate-background">
                    <ComponentUsers
                      index={index}
                      name={value.name.toUpperCase()}
                      tel={value.tel}
                      date={currentDate[index]}
                      deleteUser={() => confirmationDeletingUser(index)}
                    />
                  </div>
                ))}

                {!searchFiltred.length &&
                  <NoUserFiltered />
                }
              </div>
            </div>

            <div className="footer-table">
              <div>
                <div>Total de cadastros: </div>
                <div className="badge bg-primary">{dataUser.length}</div>
              </div>
            </div>
        </div>
      }

      {showMsgSucess &&
        <MSG_Sucess msg="Cadastro excluído com sucesso" />
      }
    </>
  )
}
