/* eslint-disable react/prop-types */
import { useState } from "react";
import { createContext } from "react"
import OrderService from "../services/Order.service";

export const OrderContext = createContext()

function OrderProvider({ children }) {
  const [message, setMessage] = useState("");
  const [orders, setOrders] = useState([]);
  
  // 取得所有訂單
  const getAllOrders = (token) => {
    OrderService.getOrders(token)
      .then((res) => {
        if (res.status === 200) {
          setOrders(res.data.orders)
        }
      })
      .catch((err) => {
        setMessage(err.response.data.message)
      })
      .finally(() => {
        setTimeout(() => {
          setMessage("")
        }, 2200)
      })
  };

  // 刪除訂單
  const deleteOrderDone = (token, order_id) => {
    OrderService.deleteOrder(token, order_id)
      .then((res) => {
        if (res.status === 200) {
          setMessage(`已刪除訂單編號 ${res.data.orders.order_id}`)
          getAllOrders(token)
        }
      })
      .catch((err) => {
        setMessage(err.response.data.message)
      })
      .finally(() => {
        setTimeout(() => {
          setMessage("")
        }, 2200)
      })
  }

  // 搜尋訂單
  const searchOrder = (search) => {
    let orderAry = []
    let order = orders.find((item) => {
      return item.order_id === search
    })
    if (order === undefined) {
      setMessage("查不到此訂單，請輸入完整訂單編號")
      setTimeout(() => {
        setMessage("")
      },2500)
    } else {
      orderAry.push(order)
      setOrders(orderAry)
    } 
  }

  // 轉換日期
  const format_time = (time) => {
    const dateTime = new Date(time);
    const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const dayOfWeek = daysOfWeek[dateTime.getDay()];
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
    const startHour = hour >= 12 ? hour - 12 : hour;
    const period = hour < 12 ? 'AM' : 'PM';
  
    const formatDateTime = `${dateTime.getFullYear()} / ${(dateTime.getMonth() + 1).toString().padStart(2, '0')} / ${dateTime.getDate().toString().padStart(2, '0')} ${startHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period} ${dayOfWeek}`;
    return formatDateTime;
  }

  return (
    <OrderContext.Provider
      value={{format_time, message, setMessage, orders, setOrders, getAllOrders, deleteOrderDone, searchOrder}}>
      {children}
    </OrderContext.Provider>
  )
}

export default OrderProvider