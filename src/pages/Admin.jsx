/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { PiUserCircle, PiUserCircleMinus } from "react-icons/pi"
import { AiOutlineFieldNumber } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md"
import { useContext } from "react"
import { AdminContext } from "../contexts/AdminContext"
import { useEffect } from "react";
import AdminList from "../components/admin/AdminList";
import SearchAdmin from "../components/admin/SearchAdmin"
import RegisterModel from "../components/admin/RegisterModel";

function Admin({ currentUser }) {
  const { message, admins, getAllAdmins, isRegisterModel, setIsRegisterModel } = useContext(AdminContext)
  
  const token = currentUser.token
  
  useEffect(() => {
    getAllAdmins(token)
  },[])


  return (
    <section className="space-y-4 p-4 h-full relative overflow-hidden">

      <RegisterModel  currentUser={currentUser}/>

      <div className="p-3 px-6 flex items-center justify-between border rounded-lg bg-gray-50">
        <div className="flex items-center space-x-4">
          <span className="text-slate-900 text-[1.4rem] font-bold tracking-tight">管理員權限</span>
          {message ? 
            <div className="flex items-center space-x-2">
              <span className="text-base text-indigo-600">{message}</span>
            </div>
            :
            null
          }
        </div>

        <div className="flex items-center space-x-4">
          <div>
            <button className="btn btn-add text-[0.88rem]" onClick={()=>{ setIsRegisterModel(!isRegisterModel) }}>
              <span>新增</span>
            </button>
          </div>
          <div>
            <button className="btn btn-success text-[0.88rem]" onClick={()=>{getAllAdmins(token)}}>
              <span>查詢全部</span>
            </button>
          </div>
          <SearchAdmin/>
        </div>
      </div>
        
      <div>
        <div className="border rounded-lg bg-gray-50 overflow-y-auto"> 
          <div className="text-base">
            <div className="px-5 pr-8 py-2.5 font-medium space-x-3 text-slate-800 bg-emerald-500">
              <div className="flex items-center text-slate-800/90">
                <div className="w-1/12">
                  <span></span>
                </div>
                <div className="w-2/12 flex items-center space-x-1 pl-1">
                  <span><PiUserCircle size={25}/></span>
                  <span>帳號</span>
                </div>
                <div className="w-3/12 flex items-center space-x-1 pl-1.5">
                  <span><MdOutlineEmail size={25}/></span>
                  <span>信箱</span>
                </div>
                <div className="w-4/12 flex items-center space-x-1 pl-1.5">
                  <span><AiOutlineFieldNumber size={25}/></span>
                  <span>員工編號</span>
                </div>
                <div className="w-2/12 flex items-center space-x-1 ">
                  {/* <span>權限</span> */}
                </div>
                {currentUser.admin ?
                  <div className="w-1/12 flex items-center space-x-1 pl-3">
                    <span><PiUserCircleMinus size={25}/></span>
                  </div>
                :
                  null
                }
              </div>
            </div>

            <div className="h-[577px] overflow-y-auto py-5">
              <div className="px-4 space-y-4">
                {admins.map((item, index) => {
                  return (
                    <div key={item.id}>
                      {item.name != 'admin' ?
                        <AdminList item={item} index={index} currentUser={currentUser} />
                        :
                        null
                      }
                    </div>
                )})}
              </div>
            </div>
          </div> 
        </div>
      </div>
    </section>
  )
}

export default Admin