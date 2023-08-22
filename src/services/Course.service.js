import axios from "axios";
// const API_URL = "http://127.0.0.1:5000";
const API_URL = "https://space-fit-server.onrender.com";

class CourseService {
  // 新增課程
  addCourse(token, formData) {
    return axios.post(`${API_URL}/api/addCourse`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // 取得所有課程
  getCourse() {
    return axios.get(`${API_URL}/api/courses`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // 更新課程全部內容
  updateCourse(token, formData, course_id) {
    return axios.put(`${API_URL}/api/updateCourse/${course_id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // 更新課程的"是否啟用"功能
  updateCourseCheckbox(token, complete, course_id) {
    return axios.patch(
      `${API_URL}/api/updateCourseCheckbox/${course_id}`,
      { complete: complete },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // 將預想要刪除的課程 - 屬性 delete 更新為 1
  preDeleteCourse(token, course_id) {
    return axios.post(
      `${API_URL}/api/predeleteCourse`,
      { course_id: course_id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // 取得所有被刪除的課程
  cancaledCourse() {
    return axios.get(`${API_URL}/api/delCourses`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // 取回被刪除的課程
  retrieve(token, course_id) {
    return axios.patch(
      `${API_URL}/api/retrieveCourses`,
      { course_id: course_id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // 從資料庫確定執行刪除資料：第一種方法 - 當路徑有帶參數＋第三個參數時
  // deleteData(token, course_id, deleted) {
  //   return axios.delete(`${API_URL}/api/deleteDataCourse/${course_id}`, {
  //     data: { deleted: deleted },    /* 如果有第三個參數必須增加 data 屬性內 */
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // }
  deleteData(token, course_id) {
    return axios.delete(`${API_URL}/api/deleteDataCourse/${course_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new CourseService();
