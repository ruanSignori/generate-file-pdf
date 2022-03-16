import React  from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';

import { BsFilePdf } from 'react-icons/bs';
import { FaCheck, FaUserSlash, FaUserEdit } from 'react-icons/fa';

import Pdf from "../Pdf";

import './DialogBox.css';

export default function DialogBox(props) {
  const userDataLocalStorage = JSON.parse(localStorage.getItem('DataUser'));
  const currentDateLocalStorage = JSON.parse(localStorage.getItem('CurrentDate'));

  if (!userDataLocalStorage || !currentDateLocalStorage) return;

  const lastIndexCurrentDate = currentDateLocalStorage.pop();
  const lastIndexUserData = userDataLocalStorage.pop();

  const reloadPage = (e) => {
    const doc = e.target;
    if (doc.classList.contains('pdf-btn')) return window.location.reload(true);
  }

  return (
    <>
      {props.type === 'delete' &&
        <div className="dialog_box_overview">
          <div className="dialog_box_content">
            <div className="content_msg">
              <div>
                <FaUserSlash className='icon_alert' />
              </div>
              <div>
                <div className='msg_title'>Excluir permanentemente</div>
                <div className='msg_text'>
                  Você tem certeza que deseja excluir este usuário?
                  Todos os dados referente a ele serão removidos permanentemente
                  Esta ação é irreversível.
                </div>
              </div>
            </div>

            <div className="dialog_box_actions">
              <button
                className='btn'
                onClick={props.onClickCancel}>
                  Cancelar
              </button>
              <button
                className='btn btn-danger'
                onClick={props.onClickConfirmation}>
                  Deletar
              </button>
            </div>

          </div>
        </div>
      }

      {props.type === 'sucessSubmit' &&
        <div className="dialog_box_overview">
          <div className="dialog_box_content">
            <div className="content_msg">
              <div>
                <FaCheck className='icon_check' />
              </div>
              <div>
                <div className='msg_title'>Cadastro efetuado com sucesso!</div>
                <div className='msg_text'>
                  Seu cadastro foi salvo, mas ainda não foi gerado nenhum arquivo.
                </div>
              </div>
            </div>

            <div className="dialog_box_actions" onClick={(e) => reloadPage(e)}>

              <button className="pdf-btn no-generate-pdf btn">
                Agora não
              </button>
              <PDFDownloadLink
                className='pdf-btn generate-pdf btn btn-danger'
                document={<Pdf index={userDataLocalStorage.length}/>}
                fileName={`${lastIndexUserData.name.toUpperCase()} - ${lastIndexCurrentDate.replace(/\//g, '-').replace(/.(\d{2}\:){2}\d{2}$/g, '')}`}
              >
                <BsFilePdf
                  style={{
                    width: '20px',
                    height: '38px'
                  }}
                />
                Gerar arquivo
              </PDFDownloadLink>

            </div>

          </div>
        </div>
      }

      {props.type === 'edit' &&
        <div className="dialog_box_overview">
          <div className="dialog_box_content">
            <div className="content_msg">
              <div>
                <FaUserEdit className='icon_edit' />
              </div>
              <div>
                <div className='msg_title'>Concluir alterações</div>
                <div className='msg_text'>
                  Ao confirmar as alterações, os dados que foram informados substituem os dados antigos,
                  deletando-os permanentemente.
                  Esta ação é irreversível
                </div>
              </div>
            </div>

            <div className="dialog_box_actions">
              <button
                className='btn'
                onClick={props.onClickCancel}>
                  Cancelar
              </button>
              <button
                className='btn btn-primary'
                onClick={props.onClickConfirmationEdit}>
                  Confirmar
              </button>
            </div>

          </div>
        </div>
      }
    </>
  );
}
