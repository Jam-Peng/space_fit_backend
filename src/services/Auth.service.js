import axios from "axios";
// const API_URL = "http://127.0.0.1:5000";
const API_URL = "https://space-fit-server.onrender.com";

class AuthService {
  // 註冊管理員
  register(token, registerName, registerPassword, email) {
    return axios.post(
      `${API_URL}/api/register`,
      {
        username: registerName,
        password: registerPassword,
        email: email,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // 登入
  login(username, password) {
    return axios.post(
      `${API_URL}/api/login`,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // 登出 - 刪除localStorage的Token
  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  // 自動更新Token
  refreshToken(token) {
    return axios.post(
      `${API_URL}/api/refresh_token`,
      { token: token },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // 更新管理者帳密
  updateAdmin(token, username, password) {
    return axios.put(
      `${API_URL}/api/updateAdmin`,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // 取得所有管理者
  getAdmins(token) {
    return axios.get(`${API_URL}/api/admins`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // 將管理者放入帶待刪除區 - delete設為 1
  setDeleteAdmin(token, public_id) {
    return axios.post(
      `${API_URL}/api/setDeleteAdmin`,
      { public_id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // 更改管理者權限
  setAdminAuth(token, admin, public_id) {
    return axios.patch(
      `${API_URL}/api/updateAdminAuth/${public_id}`,
      { admin },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // 取得所有待刪除的管理者 - 取得delete 1
  getDeleteAdmins() {
    return axios.get(`${API_URL}/api/delAdmins`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // 取回被加入待刪除的管理員
  retrieve(token, public_id) {
    return axios.patch(
      `${API_URL}/api/retrieveAdmins`,
      { public_id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // 從資料庫刪除管理員
  deleteAdmin(token, public_id) {
    return axios.delete(`${API_URL}/api/deleteDataAdmin/${public_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new AuthService();
