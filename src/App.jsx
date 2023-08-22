import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Courses from "./pages/Courses"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import AuthService from "./services/Auth.service";
import { useState } from "react";
import Orders from "./pages/Orders";
import PreDeleteCourse from "./pages/PreDeleteCourse";
import Charts from "./pages/Charts";
import Client from "./pages/Client";
import Products from "./pages/Products";
import PreDeleteClient from "./pages/PreDeleteClient";
import Admin from "./pages/Admin";
import PreDeleteAdmin from "./pages/PreDeleteAdmin";
import SearchCurrentSales from "./components/charts/SearchCurrentSales";

function App() {
  // 管理者狀態
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser() );
  
  return (
    <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Login setCurrentUser={setCurrentUser} />} />
            {currentUser ? 
            <Route path="/dashboard" element={<Dashboard currentUser={currentUser} setCurrentUser={setCurrentUser}/>}>
              <Route index element={<Courses currentUser={currentUser} />} />
              <Route path="/dashboard/predelcourse" element={<PreDeleteCourse currentUser={currentUser}/>}/>
              <Route path="/dashboard/order" element={<Orders currentUser={currentUser}/>}/>
              <Route path="/dashboard/client" element={<Client currentUser={currentUser} />} />
              <Route path="/dashboard/predelclient" element={<PreDeleteClient currentUser={currentUser}/>}/>
              <Route path="/dashboard/admin" element={<Admin currentUser={currentUser} />} />
              <Route path="/dashboard/predeladmin" element={<PreDeleteAdmin currentUser={currentUser}/>}/>
              <Route path="/dashboard/chart" element={<Charts currentUser={currentUser}/>}/>
              <Route path="/dashboard/searchdate" element={<SearchCurrentSales currentUser={currentUser}/>}/>
              <Route path="/dashboard/product" element={<Products currentUser={currentUser}/>}/>
            </Route>
            :
            null
            }
          </Route>
          <Route path="*" element={<NotFound />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App