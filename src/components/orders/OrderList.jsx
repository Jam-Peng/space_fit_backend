/* eslint-disable react/prop-types */
import { SlCalender } from "react-icons/sl";
import { BsTags } from "react-icons/bs";
import { FaUser } from "react-icons/fa"
import { FiTrash2 } from "react-icons/fi";
import { OrderContext } from "../../contexts/OrderContext";
import { useContext } from "react";

function OrderList({item, format_time, currentUser}) {
  const { deleteOrderDone } = useContext(OrderContext)
  
  // 刪除訂單
  const deleteOrder = (currentUser, order_id) => {
    deleteOrderDone(currentUser.token, order_id)
  }

  return (
    <section className="border rounded-lg bg-white overflow-hidden">
      <div className="space-y-5 ">
        <div className="p-2 flex items-center justify-between bg-emerald-500  text-slate-100">
          <div className="space-x-2 flex items-center  ">
            <BsTags size={20}/>
            <span>訂單編號</span>
            <span>{item.order_id}</span>
          </div>
          <div className="space-x-2 flex items-center  ">
            <span><FaUser size={17}/></span>
            <span>{item.client.name}</span>
          </div>
          <div className="space-x-2 flex items-center text-[0.85rem]">
            <span><SlCalender size={20} /></span>
            <span> {format_time(item.create_date)} </span>
          </div>
          <div>
          <button className="className=' cursor-pointer flex border rounded-md px-2.5 py-0.5 bg-rose-500 text-slate-200  
                hover:bg-gray-100 hover:text-rose-500 hover:border-rose-500 transition'>"
                onClick={()=>{ deleteOrder(currentUser, item.order_id)} }>
              <FiTrash2 size={18}/>
            </button>
          </div>
        </div>
        
        <div className="px-2">
          <div className="flex items-center border-b px-1 pb-1 mb-1 font-medium space-x-3 text-slate-800">
            <div className="w-2/12">
              <span>類別</span>
            </div>
            <div className="w-5/12">
              <span>課程</span>
            </div>
            <div className="w-2/12">
              <span>教練</span>
            </div>
            <div className="w-2/12 px-3.5">
              <span>售價</span>
            </div>
          </div>

          {item.current_course.map((obj) => (
            <div className="flex items-center px-1 pb-1 space-x-3 text-slate-800/70" key={obj.id}>
              <div className="w-2/12">
                  <span>{ obj.course_category }</span>
              </div>
              <div className="w-5/12">
                <span>{ obj.course_title }</span>
              </div>
              <div className="w-2/12">
                <span>{ obj.course_teacher }</span>
              </div>
              <div className="w-2/12">
                <span>$ { obj.course_price }</span>
              </div>
            </div>  
          ))}
        </div>
      </div>
    </section>
  )
}

export default OrderList