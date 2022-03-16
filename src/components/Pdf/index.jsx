import React from 'react';
import {
  Document,
  Page,
  View,
  Image,
  Text,
  StyleSheet,
  Font
} from '@react-pdf/renderer';

import GhLogo from '../../Image/gh.png';
import Verdana from '../../Styles/Fonts/verdana.ttf'
import VerdanaBold from '../../Styles/Fonts/verdanaBold.ttf'

Font.register({
  family: 'Verdana',
  fonts: [
    { src: Verdana },
    { src: VerdanaBold, fontWeight: 800 }
  ]
});

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  page: {
    width: '100%',
    height: '100%',
    fontFamily: 'Verdana',
    padding: 30,
  },
  pageView: {
    width: '100%',
    height: '100%',
    border: 2,
    marginRight: 10
  },
  header: {
    borderBottom: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  image: {
    width: '75%',
    margin: 10
  },
  dataHeader: {
    width: '25%',
    height: '100%',
    fontSize: 9,
    borderLeft: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'flex-start'
  },
  textHeader: {
    alignContent: 'flex-start',
    padding: 2,
    paddingBottom: 22
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
  },
  serviceProvider: {
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 15
  },
  flex: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  thead: {
    marginTop: 25,
    marginHorizontal: -10,
    padding: 10,
    borderTop: 2,
    borderBottom: 2,
    width: '104%'
  },
  tbody: {
    marginHorizontal: -10,
    borderBottom: 1,
    width: '104%',
    paddingHorizontal: 5,
    paddingVertical: 8
  },
  tfoot: {
    width: '104%',
    marginHorizontal: -10,
    borderBottom: 2,
    paddingHorizontal: 5,
    paddingVertical: 8
  },
  obs: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
})

export default function Pdf(props) {
  const userDataLocalStorage = JSON.parse(localStorage.getItem('DataUser'));
  const currentUserData = userDataLocalStorage[props.index];

  const currentDateLocalStorage = JSON.parse(localStorage.getItem('CurrentDate'));
  const currentDate = currentDateLocalStorage[props.index];

  const currentDocumentNumber = localStorage.getItem('CurrentDocumentNumber');

  const formatedCurrency = (value) => {
    const numberValue = Number(value);
    numberValue.toFixed(2);
    numberValue.toFixed(2).replace('.','.');
    return numberValue.toLocaleString('pt-BR', {style:'currency', currency: 'BRL'});
  }

  const editDocumentNumber = () => `000${currentDocumentNumber}`
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.pageView}>
          <View style={styles.header}>
            <Image src={GhLogo} style={styles.image}/>
            <View style={styles.dataHeader}>
              <View style={[styles.textHeader,{ borderBottom: 2,}]}>
                <Text style={{fontSize: 8, marginBottom: 3}}>
                    Data e hora de criação
                </Text>
                <Text style={ styles.bold }> {currentDate}</Text>
              </View>
              <View style={styles.textHeader}>
                <Text style={{fontSize: 8, marginBottom: 3}}>
                  Documento
                </Text>
                <Text style={[ styles.bold, {textIndent: 0}]}>
                  N° {editDocumentNumber()}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.serviceProvider}>
            <Text style={styles.title}>Prestador de Serviços</Text>
            <View style={{ marginTop: 4 }}>
              <View style={{ fontSize: 10}}>
                <Text style={{ marginTop: 5 }}>CNPJ:
                  <Text style={styles.bold}> 00.000.000/0000-00</Text>
                </Text>

                <Text style={{ marginTop: 5 }}>Nome Fantasia:
                  <Text style={styles.bold}>Exemplo</Text>
                </Text>

                <Text style={{ marginTop: 5 }}>Nome/Razão Social:
                  <Text style={styles.bold}>Exemplo</Text>
                </Text>

                <View style={[styles.flex, { marginTop: 5, width: '85%', }]}>
                  <Text>Endereço:
                    <Text style={styles.bold}>Exemplo</Text>
                  </Text>
                  <Text>Cep:
                    <Text style={styles.bold}> 0000 0-000</Text>
                  </Text>
                </View>

                <View style={[styles.flex, { marginTop: 5, width: '85%', }]}>
                  <Text>Município:
                    <Text style={styles.bold}> Porto Alegre</Text>
                  </Text>
                  <Text>UF:
                    <Text style={styles.bold}> RS</Text>
                  </Text>
                </View>

                <Text style={{ marginTop: 5 }}> Telefone:
                  <Text style={styles.bold}> (00) 00000-0000</Text>
                </Text>
              </View>

            </View>
          </View>

          <View style={[styles.serviceProvider, { borderTop: 2}]}>
            <Text style={styles.title}>Orçamento de Serviço</Text>
            <View style={{ fontSize: 10 }}>
              <Text style={{ marginTop: 10 }}>Nome:
                <Text style={styles.bold}> {currentUserData.name.toUpperCase()}</Text>
              </Text>

              <Text style={{ marginTop: 5}}>Telefone:
                <Text style={styles.bold}> {currentUserData.tel || ''}</Text>
              </Text>

              <Text style={{ marginTop: 5}}>Endereço:
                <Text style={styles.bold}> {currentUserData.address.trim() || ''}</Text>
              </Text>

              <View>
                <View style={[styles.flex, styles.thead ]}>
                  <Text style={[ styles.bold, { width: '75%' }]}>Produto/Serviço</Text>
                  <Text style={[styles.bold, {width: '10%' }]}>Qtde</Text>
                  <Text style={[ styles.bold, {textAlign: 'right', width: '15%' }]}>Valor</Text>
                </View>

                {currentUserData.item.map((e, index) => (
                  <View key={index} style={[ styles.flex, styles.tbody ]} >
                    <View style={{ width: '75%', paddingRight: 15 }}>
                      <Text> {e.parts.trim() || 'Não especificado'}</Text>
                    </View>
                    <View style={{ width: '10%', marginLeft:15 }}>
                      <Text> {e.quantity || '0'}</Text>
                    </View>
                    <View style={{ width: '15%', textAlign: 'right' }}>
                      <Text style={styles.bold}>{formatedCurrency(e.price) || 'R$ 0,00'}</Text>
                    </View>
                  </View>
                ))}

                <View style={[styles.flex, styles.tfoot]}>
                  <Text style={styles.bold}>Total</Text>
                  <Text style={[styles.bold, {textAlign: 'right' }]}> R$ {currentUserData.total || '0,00'}</Text>
                </View>
              </View>

              <View style={styles.obs}>
                <Text style={styles.bold}>Observações: </Text>
                <Text style={{ width: '100%', marginLeft: 10 }}> {currentUserData.obs.trim() || ''}</Text>
              </View>

            </View>
          </View>

        </View>
      </Page>
    </Document>
  )
}
