/* eslint-disable react-hooks/exhaustive-deps */
import { BiSearch } from "react-icons/bi";
import { useContext, useEffect, useMemo, useRef } from "react";
import { EchartContext } from "../contexts/EchartContext";
import * as echarts from "echarts";
import EchartDataList from "../components/charts/EchartDataList";

function Charts() {
  const { salesData, getAllOrderDatas } = useContext(EchartContext)
  const chartRef = useRef(null);

  useEffect(() => {
    getAllOrderDatas()
    const interval = setInterval(() => {
      getAllOrderDatas();
    }, 10000);

    return () => {
      clearInterval(interval);
    }
  },[])

  // 取得所有分類
  const categories = salesData.map((item) => item.category);

  // 將每個分類的 total_price 整理到陣列中
  const categoryTotalPrices = salesData.map((item) => item.total_price);

  // 建立顏色映射表，可以根據需要設定不同的顏色
  const colorMap = [ '#f43f5e', '#f97316', '#10b981', '#5470c6', '#d946ef' ]

  // 將資料整理成圖表指定格式
  const datas = categories.map((category, index) => ({
    name: category,
    data: [categoryTotalPrices[index]],
    color: colorMap[index % colorMap.length], // 使用對應的顏色
  }));


  // 圖表資料
  const option = useMemo(() => ({
    title: {
      text: '各類別銷售額',
      subtext: '',
      textStyle: {
        fontWeight: 'normal',
        fontSize: 21,
      },
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: categories,
      textStyle: {
        fontWeight: 'normal', 
        fontSize: 15, 
      },
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
        data: ['課程類別'],
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
    series: datas.map((data) => ({
      name: data.name,
      type: 'bar',
      data: data.data,
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
        color: data.color,
      },
    })),

  }),[ categories, datas])  

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
  }, [option]);
  

  return (
    <section className="space-y-4 p-4 h-full flex flex-col min-w-full">
      <div>
        <a href="/dashboard/searchdate" rel="noopener noreferrer">
          <button className="btn btn-success text-base">
            <div className="flex items-center space-x-1">
              <BiSearch size={20}/>
              <span>每日銷售</span>
            </div>
          </button>
        </a>
      </div>
      <div className="flex space-x-2">
        {salesData.map((item, index) => (
            <div key={index} className="flex-1">
              <EchartDataList item={item} />
            </div>
        ))}
      </div>
      <div className="pt-4 px-4 rounded-lg border-2 bg-stone-50 ">
        <div ref={chartRef} style={{ width: '100%', height: '440px' }}
          className="h-full "/> 
      </div>
    </section >
  )
}

export default Charts