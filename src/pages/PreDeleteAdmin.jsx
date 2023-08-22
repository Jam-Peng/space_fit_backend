/* eslint-disable react/prop-types */
import { PiUserCircle, PiUserCircleMinus } from "react-icons/pi"
import { AiOutlineFieldNumber } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md"
import { useContext } from "react"
import { AdminContext } from "../contexts/AdminContext"
import DelAdminList from "../components/admin/DelAdminList";

function PreDeleteAdmin({ currentUser }) {
  const { message, deletedAdmins } = useContext(AdminContext)

  return (
    <section className="space-y-4 p-4 h-full relative overflow-hidden">
      <div className="p-3 px-6 flex items-center justify-between border rounded-lg bg-gray-50">
        <div className="flex items-center space-x-4">
          <span className="text-slate-900 text-[1.4rem] font-bold tracking-tight">待刪除管理員</span>
          {message ? 
            <div className="flex items-center space-x-2">
              <span className="text-base text-indigo-600">{message}</span>
            </div>
            :
            null
          }
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
                <div className="w-5/12 flex items-center space-x-1 pl-1.5">
                  <span><AiOutlineFieldNumber size={25}/></span>
                  <span>員工編號</span>
                </div>
                
                  <div className="w-2/12 flex items-center space-x-1 pl-0.5">
                  <span><PiUserCircleMinus size={25} /></span>
                  <span>取回</span>
                  <span>刪除</span>
                  </div>
              </div>
            </div>

            <div className="h-[593px] overflow-y-auto py-5">
              <div className="px-4 space-y-4">
                {deletedAdmins.map((item, index) => {
                  return (
                    <div key={item.id}>
                      <DelAdminList item={item} index={index} currentUser={currentUser} />
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

export default PreDeleteAdmin