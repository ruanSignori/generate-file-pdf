import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';

import { FaHouseUser, FaBookReader, FaShoppingCart, FaListOl, FaCoins } from 'react-icons/fa';
import { BsFileEarmarkPdf } from 'react-icons/bs'

import Pdf from "../Pdf/index";
import './MoreUserInfo.css'


export default function MoreUserInfo(props) {
  const dataUser = JSON.parse(localStorage.getItem('DataUser'));
  const currentDataUser = dataUser[props.index];

  const date = JSON.parse(localStorage.getItem('CurrentDate'));
  const currentDate = date[props.index];


  return (
    <>
      <div className='info_user'>
        <div>
          <div>
            <div className='address_info'>
              <FaHouseUser className='icon_info icon_house'/>
              <div>
                <div className='title_info'>Endereço</div>
                <div className='text_info'>
                  {currentDataUser.address || 'Não especificado'}
                </div>
              </div>
            </div>

            <div className="obs_info">
              <FaBookReader className='icon_info icon_book-Reader' />
              <div>
                <div className="title_info">Observações</div>
                <div className="text_info">{currentDataUser.obs || 'Não especificado'}</div>
              </div>
            </div>
          </div>

          <div className='products_info' >
            <div className='products_header'>
              <div className='flex'>
                <FaShoppingCart className='icon_info icon_shopping' />
                <div className='title_info'>Produto</div>
              </div>
              <div className="flex">
                <FaListOl className='icon_info icon_list' />
                <div className="title_info">Quantidade</div>
              </div>
              <div className="flex">
                <FaCoins className='icon_info icon_coins' />
                <div className="title_info">Valor</div>
              </div>
            </div>
            <hr />
            <div>
              {currentDataUser.item.map((value, index) => (
                <div key={index} className='products_body mb-3'>
                  <div className='text_info'>{value.parts || 'Não especificado'}</div>
                  <div className="text_info">{value.quantity || 'Não especificado'}</div>
                  <div className="text_info">R$ {value.price || '0'}</div>
                </div>
              ))}
            </div>
            <hr />
            <div className="total_info mb-4">
              <div className="title_info">Total</div>
              <div className="text_info">R$ {currentDataUser.total || '0'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className='secondary_actions'>
        <PDFDownloadLink
          className='generate_pdf'
          document={<Pdf index={props.index}/>}
          fileName={`${currentDataUser.name.toUpperCase()} - ${currentDate.replace(/\//g, '-').replace(/.(\d{2}\:){2}\d{2}$/g, '')}`}>
          <div className='parent_icon_pdf'>
            <BsFileEarmarkPdf className='icon_info icon_pdf' />
          </div>
        </PDFDownloadLink>
      </div>
    </>
  )
}


