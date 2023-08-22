/* eslint-disable react/prop-types */
import { useState } from "react";
import AuthService from "../services/Auth.service"
import { useNavigate } from "react-router-dom";
import { PulseLoader} from 'react-spinners';
import { PiUserCircle, PiLockKeyLight } from "react-icons/pi"

function Login({setCurrentUser}) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const sendLogin = async (e) => {
    e.preventDefault()
    
    AuthService.login(username, password)
      .then((res) => {
        setLoading(true);

        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data));
          setCurrentUser(AuthService.getCurrentUser());
          setTimeout(() => {
            navigate("/dashboard");
          }, 3000)
        }
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      })
      .finally(() => {
        setTimeout(() => {
          setMessage("")
          setLoading(false);
        }, 2500)
      })
    setUsername("")
    setPassword("")
  }

  return (
      <section className="flex flex-col justify-center items-center px-6 lg:px-8 min-h-screen">
        {isLoading ? (
          <div className="text-center flex w-full items-center justify-center mt-22">
              <p className="text-base mr-3 text-emerald-500">Loading </p>
              <PulseLoader color="#34d399" loading />
          </div>
          ) : (
          <>
            <div className="border rounded-lg px-24 py-16 shadow-lg bg-gray-100">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <div className="flex flex-col items-center text-2xl font-bold leading-9 tracking-tight 
                      text-slate-800 space-y-2">
                    <span className="text-[1.9rem] tracking-wide">智能預約管理系統</span>
                    <span className="text-[1.2rem]">Sign in to your account</span>
                </div>
                {message && (
                <div className="mt-5 flex w-full justify-center rounded-md bg-rose-600 px-3 py-1.5 text-base text-white">
                  <p>{message}</p> 
                </div>
                )}
              </div>
          
              <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="" onSubmit={sendLogin}>
                  <div className="flex items-center space-x-2">
                    <label htmlFor="username" className="block text-base font-medium leading-6 text-slate-800">
                      <PiUserCircle size={30}/>
                    </label>
                    <div className="w-11/12">
                      <input id="username" name="username" type="text" autoComplete="username" required
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="block w-full rounded-md border-0 p-2 px-4 text-slate-800 shadow-sm ring-1 ring-inset
                        ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-emerald-500
                        text-[1.1rem] sm:leading-5"/>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-base font-medium leading-6 text-slate-800">
                        <PiLockKeyLight size={30}/>
                        </label>
                    </div>
                    <div className="w-11/12">
                      <input id="password" name="password" type="password" autoComplete="current-password" required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="block w-full rounded-md border-0 p-2 px-4 text-slate-800 shadow-sm ring-1 ring-inset
                        ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-emerald-500
                        text-[1.1rem] sm:leading-5"/>
                    </div>
                  </div>
                  <div>
                    <button type="submit"
                      className="flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm 
                      font-semibold leading-6 text-gray-50 shadow-sm hover:bg-emerald-400 hover:text-gray-100
                      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                      focus-visible:outline-emerald-500">
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </section>
  )
}

export default Login