import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa/';

import Input from '../input';
import DialogBox from '../dialogBox';
import './Form.css';

export default function Form() {
  const [dataUser, setDataUser] = useState({
    name: '',
    tel: '',
    address: '',
    item: [
      { parts: '', quantity: '', price: '' }
    ],
    total: '',
    obs: '',
  })

  const [currentDate, setCurrentDate] = useState([]);
  const [showDialogBox, setShowDialogBox] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataUser({ ...dataUser, [name]: value});
  };

  const handleFieldChange = (index, event) => {
    const { name, value } = event.target;
    const data = dataUser.item;

    data[index][name] = value;

    if (name !== 'parts') {
      const total = totalValue(data);
      const formattedTotalValue = formatCurrency(total);
      setDataUser({...dataUser, total: formattedTotalValue});
    } else {
      setDataUser({ ...dataUser, item: data });
    }
  };

  const handleAddField = (e) => {
    e.preventDefault();
    setDataUser((prevState) => ({
      ...dataUser, item:
        [...prevState.item, { parts: '', quantity: '', price: '' }]
    }));
  };

  const handleRemoveFields = (e, index) => {
    e.preventDefault();

    if (dataUser.item.length - 1 === 0) return;

    dataUser.item.splice(index, 1);
    setDataUser({
      ...dataUser, item: [...dataUser.item]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    getCurrentDate();

    const lsDataUser = JSON.parse(localStorage.getItem('DataUser'));
    const lsCurrentDate = JSON.parse(localStorage.getItem('CurrentDate'));
    const documentNumber = Number(localStorage.getItem('CurrentDocumentNumber')) || 0;

    let data = [dataUser];

    //Se localStorage estiver vazio, então é a primeira vez que está sendo adicionado algum valor
    if (!lsDataUser && !lsCurrentDate) {
      localStorage.setItem('DataUser', JSON.stringify(data));
      localStorage.setItem('CurrentDate', JSON.stringify(currentDate));
    } else {
      lsDataUser.push(...data);
      lsCurrentDate.push(...currentDate);
      localStorage.setItem('DataUser', JSON.stringify(lsDataUser));
      localStorage.setItem('CurrentDate', JSON.stringify(lsCurrentDate));
    };

    localStorage.setItem('CurrentDocumentNumber',JSON.stringify(documentNumber + 1));
    setShowDialogBox(true);
  };

  const totalValue = (dataValue) => {
    const mult = dataValue.map((data) => {
      return data.price * data.quantity
    });

    return mult.reduce((accumulator, number) => accumulator + number, 0);
  };

  const getCurrentDate = () => {
    const date = new Date();
    const myCurrentDate = date.toLocaleString('pt-BR');

    setCurrentDate({
      ...currentDate.push(myCurrentDate)
    });
  };

  const formatCurrency = (value) => {
    value.toFixed(2).replace('.',',');
    value.toLocaleString('pt-BR', {style:'currency', currency: 'BRL'});
    return value.toLocaleString('pt-br', { minimumFractionDigits: 2 });
  }

  return (
    <section className="add-user" >
      <form onSubmit={handleSubmit}>
        <Input
          label="Nome completo"
          type="name"
          handleInputChange={handleInputChange}
          name="name"
          value={dataUser.name}
          required={true}
          autoFocus={true}
        />

        <Input
          label="Telefone"
          type="tel"
          handleInputChange={handleInputChange}
          name="tel"
          value={dataUser.tel}
          pattern={'(99) 99999-9999'}
        />

        <Input
          label="Endereço"
          type="text"
          handleInputChange={handleInputChange}
          name="address"
          value={dataUser.address}
        />

        {dataUser.item.map((item, index) => (
          <div className="group-items" key={index}>
            <div className={'input-group-flex mb-3 scaling'}>
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
                maxLength='11'
              />

              <div id="button-field">
                <button
                  className="btn btn-danger remove-field"
                  onClick={(e) => handleRemoveFields(e, index)}>
                  <FaMinus />
                </button>
                <button
                  className="btn create-new-field btn-primary"
                  onClick={handleAddField}>
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        ))}

        <Input
          optionalClassName="input-total"
          label="Total"
          type="text"
          handleInputChange={handleInputChange}
          name="total"
          value={dataUser.total}
        />

        <div className="mb-3">
          <label className="form-label">Observações</label>
          <textarea
            className="form-control"
            rows="3"
            onChange={handleInputChange}
            name="obs"
            value={dataUser.obs} />
        </div>

        <div className="mb-3 parent-input-submit">
          <input
            type="submit"
            value='Cadastrar usuário'
            className="btn btn-primary btn-lg confirm-form"
          />
        </div>

        {showDialogBox &&
          <DialogBox type="sucessSubmit"/>
        }

      </form>
    </section>
  );
}
