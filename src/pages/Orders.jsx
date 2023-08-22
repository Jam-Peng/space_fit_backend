/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext } from "react"
import { OrderContext } from "../contexts/OrderContext"
import { useEffect } from "react"
import OrderList from "../components/orders/OrderList"
import SearchModel from "../components/orders/SearchModel"

function Orders({ currentUser }) {
  const { message, getAllOrders, orders, format_time } = useContext(OrderContext)
  const token = currentUser.token

  useEffect(() => {
    getAllOrders(token)
  },[])

  return (
    <section className="space-y-4 p-4 h-full relative overflow-hidden">
      <div className="p-3 px-6 flex items-center justify-between border rounded-lg bg-gray-50">
        <div className="flex items-center space-x-4">
          <span className="text-slate-900 text-[1.4rem] font-bold tracking-tight">訂單管理</span>
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
            <button className="btn btn-success text-[0.88rem]" onClick={()=>{getAllOrders(token)}}>
              <span>全部訂單</span>
            </button>
          </div>
          <SearchModel/>
        </div>
      </div>
        
      <div>
        <div className="border rounded-lg bg-gray-50 h-[640px] overflow-y-auto"> 
          <div className="p-4 text-base space-y-4">
            {orders.map((item) => {
              return (
                <div key={item.id}>
                  <OrderList item={item} format_time={format_time} currentUser={currentUser}/>
                </div>
            )})}
          </div> 
        </div>
      </div>
    </section>
  )
}

export default Orders