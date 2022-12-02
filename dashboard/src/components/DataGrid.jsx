import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { HiOutlineSearch } from 'react-icons/hi';
import { CSVLink } from "react-csv";

const DataGrid = ({title,columns,data}) => {
  const [filterData, setFilterData] = useState(data);
    const [search, setSearch] = useState("");
    useEffect(() => {
      const newSearchData = data.filter(item => item.fullname.toLowerCase().includes(search.toLowerCase()))
      setFilterData(newSearchData)
  }, [search])
  return (
    <DataTable
      title={title}
      columns={columns}
      data={filterData}
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      actions={
        <CSVLink data={data} className="px-3 py-1 bg-green-400 rounded-md text-white flex items-center justify-center text-sm">Export</CSVLink>
      }
      subHeader
      subHeaderComponent={
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <HiOutlineSearch />
          </div>
          <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
        </div>
      }
      pagination
    />
  )
}

export default DataGrid