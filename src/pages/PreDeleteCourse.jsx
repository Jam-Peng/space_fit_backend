/* eslint-disable react/prop-types */
import { FiCheckCircle } from 'react-icons/fi';
import { useContext } from "react"
import { CourseContext } from "../contexts/CourseContext"
import DelCourseList from "../components/course/DelCourseList";
import DelCourseDataModel from "../components/course/DelCourseDataModel";

function PreDeleteCourse({currentUser}) {
  const { message, deletedCourses} = useContext(CourseContext)

  return (
    <section className="space-y-4 p-4 h-full relative overflow-hidden">
      <div className="p-3 px-6 border rounded-lg bg-gray-50">
        <div className="flex items-center space-x-4">
          <span className="text-slate-900 text-2xl font-bold tracking-tight ">已刪除課程</span>
          {message && (
            <div className="flex items-center space-x-2">
              <FiCheckCircle color="#4f46e5"/>
              <span className="text-base text-indigo-600">{message}</span>
            </div>
          )}
        </div> 
      </div>
      
      <DelCourseDataModel currentUser={currentUser} />
      
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
                <th scope="col">
                  <div className="flex items-center justify-center space-x-8">
                    <span>取回</span>
                    <span>刪除</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {deletedCourses.map(course => {
                return (
                  <DelCourseList  key={course.id} course={course} currentUser={currentUser} />
                )
              })}
            </tbody>
          </table>  
        </div>
      </div>
    </section>
  )
}

export default PreDeleteCourse