/* eslint-disable react/prop-types */
import { PiUserCircle, PiLockKeyLight } from "react-icons/pi"
import { MdOutlineEmail } from "react-icons/md"
import { IoMdClose } from "react-icons/io"
import { LuShieldCheck } from "react-icons/lu"
import { useContext} from "react"
import { AdminContext } from "../../contexts/AdminContext"

function RegisterModel({ currentUser }) {
  const { isRegisterModel, registerName, setRegisterName,
    registerPassword, setRegisterPassword, checkPassword, setCheckPassword,
    email, setEmail, closeRegister, registerMessage, setRegisterMessage, registerClient } = useContext(AdminContext)
  const token = currentUser.token
  
  const sendRegister = (e) => {
    e.preventDefault()

    if (registerPassword === "" || checkPassword === "") {
      setRegisterMessage("請檢查密碼填寫正確")
    } else if (registerPassword !== checkPassword) {
      setRegisterMessage("請檢查密碼填寫正確")
    } else {
      registerClient(token, registerName, registerPassword, email)
    }

    setTimeout(() => {
      setRegisterMessage("")
    },2200)
  }

  return (
    <section className={`${ !isRegisterModel ? "opacity-0 scale-0 bg-slate-0" : "opacity-1 scale-75 bg-slate-900/90"} 
        flex min-h-[100vh] flex-col justify-center py-60 z-50 fixed top-0 w-6/12 transition-all duration-500 rounded-3xl`}>
      <div className="absolute top-10 right-10">
        <button className="rounded-md p-1 bg-rose-500 text-slate-200  
                  hover:bg-slate-50 hover:text-rose-500 hover:border-rose-500"
          onClick={() => { closeRegister() }}>
          <IoMdClose size={25}/>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center px-1">
        <h2 className="mt-50 text-center text-[2rem] leading-9 tracking-tight text-slate-50">
          註冊管理員
        </h2>
        {registerMessage && (
        <div className="mt-5 flex w-11/12 justify-center rounded-md bg-rose-600 px-3 py-1.5  text-white">
          <p className="text-[1.2rem]">{registerMessage}</p> 
        </div>
        )}
      </div>
    
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="" onSubmit={sendRegister}>
          <div className="flex items-center space-x-2 px-3 overflow-hidden">
            <label htmlFor="adminName">
              <PiUserCircle size={40} color="#f8fafc"/>
            </label>
            <div className="border rounded-lg overflow-hidden text-slate-800">
              <input id="adminName" name="adminName" type="text" autoComplete="username" required
                placeholder="Account / 管理員帳號"
                value={registerName}
                onChange={e => setRegisterName(e.target.value)}
                className="px-4 pr-16 py-1 text-[1.3rem] placeholder:text-[1.2rem]"/>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-3 overflow-hidden">
            <label htmlFor="adminPassword">
              <PiLockKeyLight size={40} color="#f8fafc"/>
            </label>
            <div className="border rounded-lg overflow-hidden text-slate-800">
              <input id="adminPassword" name="adminPassword" type="password" autoComplete="current-password"
                placeholder="Password / 管理員密碼"
                value={registerPassword}
                onChange={e => setRegisterPassword(e.target.value)}
                className="px-4 pr-16 py-1 text-[1.3rem] placeholder:text-[1.2rem]"/>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-3 overflow-hidden">
            <label htmlFor="checkPassword">
              <LuShieldCheck  size={39} color="#f8fafc"/>
            </label>
            <div className="border rounded-lg overflow-hidden text-slate-800">
              <input id="checkPassword" name="checkPassword" type="password"
                placeholder="Check / 確認密碼"
                value={checkPassword}
                onChange={e => setCheckPassword(e.target.value)}
                className="px-4 pr-16 py-1 text-[1.3rem] placeholder:text-[1.2rem]"/>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-3 overflow-hidden">
            <label htmlFor="adminEmail">
              <MdOutlineEmail size={40} color="#f8fafc"/>
            </label>
            <div className="border rounded-lg overflow-hidden text-slate-800">
              <input id="adminEmail" name="adminEmail" type="email" autoComplete="email" required
                placeholder="Email / 電子信箱"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="px-4 pr-16  py-1 text-[1.3rem] placeholder:text-[1.2rem]"/>
            </div>
          </div>
          

          <div className="space-y-2">
            <div className="flex justify-center">
              <button type="submit"
                className="flex w-11/12 justify-center border-2 border-emerald-500 rounded-md bg-emerald-500 py-2 text-[1.2rem] 
                leading-6 text-gray-50 shadow-sm hover:border-emerald-600 hover:bg-opacity-0 hover:text-slate-100 mt-2
                cursor-pointer">
                新增
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default RegisterModel