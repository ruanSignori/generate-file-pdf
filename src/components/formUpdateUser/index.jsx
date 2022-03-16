import React, { useEffect, useState } from 'react';
import { FaUserEdit, FaTimes } from 'react-icons/fa'

import Input from '../input';
import DialogBox from '../dialogBox';

import './FormUpdateUser.css'

export default function FormUpdateUser(props) {

  //Pegar os dados do usuário
  const dataUser = JSON.parse(localStorage.getItem('DataUser'));
  const currentDateLS = JSON.parse(localStorage.getItem('CurrentDate'));

  const [showDialogBox, setShowDialogBox] = useState(false);

  //Dados do usuário, a partir do index, passado através da PROP
  const [currentDataUser, setValueCurrentDataUser] = useState(dataUser[props.index]);
  const [newCurrentDate, setCurrentDate] = useState(currentDateLS[props.index]);
  const [confirmUpdate, setConfirmUpdate] = useState(false);

  //SetState dos inputs que não estão relacionados ao produto
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValueCurrentDataUser({ ...currentDataUser, [name]: value });
  }

  //SetState dos inputs relacionados ao produto (Produto, Quantidade e Preço)
  const handleFieldChange = (index, event) => {
    const { name, value } = event.target;
    const data = currentDataUser.item;
    data[index][name] = value;

    if (name !== 'parts') {
      const inputValueTotal = totalValue(data);
      const formatedInputTotal = formatCurrency(inputValueTotal);
      setValueCurrentDataUser({ ...currentDataUser, total: formatedInputTotal });
    } else {
      setValueCurrentDataUser({ ...currentDataUser, item: data });
    };
  };

  //Calcular a quantidade de produto, vezes o preço, e atribuir isso ao valor total
  const totalValue = (dataValue) => {
    const mult = dataValue.map((data) => {
      return data.price * data.quantity
    });

    return mult.reduce((acc, number) => acc + number, 0);
  };

  //Formatar o número para a uma string em formato de moeda BRL
  const formatCurrency = (value) => {
    value.toFixed(2).replace('.',',');
    const formatedValue = value.toLocaleString('pt-BR',
      {style:'currency', currency: 'BRL'}
    );
    return formatedValue.replace('R$', '');
  };

  //Pegar a data atual que o cadastro foi editado
  // const getCurrentDate = () => {
  //   const date = new Date();
  //   const myCurrentDate = date.toLocaleString('pt-BR');

  //   setCurrentDate(myCurrentDate);
  // };

  useEffect(() => {
    if (confirmUpdate) {
      dataUser.splice(props.index, 1);
      currentDateLS.splice(props.index, 1);
      // -----------------------------------------------------------------------------------------------------> debugger;
      const date = new Date();
      const myCurrentDate = date.toLocaleString('pt-BR');

      dataUser.push(currentDataUser);
      currentDateLS.push(myCurrentDate);

      localStorage.setItem('DataUser', JSON.stringify(dataUser));
      localStorage.setItem('CurrentDate', JSON.stringify(currentDateLS));
    }
  }, [confirmUpdate]);

  return (
    <section className='form-update'>
      <div className='content-form-update'>
        <div className="header-form">
          <div className='flex'>
            <div><FaUserEdit className='icon icon-user-edit' /></div>
            <div className='h5'>Editar usuário</div>
          </div>
          <FaTimes className='icon icon_close icon-action' onClick={props.closeFormEdit}/>
        </div>
        <form style={{ marginTop: 0, borderRadius: '0 0 15px 15px' }}>
            <Input
                label="Nome completo"
                type="name"
                handleInputChange={handleInputChange}
                name="name"
                value={currentDataUser.name}
                required={true}
                autoFocus={true}
              />
            <Input
              label="Telefone"
              type="tel"
              handleInputChange={handleInputChange}
              name="tel"
              value={currentDataUser.tel}
              pattern={'(99) 99999-9999'}
            />
            <div className={`list-products ${currentDataUser.item.length > 2 ? 'scroll-y' : ''}`}>
              {currentDataUser.item.map((item, index) => (
                <div className="group-items" key={index}>
                  <div className='input-group-flex mb-3 scaling'>
                    <Input
                      label="Produto"
                      type="text"
                      handleInputChange={(event) =>
                        handleFieldChange(index, event)}
                      name="parts"
                      value={item.parts}
                      maxLength="500"
                    />
                    <Input
                      optionalClassName="input-quantity"
                      label="Quantidade"
                      type="number"
                      handleInputChange={(event) =>
                        handleFieldChange(index, event)}
                      name="quantity"
                      value={item.quantity}
                    />
                    <Input
                      optionalClassName="input-total"
                      label="Valor"
                      type="number"
                      handleInputChange={(event) =>
                        handleFieldChange(index, event)}
                      name="price"
                      value={item.price}
                    />
                  </div>
                </div>
              ))}
            </div>
          <Input
            optionalClassName="input-total"
            label="Total"
            type="text"
            handleInputChange={handleInputChange}
            name="total"
            value={currentDataUser.total}
          />
          <div className="mb-3">
            <label className="form-label">Observações</label>
            <textarea
              className="form-control"
              rows="3"
              onChange={handleInputChange}
              name="obs"
              value={currentDataUser.obs} />
          </div>
          <div className="mb-3 parent-input-submit">
            <input
              onClick={() => setShowDialogBox(true)}
              value='Salvar alterações'
              className="btn btn-primary btn-lg confirm-form"
            />
          </div>

          {showDialogBox &&
            <DialogBox
              type='edit'
              onClickCancel={props.closeFormEdit}
              onClickConfirmationEdit={() => {
                setConfirmUpdate(true);
              }}
            />
          }
        </form>
      </div>
    </section>
  )
}
