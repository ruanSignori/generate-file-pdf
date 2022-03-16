import React from 'react';
import { FaUser, FaDollarSign } from 'react-icons/fa';

import NoneRegister from '../none-register';
import './Stats.css';

export default function Stats() {
  const dataUser = JSON.parse(localStorage.getItem('DataUser'));
  if (!dataUser) return <NoneRegister />

  const lastUser = dataUser[dataUser.length - 1];
  const allTotalValues = dataUser.map(value => Number(value.total.replace(/\D/g , '')));
  let total = allTotalValues.reduce((acc, total) => acc + total, 0);

  const formatReal = int => {
    let tmp = int + '';
    tmp = tmp.replace(/(\d{2})$/g, ",$1");
    if (tmp.length > 6) tmp = tmp.replace(/(\d{3}),(\d{2}$)/g, ".$1,$2");
    return tmp;
  }

  total = formatReal(total)
  return (
    <>
      {dataUser &&
        <section className='content-stats'>
          <div className="overview-stats data-last-user">
            <div className='title-overview'>
              <h4>Último cadastro</h4>
            </div>
            <div className='name'>
              <div className='tag-data' style={{ maxWidth: '300px' }}>Nome</div>
              <div className='data-value'>{lastUser.name}</div>
            </div>
            <div className='n-tel'>
              <div className='tag-data'>N° telefone</div>
              <div className='data-value'>{lastUser.tel || '...'}</div>
            </div>
            <div className='address'>
              <div className='tag-data'>Endereço</div>
              <div className='data-value'>{lastUser.address || '...'}</div>
            </div>
            <div className='data-value-item item'>
              <div>
                <div className='tag-data'>Produto</div>
                <div className='tag-data'>Quantidade</div>
                <div className='tag-data'>Preço</div>
              </div>
              <hr />
              {lastUser.item.map((item, index) => (
                <div key={index} className='value-products' >
                  <div className='data-value'>{item.parts || '...'}</div>
                  <div className='data-value'>{item.quantity || '...'}</div>
                  <div className='data-value'>{item.price || 'R$ 0,00'}</div>
                </div>
              ))}
            </div>
            <div className='total'>
              <div className='tag-data'>Total</div>
              <div className='data-value'>{lastUser.total || 'R$ 0,00'}</div>
            </div>
            <div className='obs'>
              <div className='tag-data'>Observações</div>
              <div className='data-value'>{lastUser.obs || '...'}</div>
            </div>
          </div>

          <div className="overview-stats preview-total-values">
            <div>
              <h4>Total de cadastrados</h4>
            </div>
            <div className='total-item quantity-users'>
              <FaUser />
              {dataUser.length}
            </div>
          </div>
          <div className="overview-stats preview-total-values">
            <div>
              <h4>Valor total recebido</h4>
            </div>
            <div className='total-item total-received'>
              <FaDollarSign />
              {total}
            </div>
          </div>
        </section>
      }
    </>
  )
}
