/* eslint-disable react-hooks/exhaustive-deps */
import { BiSearch } from "react-icons/bi";
import { useContext, useState, useMemo, useRef, useEffect  } from "react"
import { EchartContext } from "../../contexts/EchartContext";
import * as echarts from "echarts";
import CurrentDataList from "./currentDataList";

function SearchCurrentSales() {
  const chartRef = useRef(null);
  const [searchDate, setSearchDate] = useState("")
  const { searchSalesDate, date, getCurrentOrder, setSearchSalesDate, getSearchOrder,
    setSearchState, searchState } = useContext(EchartContext)
  const [reformattedData, setReformattedData] = useState([]);   /* 重組資料陣列 */
  

  useEffect(() => {
    if (searchState) {
      getCurrentOrder();
    } else {
      setSearchSalesDate([]);
      getSearchOrder();
    }
  }, []);

  // 設定選擇日期
  const today = new Date().toLocaleDateString("zh-TW", {
    timeZone: "Asia/Taipei",
  });
  // 查詢日期
  const handleChange = (e) => {
    const date = e.target.value
    const current_date = date.split('T')[0]
    setSearchDate(current_date)
  }

  // 取得查詢的日期資料
  const handleSearch = () => {
    if (searchDate === "") {
      return
    } else {
      getSearchOrder(searchDate);
      setSearchState(false);
    }
    setSearchDate("")
  }

  // 進行資料重組
  useEffect(() => {
    const newData = Object.keys(searchSalesDate).map(category => ({
      name: category,
      courses: Object.keys(searchSalesDate[category].courses).map(courseTitle => ({
        count: searchSalesDate[category].courses[courseTitle].count,
        course_title: courseTitle,
        total_price: searchSalesDate[category].courses[courseTitle].total_price
      }))
    }));

    setReformattedData(newData);
  }, [searchSalesDate]);

  // 取得所有分類裡的課程
  const allCourses = reformattedData.flatMap(category => category.courses);
  
  // 重組資料給 CurrentDataList 用
  const newData = reformattedData.map((category) => {
    const totalPrice = category.courses.reduce((sum, course) => sum + course.total_price, 0);
    const totalCount = category.courses.reduce((sum, course) => sum + course.count, 0);
  
    return {
      name: category.name,
      totalPrice: totalPrice,
      totalCount: totalCount,
      data: category.courses.map((course) => ({
        name: course.course_title,
        value: course.total_price,
      })),
    };
  });
  
  // 建立顏色映射表，可以根據需要設定不同的顏色
  const colorMap = ['#f43f5e', '#f97316', '#facc15', '#10b981', '#5470c6', '#9333ea', '#9ca3af']

  // 圖表資料
  const option = useMemo(() => ({
    title: {
      text:  "當日課程銷售",
      subtext: '',
      textStyle: {
        fontWeight: 'normal',
        fontSize: 20,
      },
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      top: '20%',          // 設定圖表頂部的距離
      // left: '3%',       // 設定圖表左側的距離
      // right: '3%',      // 設定圖表右側的距離
      bottom: '0%',        // 設定圖表底部的距離，包括圖例
      containLabel: true,  // 自動調整內容，避免被圖例遮擋
    },  
    legend: {
      data: allCourses.map(course => course.course_title),
      textStyle: {
        fontWeight: 'normal', 
        fontSize: 15, 
      },
      width: '70%',    // 設定圖例的寬度
      right: '15%',    // 設定圖例的位置靠右
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: false, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: false },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        // prettier-ignore
        data: [`${date} 當日所有銷售課程`],
        // show: false,      // 不顯示x軸,
        axisLabel: {
          fontSize: 14,      // 調整字體大小
          margin: 20,        // 調整刻度標籤距離軸線的距離
        },
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          fontSize: 13,    
          margin: 20,   
        },
        
      }
    ],
    series: allCourses.map((course,index) => ({
      name: course.course_title,
      type: 'bar',
      data: [course.total_price],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' },
        ],
      },
      markLine: {
        // data: [{ type: 'average', name: 'Avg' }],
      },
      itemStyle: {
        color: colorMap[index],
      },
    })),

  }),[colorMap, allCourses, date])  

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);
    myChart.setOption(option);
  
    // 設定圖表自適應
    const handleResize = () => {
      myChart.resize();
    };
    window.addEventListener('resize', handleResize);
  
    // 在組件卸載前銷毀，避免內存泄漏。
    return () => {
      myChart.dispose();
      window.removeEventListener('resize', handleResize);
    };
    
  }, [option,reformattedData]);


  return (
    <section className="space-y-4 p-4 h-full flex flex-col min-w-full">
      <div className="flex items-center space-x-2">
        <label htmlFor="search_date">查詢日期</label>
        <input type="date" id="search_date" name="search_date" max={today}
          value={searchDate}           
          onChange={ handleChange }
          className=" w-3/12 block rounded-md border-0 py-0.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset
          ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-emerald-500
          sm:text-sm sm:leading-6"
        />
        <button className="btn btn-success text-base" onClick={handleSearch}>
          <div className="flex items-center ">
            <BiSearch size={20}/>
            <span>查詢</span>
          </div>
        </button>
        <a href="/dashboard/chart" rel="noopener noreferrer">
          <button className="btn btn-success text-base">
            <span>總銷售額</span>
          </button>
        </a>
      </div>
      <div className="flex space-x-2">
        {newData.map((item, index) => (
          <div key={index} className="flex-1">
          <CurrentDataList item={item} />
          </div>
        ))}
      </div> 
      <div className="pt-4 px-4 rounded-lg border-2 bg-stone-50 ">
        <div ref={chartRef} style={{ width: '100%', height: '440px' }}
            className="h-full py-4"/> 
      </div>
    </section >
  )
}

export default SearchCurrentSales