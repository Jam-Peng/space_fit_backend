import axios from "axios";
// const API_URL = "http://127.0.0.1:5000";
const API_URL = "https://space-fit-server.onrender.com";

class EchartService {
  // 取得所有訂單分類的購買次數、價錢資料 - 累加所有的資料
  getAllDatas() {
    return axios.get(`${API_URL}/api/payload_all_orders`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // 取得 "當前日期" 所有訂單分類的購買次數、價錢資料 (細分所有課程)
  getCurrentDatas() {
    return axios.get(`${API_URL}/api/current_allorders`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // 取得查詢的日期資料
  getSearchDatas(searchDate) {
    return axios.get(`${API_URL}/api/search_date_allorder`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        date: searchDate,
      },
    });
  }
}

export default new EchartService();
