import axios from "axios";
// const API_URL = "http://127.0.0.1:5000";
const API_URL = "https://space-fit-server.onrender.com";

class ClientService {
  // 取得所有會員
  getClients(token) {
    return axios.get(`${API_URL}/api/clients`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // 將會員放入黑名單中 - delete設為 1
  setDeleteClient(token, public_id) {
    return axios.post(
      `${API_URL}/api/setDeleteOne`,
      { public_id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // 取得所有黑名單會員 - 取得delete 1
  getDeleteClients() {
    return axios.get(`${API_URL}/api/delClients`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // 取回被加入黑名單的會員
  retrieve(token, public_id) {
    return axios.patch(
      `${API_URL}/api/retrieveClients`,
      { public_id: public_id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // 從資料庫刪除會員
  deleteClient(token, public_id) {
    return axios.delete(`${API_URL}/api/deleteDataClient/${public_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new ClientService();
