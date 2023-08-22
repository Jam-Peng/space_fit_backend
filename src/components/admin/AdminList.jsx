/* eslint-disable react/prop-types */
import { FiTrash2 } from "react-icons/fi";
import { useContext } from "react";
import { AdminContext } from "../../contexts/AdminContext";

function AdminList({ item, index, currentUser }) {
  const { setDeleteOne, updateAdminCheckbox } = useContext(AdminContext)

  // 加入帶刪除區 delete設為 1
  const deleteSetOne = (token, public_id) => {
    setDeleteOne(token, public_id)
  }

  // 更改管理者權限
  const handleAdminCheckBox = (token, admin ,public_id) => { 
    updateAdminCheckbox(token, admin ,public_id)
  }

  const { name, email, public_id, admin } = item

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
          <div className="w-4/12">
            <span>{public_id}</span>
          </div>
          {currentUser.admin ?
            <div className="w-2/12">
              <div className="flex items-center justify-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer"
                    checked={ admin } onChange={ ()=>{handleAdminCheckBox(currentUser.token, admin ,public_id)} }/>
                    <div className="switch_checkbox dark:peer-focus:ring-emerald-500 rounded-full peer peer-focus:outline-none 
                      peer-focus:ring-4 peer-focus:ring-emerald-300 peer-checked:after:translate-x-full peer-checked:after:border-white
                      peer-checked:bg-emerald-500">
                    </div>
                </label>
              </div>
            </div>
          :
            null
          }
          {currentUser.admin ?
            <div className="w-1/12">
              <button className="btn btn-delete text-[0.88rem]" onClick={ ()=>{deleteSetOne(currentUser.token, public_id)} }>
                <span><FiTrash2 size={18}/></span>
              </button>
            </div>
          :
            null
          } 
        </div>
      </div>
    </section>
  )
}

export default AdminList