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

  const fields = [
    { label: 'Título', key: 'title' },
    { label: 'Data de criação', key: 'date_created', _style: { width: '200px' } },
    { label: 'Ações', key: 'actions', _style: { width: '1px' } },
  ]

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    getList
  }, [])

  const getList = async () => {
    setLoading(true)
    const result = await api.getWall()
    setLoading(false)
    if (result.error === '') {
      setList(result.list)
      console.log(result.list)
    } else {
      alert(result.error)
    }
  }

  return (
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
            <CTable
              items={list}
              fields={fields}
              loading={loading}
              noItemViewSlot=" "
              hover
              striped
              bordered
              pagination
              itemsPerPage={5}
              scopedSlots={{
                actions: (item, index) => (
                  <td>
                    <CButtonGroup>
                      <CButton color="info">Editar</CButton>
                      <CButton color="danger">Remover</CButton>
                    </CButtonGroup>
                  </td>
                ),
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
