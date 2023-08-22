/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'
import { useEffect } from 'react';
import AuthService from '../services/Auth.service';

export const AdminContext = createContext()

function AdminProvider({children}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [authMessage, setAuthMessage] = useState("")
  const [message, setMessage] = useState("")
  const [admins, setAdmins] = useState([]);
  const [deletedAdmins, setDeletedAdmins]=useState([])
  // 註冊管理員model狀態
  const [isRegisterModel, setIsRegisterModel] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [email, setEmail] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  // 註冊管理員帳號
  const registerClient = (token, registerName, registerPassword, email) => {
    AuthService.register(token, registerName, registerPassword, email)
      .then((res) => {
        if (res.status === 200) {
          setRegisterMessage(res.data.message)
          getAllAdmins(token)
          setTimeout(() => {
            closeRegister()
          }, 1500)
        }
      })
      .catch((err) => {
        setRegisterMessage(err.response.data.message);
      })
      .finally(() => {
        setTimeout(() => {
          setRegisterMessage("")
        }, 2200)
      })
  }
  
  // 關閉register model時初始化
  const closeRegister = () => {
    setIsRegisterModel(false)
    setRegisterName("")
    setRegisterPassword("")
    setCheckPassword("")
    setEmail("")
  }

  // 關閉更改帳密的model
  const handleClose = () => {
    setIsOpen(false)
  };

  // 更新管理者帳密
  const updateAdminMethod = (currentUser, setCurrentUser, username, password) => {
    AuthService.updateAdmin(currentUser.token, username, password)
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data));
          setCurrentUser(AuthService.getCurrentUser());
          setAuthMessage(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err)
        setTimeout(() => {
          setAuthMessage("更新失敗")
        }, 1000)
      })
      .finally(() => {
        setIsChecked(!isChecked);
        setTimeout(() => {
          setAuthMessage("")
          handleClose()
        }, 2200)
        
      })
  }

  // 取得所有管理者
  const getAllAdmins = (token) => {
    AuthService.getAdmins(token)
    .then((res) => {
      if (res.status === 200) {
        setAdmins(res.data.admin_data)
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

  // 刪除管理者 (將管理者放到待刪除中 - delete設為 1)
  const setDeleteOne = (token, public_id) => {
    AuthService.setDeleteAdmin(token, public_id)
    .then((res) => {
      if (res.status === 200) {
        setMessage(res.data.message)
        getAllAdmins(token)
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

  // 更改管理者權限
  const updateAdminCheckbox = (token, admin, public_id) => {
    AuthService.setAdminAuth(token, admin, public_id)
    .then((res) => {
      if (res.status === 200) {
        setMessage(res.data.message)
        getAllAdmins(token)
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

  // 取得所有被加到待刪除區的管理員
  const getDeledAdmins = () => {
    AuthService.getDeleteAdmins()
      .then((res) => {
        if (res.status === 200) {
          setDeletedAdmins(res.data.admin_data)
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

  // 將待刪除區的管理員放回 - delete設為 0
  const setDeleteZero = (token, public_id) => {
    AuthService.retrieve(token, public_id)
      .then((res) => {
        if (res.status === 200) {
          setMessage(res.data.message)
          getDeledAdmins()
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

  // 從資料庫中刪除管理員
  const delDataAdmin = (token, public_id) => {
    AuthService.deleteAdmin(token, public_id)
      .then((res) => {
        if (res.status === 200) {
          setMessage(res.data.message)
          getDeledAdmins()
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

  // 搜尋管理員
  const searchAdmin = (search) => {
    let adminAry = []
    let admin = admins.find((item) => {
      return item.email === search
    })
    if (admin === undefined) {
      setMessage("查不到此管理員，請輸入完整信箱資訊")
      setTimeout(() => {
        setMessage("")
      },2500)
    } else {
      adminAry.push(admin)
      setAdmins(adminAry)
    } 
  }

  useEffect(() => {
    getDeledAdmins()
  },[])

  return (
    <AdminContext.Provider
      value={{
        authMessage, setAuthMessage, isOpen, setIsOpen, handleClose, isChecked, setIsChecked, updateAdminMethod,
        message, admins, getAllAdmins, setDeleteOne, updateAdminCheckbox, deletedAdmins, setDeleteZero, delDataAdmin, searchAdmin,
        isRegisterModel, setIsRegisterModel, registerName, setRegisterName, registerPassword, setRegisterPassword, email, setEmail,
        checkPassword, setCheckPassword, closeRegister, registerMessage, setRegisterMessage, registerClient }}>
      {children}
    </AdminContext.Provider>
  )
}

export default AdminProvider