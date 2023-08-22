import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useContext } from "react";
import { ClientContext } from "../../contexts/ClientContext";

function SearchClient() {
  const [search, setSearch] = useState('')
  const { searchClient } = useContext(ClientContext)

  // 搜尋會員
  const handleSearch = (e) => {
    e.preventDefault();

    searchClient(search)
    setSearch("")
  }

  return (
    <section>
      <div className="relative flex w-full flex-wrap items-stretch ">
        <input
          type="search"
          className="input_search placeholder:text-[0.87rem]"
          placeholder="查詢會員電話"
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

export default SearchClient