/* eslint-disable react/prop-types */

function EchartDataList({ item }) {
  
  const { category, count, total_price}=item

  return (
    <section>
      <div className="border rounded-lg flex flex-col space-y-4 bg-stone-50 overflow-hidden">
        <div className=" bg-emerald-400 p-2">
          <span className="text-xl text-bold text-gray-100 tracking-wide">
            {category}
          </span>
        </div>
            
        {/* <div className="flex items-center space-x-2 px-2 py-4 text-emerald-500"> */}
        <div className="md:px-12 text-emerald-500">
          <div className="flex flex-col items-center space-y-1">
            <span className="text-[1rem]">銷售量</span>
            <span className="text-[1.9rem]">{count}</span>
          </div>
          
          <div className="flex flex-col items-center space-y-1">
            <span className="text-[1rem]">銷售額</span>
            <span className="text-[1.9rem]">{total_price}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EchartDataList