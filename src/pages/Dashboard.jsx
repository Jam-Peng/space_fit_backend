/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import jwtDecode from 'jwt-decode';
import { useState } from "react";
import AuthService from "../services/Auth.service"


function Dashboard({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const [isTokenValid, setTokenValid] = useState(true);
  // console.log('檢查token狀態', currentUser);

  useEffect(() => {
    // 如果 localStorage 中沒有 Token，導向 Login 頁面
    if (!currentUser) {
      navigate("/")
      setTokenValid(false);
      return;
    }
    // 比對目前的時間和token的到期日是否已經過期
    const checkTokenExpiration = () => {
      // 取token中的到期時間
      const token = currentUser.token
      const decodedToken = jwtDecode(token);
      
      // 將 token 到期日轉換成 UNIX 時間戳
      const tokenExpiration = new Date(decodedToken.expires);
      const tokenExpirationTimestamp = Math.floor(tokenExpiration.getTime() / 1000);

      // 目前的時間戳
      const nowTimestamp = Math.floor(new Date().getTime() / 1000);

      // if (nowTimestamp > tokenExpirationTimestamp) {
      //   setTokenValid(false)
      //   AuthService.logout();
      //   setCurrentUser(null);
      //   navigate("/")
      //   return
      // } 

      // 重新取的新token - 將目前時間和到期日的時間戳相減，轉成毫秒
      const timeStamp = tokenExpirationTimestamp - nowTimestamp
      const timeToExpire = (new Date(timeStamp).getTime()) * 1000;
      // console.log(timeToExpire)
      const refreshInterval = 60000;   // 設定 1 分鐘(單位為毫秒)，檢查快過期時發送 API 取的新的token

      if (timeToExpire < refreshInterval) {
        AuthService.refreshToken(currentUser)
          .then((res) => {
            if (res.status === 200) {
              const newToken = res.data;
              localStorage.setItem("user", JSON.stringify(newToken));
              setCurrentUser(AuthService.getCurrentUser());
              setTokenValid(true);
            }else {
              navigate("/")
              setTokenValid(false);
            }
          })
          .catch((error) => { 
            console.log(error.response)
            navigate("/")
            setTokenValid(false);
          })
      }
    }
    // 初次渲染時檢查 Token 過期
    checkTokenExpiration();

    // 設置計時器，50秒檢查一次Token時效
    const intervalId = setInterval(checkTokenExpiration, 50000);

    // 在組件解除掛載時清除計時器
    return () => clearInterval(intervalId);
  },[currentUser, navigate, setCurrentUser])

  if (!isTokenValid) {
    navigate("/")
  }
  
  return (
    <section className="flex flex-wrap h-screen py-10 container mx-auto">
      <div className="flex bg-gray-100 w-full rounded-lg ">
        <div className="w-3/12 bg-slate-900 shadow-lg rounded-l-lg">
          <Sidebar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </div>
        <div className="w-9/12">
          <Outlet/>
        </div>  
      </div>
    </section>
  )
}

export default Dashboard