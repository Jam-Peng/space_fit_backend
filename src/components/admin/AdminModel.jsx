/* eslint-disable react/prop-types */
import { useContext, useState } from "react"
import { AdminContext } from "../../contexts/AdminContext"
import { IoMdArrowDown } from "react-icons/io";
import { PiUserCircle, PiLockKeyLight } from "react-icons/pi";
import { FiCheckCircle } from 'react-icons/fi';

function AdminModel({currentUser, setCurrentUser}) {
  const { authMessage, isOpen, handleClose, isChecked, updateAdminMethod } = useContext(AdminContext)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateAccount = (e) => {
    e.preventDefault()
    // 更新管理者帳密
    updateAdminMethod(currentUser, setCurrentUser, username, password)
    setUsername("")
    setPassword("")
  }


  return (
    <section className={`${isOpen ? 'bottom-12':'-bottom-full'} bg-stone-50 absolute shadow-lg md:w-[25vw] xl:max-w-[35vw] h-[30vh]
      transition-all duration-500 z-20 px-4 lg:px=[35px] `}>
      <div>
        <div className='flex items-center justify-between py-4 border-b'>
          <span className='text-slate-900 font-semibold tracking-wide'>帳號管理</span>
          <div
            onClick={ handleClose }
            className="cursor-pointer w-4/12 mr-4 flex justify-center items-center">
            <IoMdArrowDown size={ 20 } color="#0f172a"/>
          </div>
        </div>
      </div>

      <div>
        <div className="py-4">
          <div className="flex items-center space-x-6">
            <span className="text-sm text-gray-900 ">更新帳號</span>
            {isChecked ? 
              <div className="flex items-center space-x-2">
                <FiCheckCircle color="#4f46e5"/>
                <span className="text-base text-indigo-600">{ authMessage }</span>
              </div>
            : null}  
          </div>
          
          <form className="space-y-4 mt-2" action="" onSubmit={updateAccount}>
            <div>
              <div className="mt-2 w-10/12 flex items-center">
                <label htmlFor="username"
                  className="block text-base font-medium leading-6 text-slate-900 mr-2">
                  <PiUserCircle size={25}/>
                </label>
                <input id="username" name="username" type="text" autoComplete="username" required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="block w-full rounded-md border-0 py-1 px-3 text-slate-900 shadow-sm ring-1 ring-inset
                  ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-emerald-500
                  sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div className="mt-2 w-10/12 flex items-center">
                <label htmlFor="password"
                  className="block text-base font-medium leading-6 text-slate-900 mr-2">
                  <PiLockKeyLight size={25}/>
                </label>
                <input id="password" name="password" type="password" autoComplete="current-password" required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1 px-3 text-slate-900 shadow-sm ring-1 ring-inset
                  ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-emerald-500
                  sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div className="w-10/12">
              <button type="submit"
                className="flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm 
                font-semibold leading-6 text-gray-50 shadow-sm hover:bg-emerald-400 hover:text-gray-100
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-emerald-500">
                更新
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    
  )
}

export default AdminModel