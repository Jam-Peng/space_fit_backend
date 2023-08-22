/* eslint-disable react/prop-types */
import { BiSolidEditAlt } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import { CourseContext } from "../../contexts/CourseContext";
import { useContext } from "react";
import CourseService from "../../services/Course.service";

function CourseList({ course, currentUser }) {
  const { title, category, teacher, class_amount, price, images, course_id, complete} = course;
  const { openModel, setOpenModel, setIsNew, updateCourseMethod, setHasPhoto, openDeleteModel, setOpenDeleteModel,
    setMessage, getCourseMethod, deleteCourse } = useContext(CourseContext)

  
  const handleCourseCheckBox = () => {
    CourseService.updateCourseCheckbox(currentUser.token, complete, course_id)
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
      }).finally(() => {
        setTimeout(() => {
          setMessage("")
        }, 3000)
    })
  }

  return (
    <>
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
          <div className="flex items-center justify-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer"
                checked={ complete } onChange={ handleCourseCheckBox }/>
                <div className="switch_checkbox dark:peer-focus:ring-emerald-500 rounded-full peer peer-focus:outline-none 
                  peer-focus:ring-4 peer-focus:ring-emerald-300 peer-checked:after:translate-x-full peer-checked:after:border-white
                  peer-checked:bg-emerald-500">
                </div>
            </label>
          </div>
        </td>
        <td>
          <div className="flex items-center justify-center space-x-4">
            <button className="btn btn-success"
              onClick={() => {
                setOpenModel(!openModel), updateCourseMethod(course_id),
                setIsNew(false), setHasPhoto(true)
              }}>
              <BiSolidEditAlt size={20}/>
            </button>
            <button className="btn btn-delete"
              onClick={() => { setOpenDeleteModel(!openDeleteModel), deleteCourse(course_id) }}>
              <FiTrash2 size={20}/>
            </button>
          </div>
        </td> 
      </tr>
    </>
  )
}

export default CourseList