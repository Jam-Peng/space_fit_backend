/* eslint-disable react/prop-types */
import { useState } from 'react'
import { createContext } from 'react'
import ClientService from '../services/Client.service'
import { useEffect } from 'react'

export const ClientContext = createContext()

function ClientProvider({ children }) {
  const [message, setMessage] = useState("")
  const [clients, setClients] = useState([]);
  const [deletedClients, setDeletedClients]=useState([])

  // 取得所有會員
  const getAllClients = (token) => {
    ClientService.getClients(token)
    .then((res) => {
      if (res.status === 200) {
        setClients(res.data.client_data)
      }
    })
    .catch((err) => {
      setMessage(err.response.data.message)
    })
    .finally(() => {
      setTimeout(() => {
        setMessage("")
      }, 2500)
    })
  }

  // 刪除會員 (將會員放入黑名單中 - delete設為 1)
  const setDeleteOne = (token, public_id) => {
    ClientService.setDeleteClient(token, public_id)
    .then((res) => {
      if (res.status === 200) {
        setMessage(res.data.message)
        getAllClients(token)
      }
    })
    .catch((err) => {
      setMessage(err.response.data.message)
    })
    .finally(() => {
      setTimeout(() => {
        setMessage("")
      }, 2500)
    })
  }

  // 取得所有被加到黑名單的會員資料
  const getDeletedClients = () => {
    ClientService.getDeleteClients()
      .then((res) => {
        if (res.status === 200) {
          setDeletedClients(res.data.client_data)
        }
      })
      .catch((err) => {
        setMessage(err.response.data.message)
      })
      .finally(() => {
        setTimeout(() => {
          setMessage("")
        }, 2500)
      })
  }

  // 將黑名單會員放回 - delete設為 0
  const setDeleteZero = (token, public_id) => {
    ClientService.retrieve(token, public_id)
      .then((res) => {
        if (res.status === 200) {
          setMessage(res.data.message)
          getDeletedClients()
        }
      })
      .catch((err) => {
          setMessage(err.response.data.message)
      }).finally(() => {
        setTimeout(() => {
          setMessage("")
        }, 2500)
    })
  }

  // 從資料庫中刪除會員
  const delDataClient = (token, public_id) => {
    ClientService.deleteClient(token, public_id)
      .then((res) => {
        if (res.status === 200) {
          setMessage(res.data.message)
          getDeletedClients()
        }
      })
      .catch((err) => {
          setMessage(err.response.data.message)
      }).finally(() => {
        setTimeout(() => {
          setMessage("")
        }, 2500)
    })
  }

  // 搜尋會員
  const searchClient = (search) => {
    let clientAry = []
    let client = clients.find((item) => {
      return item.phone === search
    })
    if (client === undefined) {
      setMessage("查不到此會員，請輸入完整電話資訊")
      setTimeout(() => {
        setMessage("")
      },2500)
    } else {
      clientAry.push(client)
      setClients(clientAry)
    } 
  }

  useEffect(() => {
    getDeletedClients()
  },[])


  return (
    <ClientContext.Provider
      value={{
        message, setMessage, clients, getAllClients, setDeleteOne, deletedClients,
        setDeleteZero, delDataClient, searchClient,
      }}>
      {children}
    </ClientContext.Provider>
  )
}

export default ClientProvider