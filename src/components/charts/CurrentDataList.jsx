/* eslint-disable react/prop-types */

function CurrentDataList({ item }) {
  const { name, totalCount, totalPrice, } = item
  
  return (
    <section className="">
      <div className="border rounded-lg flex flex-col bg-stone-50 overflow-hidden space-y-4">
        <div className=" bg-emerald-400 p-2">
          <div className="text-xl text-bold text-gray-100 tracking-wide">
            <span>{name}</span>
          </div>
        </div>
            
        <div className="">
          {/* <div className="p-2 h-[70px]"> 
            {data.map((item, index) => (
              <div key={index} className="text-[0.9rem] truncate">
                {item.name}
              </div>
                
            ))}
          </div> */}
          <div className="md:px-12 text-emerald-500">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-[1rem]">銷售量</span>
              <span className="text-[1.9rem]">{totalCount}</span>
            </div>
            
            <div className="flex flex-col items-center space-y-1">
              <span className="text-[1rem]">銷售額</span>
              <span className="text-[1.9rem]">{totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CurrentDataList