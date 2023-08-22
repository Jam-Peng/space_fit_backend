/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'
import EchartService from '../services/Echart.service';

export const EchartContext = createContext()

const EchartProvider = ({ children }) => {
  const [message, setMessage] = useState('')
  const [salesData, setSalesData] = useState([]);
  const [searchSalesDate, setSearchSalesDate] = useState([]);
  const [date, setDate] = useState('')
  const [searchState, setSearchState ] = useState(true)
  
  // 取得總銷售課程資料
  const getAllOrderDatas = () => {
    EchartService.getAllDatas()
      .then((res) => {
        if (res.status === 200) {
          setSalesData(res.data.course_stats)
        }
      })
      .catch((err) => {
        setMessage(err.response.data.message)
      })
      .finally(() => {
        setTimeout(() => {
          setMessage("")
        }, 2500)
      })
  }

  // 取得當前銷售課程資料
  const getCurrentOrder = () => {
    EchartService.getCurrentDatas()
      .then((res) => {
        if (res.status === 200) {
          setSearchSalesDate(res.data.course_stats);
          setDate(res.data.date);
        }
      })
      .catch((err) => {
        setMessage(err.response.data.message)
      })
      .finally(() => {
        setTimeout(() => {
          setMessage("")
        }, 2500)
      })
  }

  // 取得查詢的日期資料
  const getSearchOrder = (searchDate) => { 
    EchartService.getSearchDatas(searchDate)
      .then((res) => {
        if (res.status === 200) {
          setSearchSalesDate(res.data.course_stats);
          setDate(res.data.date);
        }
      })
      .catch((err) => {
        setMessage(err.response.data.message)
      })
      .finally(() => {
        setTimeout(() => {
          setMessage("")
        }, 2500)
      })
  }

  // 控制資料更新的間隔時間
  // const updateInterval = 100000; 
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getAllOrderDatas()
  //   }, updateInterval);

  //   // 初始化時也獲取一次資料
  //   getAllOrderDatas();

  //   // 判斷當前與查詢日期時圖表的顯示狀態
  //   if (searchState) {
  //     getCurrentOrder()
  //   } else {
  //     setSearchSalesDate([])
  //     getSearchOrder()
  //   }

  //   return () => {
  //     clearInterval(interval);
  //   }
  // }, [searchState]);

  return (
    <EchartContext.Provider
      value={{
        message, setMessage, salesData, searchSalesDate, date, getAllOrderDatas, getCurrentOrder, getSearchOrder,
        setSearchState, searchState,
      }}>
      {children}
    </EchartContext.Provider>
  )
}

export default EchartProvider