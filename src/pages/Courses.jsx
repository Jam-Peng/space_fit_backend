/* eslint-disable react/prop-types */
import { MdFormatListBulletedAdd } from "react-icons/md";
import { FiCheckCircle } from 'react-icons/fi';
import CourseModel from "../components/course/CourseModel";
import DelCourseModel from "../components/course/DelCourseModel";
import { useContext} from "react";
import { CourseContext } from "../contexts/CourseContext"
import CourseList from "../components/course/CourseList";

function Courses( {currentUser} ) {
  const { openModel, setOpenModel, courses, message, setIsNew, setHasPhoto, setIsDisabled} = useContext(CourseContext)
  
  return (
      <section className="space-y-4 p-4 h-full relative overflow-hidden">
        <div className="p-3 px-6 flex items-center justify-between border rounded-lg bg-gray-50">
          <div className="flex items-center space-x-4">
            <span className="text-slate-900 text-[1.4rem] font-bold tracking-tight">課程管理</span>
            {message && (
              <div className="flex items-center space-x-2">
                <FiCheckCircle color="#4f46e5"/>
                <span className="text-base text-indigo-600">{message}</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 ">
            <span className="text-emerald-500">新增</span>
            <button className="btn btn-add"
              onClick={() => { setOpenModel(!openModel), setIsNew(true), setHasPhoto(false), setIsDisabled(true) }}>
              <MdFormatListBulletedAdd size={22}/>
            </button>
          </div>
          <CourseModel currentUser={currentUser} />
        </div>
          <DelCourseModel currentUser={currentUser} />
        <div>
          <div className="border rounded-lg bg-gray-50 pt-4 h-[640px] overflow-y-auto"> 
            <table className="w-full">
              <thead className="text-slate-900">
                <tr>
                  <th scope="col">照片</th>
                  <th scope="col" className="text-left">分類</th>
                  <th scope="col" className="text-left">課程名稱</th>
                  <th scope="col">教練</th>
                  <th scope="col">課程</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否開課</th>
                  <th scope="col">
                    <div className="flex items-center justify-center space-x-8">
                      <span>編輯</span>
                      <span>刪除</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => {
                  return (
                    <CourseList key={course.id} course={course} currentUser={currentUser} />
                  )
                })}
              </tbody>
            </table>  
          </div>
        </div>
      </section>
  )
}

export default Courses