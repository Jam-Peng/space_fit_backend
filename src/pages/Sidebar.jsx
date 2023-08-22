/* eslint-disable react/prop-types */
import logo from "../assets/logo.png"
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { AiOutlineTeam, AiOutlineBarChart } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { FaShopify, FaUserShield } from "react-icons/fa";
import {
	BsCardList, BsListOl, BsDoorOpen, BsPersonFillGear,
	BsThreeDots, BsShieldCheck
} from "react-icons/bs";
import { PiUserFocusFill } from "react-icons/pi";
import { LuCalendarSearch } from "react-icons/lu";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/Auth.service"
import { AdminContext } from "../contexts/AdminContext"
import AdminModel from "../components/admin/AdminModel"


function Sidebar({ currentUser, setCurrentUser}) {
	const navigate = useNavigate();
	const { isOpen, setIsOpen } = useContext(AdminContext)
	const [ isCourse, setIsCourse ] = useState(false)
	const [ isClient, setIsClient ] = useState(false)
	const [ isAdmin, setIsAdmin ] = useState(false)
	const [ isEchart, setIsEchart ] = useState(false)

  const logout = () => {
    AuthService.logout();
    setCurrentUser(null);
    navigate("/");
	};
	
	const courseToggle = () => {
		const courseList = document.querySelector('#courseList')
		courseList.classList.toggle("courseListHigh")
		setIsCourse(!isCourse)
	}

	const clientToggle  = () => {
		const courseList = document.querySelector('#clientList')
		courseList.classList.toggle("clientListHigh")
		setIsClient(!isClient)
	}

	const adminToggle  = () => {
		const courseList = document.querySelector('#adminList')
		courseList.classList.toggle("adminListHigh")
		setIsAdmin(!isAdmin)
	}

	const echartToggle  = () => {
		const courseList = document.querySelector('#echartList')
		courseList.classList.toggle("echartListHigh")
		setIsEchart(!isEchart)
	}


  return (
		<section className="flex flex-col justify-between h-full relative overflow-hidden">
			<div className="space-y-3 flex flex-col justify-center p-5">
				<div className="flex items-center justify-self-end py-2 px-1 space-x-2">     
					<img src={logo} alt="Logo_Img"
						className="w-12 h-12 rounded-lg dark:bg-gray-500 p-1" />
					<div>
						<h2 className="text-lg text-gray-200 font-semibold tracking-wide">SPACE FIT</h2>
					</div>
				</div>

				<div className="flex-1">
					<ul className="pt-2 pb-4 space-y-2 text-sm text-gray-200 ">
						<li className="rounded-md hover:bg-emerald-500 hover:text-gray-100 relative overflow-hidden" id="courseList">  
							<div className="flex justify-between items-center">
								<a rel="noopener noreferrer" href="/dashboard"
									className="flex items-center p-2 space-x-3">
									<BsListOl size={25}/>
									<span className="text-base">課程管理</span>
								</a>
								{currentUser.admin ?
									<button className="p-1"
										onClick ={ courseToggle }
										>
										<IoIosArrowDown size={20} className="hover:text-rose-500 "/>
									</button>
								: null}
							</div>
							{/* 課程管理 list */} 
							{currentUser.admin ?
								<div className={`${isCourse ? '-bottom-11' : '-bottom-full'} z-70 bg-stone-50 absolute border rounded-md 
									w-full h-full shadow-lg transition-all duration-1000 text-emerald-500 p-2 border-t border-slate-200`}
									onMouseLeave={ courseToggle }>
									<a rel="noopener noreferrer" href="/dashboard/predelcourse"
										className="flex items-center space-x-2">
										<BsShieldCheck size={20}/>
										<span className="text-base ">待刪除課程</span>
									</a>
								</div>
							: null}
						</li>
						<li className="rounded-md hover:bg-emerald-500 hover:text-gray-100">
							<a rel="noopener noreferrer" href="/dashboard/order"
								className="flex items-center p-2 space-x-3">
								<BsCardList size={25}/>
								<span className="text-base">訂單管理</span>
							</a>
						</li>
						{currentUser.admin == 2 ?     /* 暫時隱藏產品管理功能 */
						<li className="rounded-md hover:bg-emerald-500 hover:text-gray-100">
							<a rel="noopener noreferrer" href="/dashboard/product"
								className="flex items-center p-2 space-x-3">
								<FaShopify size={25}/>
								<span className="text-base">產品管理</span>
							</a>
						</li>
						: null}
						<li className="rounded-md hover:bg-emerald-500 hover:text-gray-100 relative overflow-hidden" id="clientList">
							<div className="flex justify-between items-center">
								<a rel="noopener noreferrer" href="/dashboard/client"
									className="flex items-center p-2 space-x-3">
									<AiOutlineTeam size={25}/>
									<span className="text-base">會員管理</span>
								</a>
								{currentUser.admin ?
									<button className="p-1"
										onClick ={ clientToggle }
										>
										<IoIosArrowDown size={20} className="hover:text-rose-500 "/>
									</button>
								: null}
							</div>
							{/* 會員管理 list */} 
							{currentUser.admin ?
								<div className={`${isClient ? '-bottom-11' : '-bottom-full'} z-70 bg-stone-50 absolute border rounded-md 
									w-full h-full shadow-lg transition-all duration-1000 text-emerald-500 p-2 border-t border-slate-200`}
									onMouseLeave={ clientToggle }>
									<a rel="noopener noreferrer" href="/dashboard/predelclient"
										className="flex items-center space-x-2">
										<PiUserFocusFill size={23}/>
										<span className="text-base ">黑名單</span>
									</a>
								</div>
							: null}
						</li>
						<li className="rounded-md hover:bg-emerald-500 hover:text-gray-100 relative overflow-hidden" id="echartList">
							<div className="flex justify-between items-center">
								<a rel="noopener noreferrer" href="/dashboard/chart"
									className="flex items-center p-2 space-x-3">
									<AiOutlineBarChart size={25}/>
									<span className="text-base">圖表管理</span>
								</a>
								<button className="p-1"
									onClick ={ echartToggle }
									>
									<IoIosArrowDown size={20} className="hover:text-rose-500 "/>
								</button>
							</div>
							<div className={`${isEchart ? '-bottom-11' : '-bottom-full'} z-70 bg-stone-50 absolute border rounded-md 
									w-full h-full shadow-lg transition-all duration-1000 text-emerald-500 p-2 border-t border-slate-200`}
									onMouseLeave={ echartToggle }>
									<a rel="noopener noreferrer" href="/dashboard/searchdate"
										className="flex items-center space-x-2">
										<LuCalendarSearch size={23}/>
										<span className="text-base ">銷售額查詢</span>
									</a>
								</div>
						</li>
						<li className="rounded-md hover:bg-emerald-500 hover:text-gray-100 relative overflow-hidden" id="adminList">
							<div className="flex justify-between items-center">
								<a rel="noopener noreferrer" href="/dashboard/admin"
									className="flex items-center p-2 space-x-3">
									<MdOutlineAdminPanelSettings size={25}/>
									<span className="text-base">管理員權限</span>
								</a>
								{currentUser.admin ?
									<button className="p-1"
										onClick ={ adminToggle }
										>
										<IoIosArrowDown size={20} className="hover:text-rose-500 "/>
									</button>
								: null}
							</div>
							{/* 管理者權限 list */} 
							{currentUser.admin ?
								<div className={`${isAdmin ? '-bottom-11' : '-bottom-full'} z-70 bg-stone-50 absolute border rounded-md 
									w-full h-full shadow-lg transition-all duration-1000 text-emerald-500 p-2 border-t border-slate-200`}
									onMouseLeave={ adminToggle }>
									<a rel="noopener noreferrer" href="/dashboard/predeladmin"
										className="flex items-center space-x-2">
										<FaUserShield size={22}/>
										<span className="text-base ">待刪除管理員</span>
									</a>
								</div>
							: null}
						</li>
						<li className="rounded-md hover:bg-emerald-500 hover:text-gray-100">
							<a onClick={ logout }
								rel="noopener noreferrer" href=""
								className="flex items-center p-2 space-x-3">
								<BsDoorOpen size={25}/>
								<span className="text-base">登出</span>
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="flex items-center p-3 px-5 mt-12 space-x-3 justify-self-end text-gray-50 bg-emerald-500 rounded-bl-lg">
				<BsPersonFillGear size={25}/>
				<div className="flex items-center justify-between w-full">
					<h2 className="text-lg">{ currentUser.username }</h2>
					<BsThreeDots size={20} className="cursor-pointer" onClick={()=>{setIsOpen(!isOpen)}}/>
				</div>
			</div>
			<AdminModel currentUser={currentUser} setCurrentUser={setCurrentUser} />
		</section>	
  )
}

export default Sidebar