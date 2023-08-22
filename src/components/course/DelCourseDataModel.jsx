/* eslint-disable react/prop-types */
import { IoMdClose } from "react-icons/io";
import { CourseContext } from "../../contexts/CourseContext"
import { useContext } from "react";

function DelCourseDataModel({currentUser}) {
  const { openDeleteModel, setOpenDeleteModel, formData, deleteOkAPI } = useContext(CourseContext)

  const handleClose = () => {
    setOpenDeleteModel(true)
  }

  // 確定刪除資料庫裡的資料
  const deleteOk = () => {
    deleteOkAPI(currentUser, formData)
  }

  return (
    <section className={`${openDeleteModel ? "opacity-0 scale-0 bg-slate-0" : "opacity-1 scale-100 bg-slate-50/90"} 
      pt-0 absolute w-full min-h-screen top-0 pb-80 flex justify-center items-center transition-all duration-500 z-40`}>
      <div className="overflow-hidden border rounded-lg bg-stone-50  shadow-lg md:w-5/12 xl:max-w-6/12">
        <div className="space-y-1 ">
          <div className="p-3 bg-rose-500 flex justify-between items-center">
            <span className="text-xl text-slate-50">刪除</span>
            <button className=" border rounded-md p-0.5 bg-slate-100  text-rose-500  hover:bg-slate-500/30 hover:text-slate-100"
              onClick={ handleClose }>
              <IoMdClose size={20}/>
            </button>
          </div>
          <div className="p-3 border-b space-x-2">
            <span>是否從資料庫完整刪除</span>
            <span className='text-indigo-600 text-xl'>{ formData.title }</span>
            <span>(將無法復原)。</span>
          </div>
          <div className="px-3 py-4 flex justify-end" >
            <button className="btn btn-delete"
              onClick={() => { deleteOk(), setOpenDeleteModel(!openDeleteModel) }}>
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DelCourseDataModel