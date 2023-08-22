/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'
import CourseService from '../services/Course.service';

export const CourseContext = createContext()

const dateStamp = new Date().getTime();

function CourseProvider({ children }) {
  const [openModel, setOpenModel] = useState(false);
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const [isNew, setIsNew] = useState(true)
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(true)
  const [isFileImg, setIsFileImg] = useState(true)
  const [deletedCourses, setDeletedCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    teacher: '',
    class_amount: '',
    open_amount: '',
    price: '',
    description: '',
    open_class_date: new Date(dateStamp + 8 * 3600 * 1000).toISOString().slice(0, 16),
    complete: false,
    images: [],
  });

  // 處理開課checkbox按鈕的同步
  const handleCheckBox = (e) => {
    const { checked } = e.target;
    setIsChecked( checked );
    setFormData({ ...formData, complete: checked }); // 更新 formData 的 complete 屬性
  }

  // 取得所有課程資料方法
  const getCourseMethod = () => {
    CourseService.getCourse()
      .then((res) => {
        if (res.status === 200) {
          setCourses(res.data.courses)
        }
      })
      .catch((err) => {
        setTimeout(() => {
          setMessage(err.response.data.message)
        }, 1000)
      })
      .finally(() => {
        setTimeout(() => {
          setMessage("")
        }, 3000)
      })
  }

  // 新增課程執行API
  const addCourseAPI = (currentUser, data) => {
    CourseService.addCourse(currentUser.token, data)
      .then((res) => {
        if (res.status === 201) {
          handleClose()
          getCourseMethod()
          setTimeout(() => {
            setMessage(res.data.message)
          }, 1000)
        }
      })
      .catch((err) => {
        setTimeout(() => {
          setMessage(err.response.data.message)
        }, 1000)
      })
      .finally(() => {
        setTimeout(() => {
          setMessage("")
        }, 3000)
      })
  }
  
  // 取得要更新的當前課程資料(更新按鈕)
  const updateCourseMethod = (course_id) => {
    let updateCourse = courses.find((item) => {
      return item.course_id === course_id
    })
    setPreviewImages( updateCourse.images )
    setIsChecked( updateCourse.complete )
    setFormData({  ...updateCourse, complete: updateCourse.complete });  // 同步更新 formData 的 complete 屬性
  }

  // 更新課程執行API
  const updateCourseAPI = (currentUser, data) => {
    CourseService.updateCourse(currentUser.token, data, formData.course_id)
      .then((res) => {
        if (res.status === 200) {
          getCourseMethod()
          setTimeout(() => {
            setMessage(res.data.message)
          }, 1000)
        }
      })
      .catch((err) => {
        setTimeout(() => {
          setMessage(err.response.data.message)
        }, 1000)
      })
      .finally(() => {
        handleClose()
        setTimeout(() => {
          setMessage("")
        }, 3000)
      })
  }
  
  // 取得要刪除的課程資料(將要刪除的資料存放到已刪除的管理項目中)
  const deleteCourse = (course_id) => {
    let deleteSelectCourse = courses.filter((item) => {
      return item.course_id === course_id
    })
    setFormData(...deleteSelectCourse)
  }

  // 刪除課程執行API
  const deleteCourseAPI = (currentUser, formData) => {
    CourseService.preDeleteCourse(currentUser.token, formData.course_id)
      .then((res) => {
        if (res.status === 200) {
          getCourseMethod()
          setTimeout(() => {
            setMessage(res.data.message)
          }, 1000)
        }
      })
      .catch((err) => {
        setTimeout(() => {
          setMessage(err.response.data.message)
        }, 1000)
      })
      .finally(() => {
        setTimeout(() => {
          setMessage("")
        }, 3000)
      })
  }
  
  // 關閉課程toggle按鈕 - 初始化所有狀態
  const handleClose = () => {
    setOpenModel(false)
    setIsFileImg(true)
    setHasPhoto(false)
    setIsDisabled(false)
    setFormData({
      title: '',
      category: '',
      teacher: '',
      class_amount: '',
      open_amount: '',
      price: '',
      description: '',
      open_class_date: new Date(dateStamp + 8 * 3600 * 1000).toISOString().slice(0, 16),
      complete: false,
      images: [],
    });
    setPreviewImages([]);
  };

  // 取得所有被刪除的課程資料
  const deletedCoursesMethod = () => {
    CourseService.cancaledCourse()
      .then((res) => {
        if (res.status === 200) {
          setDeletedCourses(res.data.courses)
        }
      })
      .catch((err) => {
        setTimeout(() => {
          setMessage(err.response.data.message)
        }, 1000)
      })
      .finally(() => {
        setTimeout(() => {
          setMessage("")
        }, 3000)
      })
  }

  // 選擇確定要刪除資料庫的課程資料
  const selectDelCheckCourse = (course_id) => {
    let delCourseOk = deletedCourses.filter((item) => {
      return course_id === item.course_id
    })
    setFormData(...delCourseOk)
  }

  // 從資料庫確定執行刪除資料
  const deleteOkAPI = (currentUser, formData) => {
    CourseService.deleteData(currentUser.token, formData.course_id)
      .then((res) => {
        if (res.status === 200) {
          deletedCoursesMethod()
          setTimeout(() => {
            setMessage(res.data.message)
          }, 1000)
        }
      })
      .catch((err) => {
        setTimeout(() => {
          setMessage(err.response.data.message)
        }, 1000)
      })
      .finally(() => {
        setTimeout(() => {
          setMessage("")
        }, 3000)
      })
  }

  useEffect(() => {
    getCourseMethod()
    deletedCoursesMethod()
  },[])

  return (
    <CourseContext.Provider
      value={{
        courses, deletedCourses, message, setMessage, getCourseMethod, updateCourseMethod, previewImages, setPreviewImages,
        openModel, setOpenModel, formData, setFormData, isNew, setIsNew, hasPhoto, setHasPhoto, isChecked, setIsChecked,
        isDisabled, setIsDisabled, handleCheckBox, deleteCourse, openDeleteModel, setOpenDeleteModel, handleClose,
        isFileImg, setIsFileImg,  addCourseAPI, updateCourseAPI, deleteCourseAPI, deleteOkAPI, deletedCoursesMethod,
        selectDelCheckCourse,
      }}>
      {children}
    </CourseContext.Provider>
  )
}

export default CourseProvider