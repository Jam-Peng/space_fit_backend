/* eslint-disable react/prop-types */
import { FiTrash2 } from "react-icons/fi";
import { BsStackOverflow  } from "react-icons/bs";
import { useContext } from "react";
import { AdminContext } from "../../contexts/AdminContext";

function DelAdminList({ item, index, currentUser }) {
  const { setDeleteZero, delDataAdmin } = useContext(AdminContext)
  
  // 將待刪除區管理員取回
  const retrieve = (token, public_id)=> {
    setDeleteZero(token, public_id)
  }

  // 從資料庫刪除管理員
  const deleteAdmin = (token, public_id) => {
    delDataAdmin(token, public_id)
  }

  const { name, email, public_id } = item

  return (
    <section className="border rounded-lg bg-white overflow-hidden">
      <div className="px-2">
        <div className="flex items-center px-1 py-2 text-slate-800/70">
          <div className="w-1/12">
            <div className="text-center">
              {index}
            </div>
          </div>
          <div className="w-2/12">
            <span>{name}</span>
          </div>
          <div className="w-3/12">
            <span>{email}</span>
          </div>
          <div className="w-5/12">
            <span>{public_id}</span>
          </div>
          <div className="w-2/12 flex space-x-2 items-center">
            <button className="btn btn-success" onClick={ ()=>{retrieve(currentUser.token, public_id)} }>
              <BsStackOverflow size={18}/>
            </button>
            <button className="btn btn-delete text-[0.88rem]" onClick={ ()=>{deleteAdmin(currentUser.token, public_id)} }>
              <span><FiTrash2 size={18}/></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DelAdminList