import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './static/css/index.css'
import AdminProvider from './contexts/AdminContext.jsx'
import CourseProvider from './contexts/CourseContext.jsx'
import EchartProvider from './contexts/EchartContext.jsx'
import OrderProvider from './contexts/OrderContext.jsx'
import ClientProvider from './contexts/ClientContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <OrderProvider>
    <EchartProvider>
      <CourseProvider>
        <AdminProvider>
          <ClientProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </ClientProvider>
        </AdminProvider>
      </CourseProvider>
    </EchartProvider>
  </OrderProvider>
)
