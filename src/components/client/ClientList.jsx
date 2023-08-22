/* eslint-disable react/prop-types */
import user_img from "../../assets/user.png"
import { RiVipDiamondFill, RiLineHeight } from "react-icons/ri";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { useContext } from "react";
import { ClientContext } from "../../contexts/ClientContext";

function ClientList({ item, currentUser }) {
  const [openList, setOpenList] = useState(null);  // 開啟會員的索引
  const { setDeleteOne } = useContext(ClientContext)
  

  const handleOpen = (id) => {
    if (openList === id) {
      setOpenList(null);   // 如果當前列表已經開啟，則關閉它
    } else {
      setOpenList(id);     // 否則開啟該列表
    }
  }

  // 加入黑名單 delete設為 1
  const deleteSetOne = (token, public_id) => {
    setDeleteOne(token, public_id)
  }

  const { id, name, images, email, phone, public_id, paylod_payment, vip, courses } = item
  
  return (
    <section className="border rounded-lg bg-white overflow-hidden">
      <div>
        <div className="px-2">
          <div className="flex items-center px-1 py-2 text-slate-800/70">
            <div className="w-1/12">
              <div>
              { images.length < 1 ?
                <img src={user_img} alt="" className="w-12 h-12 border rounded-lg"/> 
              : 
                images.map((item, index) => (
                <div key={index}>
                  <img src={`data:image/jpeg;base64,${item}`}  alt="" className="w-12 h-12 border rounded-lg"/>
                </div>
                )) 
              } 
              </div>
            </div>
            <div className="w-3/12 flex flex-col">
              <span>{name}</span>
              <span>{email}</span>
            </div>
            <div className="w-2/12">
              <span>{phone}</span>
            </div>
            <div className="w-5/12">
              <span>{public_id}</span>
            </div>
            <div className="w-1/12">
              <button className="btn btn-delete text-[0.88rem]" onClick={ ()=>{deleteSetOne(currentUser.token, public_id)} }>
                <span><FiTrash2 size={18}/></span>
              </button>
            </div>
          </div>  

          <div className="border-t flex flex-col py-0.5">
            <div className="cursor-pointer flex items-center justify-center"
              onClick={ ()=>{ handleOpen(id) }}>
              <RiLineHeight size={20} color="#10b981"/>
            </div>

            <div className="text-slate-800/90">
              {openList === id && (
                courses.length === 0 ?
                  <div className="p-2 text-center">
                    <span className="text-indigo-500">無購買紀錄</span>
                  </div> 
                :
                  <div className="p-2 space-y-2">
                    <div>
                      <div className="">
                        {vip ?
                          <div className="flex items-center space-x-2 text-amber-400 ">
                            <RiVipDiamondFill size={20}/>
                            <span>VIP會員</span>
                          </div>
                        :
                          <span className="text-emerald-500">一般會員</span>
                        }
                      </div>
                      <div className="space-x-2 text-[0.88rem]">
                        <span>消費金額</span>
                        <span>$ {paylod_payment}</span>
                      </div>
                    </div>
                    <div className="border rounded-lg p-2 bg-emerald-500 text-gray-50">
                      <div className="flex items-center mb-1 py-1 border-b text-[1rem]">
                        <div className="w-2/12">
                          <span>類別</span>
                        </div>
                        <div className="w-5/12">
                          <span>課程</span>
                        </div>
                        <div className="w-2/12">
                          <span>教練</span>
                        </div>
                        <div className="w-2/12 px-2.5">
                          <span>售價</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        {courses.map((list) => (
                          <div key={list.id}>
                            <div className="flex text-[0.88rem]">
                              <div className="w-2/12">{ list.course_category }</div>
                              <div className="w-5/12">{ list.course_title }</div>
                              <div className="w-2/12">{ list.course_teacher }</div>
                              <div className="w-2/12">$ { list.course_price }</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClientList