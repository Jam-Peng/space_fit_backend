/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { AiFillPicture, AiOutlineFieldNumber } from "react-icons/ai";
import { PiUserCircle } from "react-icons/pi"
import { IoIosPhonePortrait } from "react-icons/io"
import { FaUserCircle } from "react-icons/fa"
import { useContext } from "react"
import { ClientContext } from "../contexts/ClientContext"
import { OrderContext } from "../contexts/OrderContext"
import SearchClient from "../components/client/SearchClient"
import ClientList from "../components/client/ClientList"
import { useEffect } from "react"

function Client({ currentUser }) {
  const { message, getAllClients, clients }= useContext(ClientContext)
  const { format_time }= useContext(OrderContext)
  const token = currentUser.token

  useEffect(() => {
    getAllClients(token)
  },[])

  return (
    <section className="space-y-4 p-4 h-full relative overflow-hidden">
      <div className="p-3 px-6 flex items-center justify-between border rounded-lg bg-gray-50">
        <div className="flex items-center space-x-4">
          <span className="text-slate-900 text-[1.4rem] font-bold tracking-tight">會員管理</span>
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
            <button className="btn btn-success text-[0.88rem]" onClick={ ()=>{getAllClients(token)} }>
              <span>全部會員</span>
            </button>
          </div>
          <SearchClient/>
        </div>
      </div>
        
      <div className="border rounded-lg bg-gray-50 overflow-y-auto"> 
        <div className="text-base">
          <div className="px-4 pr-8 py-2.5 font-medium space-x-3 text-slate-800 bg-emerald-500">
            <div className="flex items-center text-slate-800/90">
              <div className="w-1/12 pl-6">
                <span><AiFillPicture size={25}/></span>
              </div>
              <div className="w-3/12 flex items-center space-x-1 px-2">
                <span><PiUserCircle size={25}/></span>
                <span>帳號</span>
              </div>
              <div className="w-2/12 flex items-center space-x-1 px-1.5">
                <span><IoIosPhonePortrait size={25}/></span>
                <span>電話</span>
              </div>
              <div className="w-5/12 flex items-center space-x-1 px-1.5">
                <span><AiOutlineFieldNumber size={25}/></span>
                <span>會員編號</span>
              </div>
              <div className="w-1/12 flex items-center space-x-1">
                <span><FaUserCircle size={20}/></span>
                <span>黑名單</span>
              </div>
            </div>
          </div>

          <div className="h-[593px] overflow-y-auto py-5">
            <div className="px-4 space-y-4">
              {clients.map((item) => {
                return (
                  <div key={item.id}>
                    <ClientList item={item} format_time={format_time} currentUser={currentUser} />
                  </div>
              )})}
            </div>
          </div>
        </div> 
      </div>

    </section>
  )
}

export default Client