import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { OrderContext } from "../../contexts/OrderContext";
import { useContext } from "react";

function SearchModel() {
  const [search, setSearch] = useState('')
  const { searchOrder } = useContext(OrderContext)

  // 搜尋訂單
  const handleSearch = (e) => {
    e.preventDefault();

    searchOrder(search)
    setSearch("")
  }

  return (
    <section>
      <div className="relative flex w-full flex-wrap items-stretch ">
        <input
          type="search"
          className="input_search placeholder:text-[0.87rem]"
          placeholder="查詢訂單編號"
          aria-label="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <button
          className="relative z-[3] flex items-center rounded-r bg-emerald-500 px-4 leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
          type="button"
          id="button-addon1"
          onClick={handleSearch}
        >
          <BiSearch size={20}/>
        </button>
      </div>
    </section>
  )
}

export default SearchModel