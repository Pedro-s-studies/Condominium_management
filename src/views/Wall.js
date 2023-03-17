/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react'
import useApi from '../services/api'

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCheck } from '@coreui/icons'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const api = useApi()

  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalTitleField, setModalTitleField] = useState('')

  useEffect(() => {
    const req = async () => {
      let json = await api.getWall()
      if (json.error === '') {
        setList(
          json.list.map((i) => ({
            ...i,
            actions: (
              <CButton color="info" onClick={(i) => setShowModal(!showModal)}>
                Editar
              </CButton>
              // <CButtonGroup>
              //   {/* <CButton color="info" onClick={handleEditButton(i)}> */}
              //   {/* <CButton color="danger">Excluir</CButton> */}
              // </CButtonGroup>
            ),
          })),
        )
      } else {
        alert(json.error)
      }
    }
    req()
  }, [])

  const fields = [
    { label: 'Título', key: 'title' },
    { label: 'Data de criação', key: 'date_created', _style: { width: '200px' } },
    { label: 'Ações', key: 'actions', _style: { width: '1px' } },
  ]

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleEditButton = (i) => {
    console.log(i)
    setShowModal(!showModal)
  }

  return (
    <>
      <CRow>
        <CCol>
          <h2>Mural de Avisos</h2>

          <CCard>
            <CCardHeader>
              <CButton color="primary">
                <CIcon icon={cilCheck}></CIcon> Novo Aviso
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CTable items={list} columns={fields} striped hover bordered />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CModal alignment="center" visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody></CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
