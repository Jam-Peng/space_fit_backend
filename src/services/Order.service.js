import axios from "axios";
// const API_URL = "http://127.0.0.1:5000";
const API_URL = "https://space-fit-server.onrender.com";

class OrderService {
  // 取得所有訂單
  getOrders(token) {
    return axios.get(`${API_URL}/api/orders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // 刪除訂單
  deleteOrder(token, order_id) {
    return axios.delete(`${API_URL}/api/deleteorder`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        order_id: order_id,
      },
    });
  }
}

export default new OrderService();
