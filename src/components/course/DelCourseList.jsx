/* eslint-disable react/prop-types */
import { BsStackOverflow } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { useContext } from "react"
import { CourseContext } from "../../contexts/CourseContext"
import CourseService from "../../services/Course.service";


function DelCourseList({ course, currentUser }) {
  const { title, category, teacher, class_amount, price, images, course_id } = course;
  const { setMessage, deletedCoursesMethod, openDeleteModel, setOpenDeleteModel, selectDelCheckCourse } = useContext(CourseContext)

  // 將以刪除的課程取回
  const retrieve = () => {
    CourseService.retrieve(currentUser.token, course.course_id)
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
      }).finally(() => {
        setTimeout(() => {
          setMessage("")
        }, 3000)
    })
  }


  return (
    <tr>
        <td className="h-16">
          <div className="flex justify-center items-center w-full h-full">
            <div className="w-16">
              <img className="rounded-lg" src={`data:image/png;base64,${images[0]['image_path']}`} alt={ title } />
            </div>
          </div>
        </td>
        <td>{ category }</td>
        <td>{ title }</td>
        <td className="text-center">{ teacher }</td>
        <td className="text-center">{ class_amount }</td>
        <td className="text-center">{ price }</td>
        <td>
          <div className="flex items-center justify-center space-x-4">
            <button className="btn btn-success" onClick={retrieve}>
              <BsStackOverflow size={20}/>
            </button>
            <button className="btn btn-delete"
              onClick={() => { setOpenDeleteModel(!openDeleteModel), selectDelCheckCourse(course_id) }}>
              <FiTrash2 size={20}/>
            </button>
          </div>
        </td> 
      </tr>
  )
}

export default DelCourseList