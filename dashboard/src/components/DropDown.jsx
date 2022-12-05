import React, { useEffect, useState } from 'react'

const DropDown = ({ search, setKid, searchFor, students }) => {
  const [filterStudents, setFilterStudents] = useState(students)
  useEffect(() => {
    const newSearchData = students.filter(item => item[searchFor].toLowerCase().includes(search.toLowerCase()))
    setFilterStudents(newSearchData)
  }, [search])
  return (
    <div className='rounded-md drop-shadow-sm shadow-md w-full'>
      <table className="w-full max-h-[400px] overflow-auto">
        <thead>
          <tr className="bg-gray-500 text-white">
            <th className="text-center py-1" data-priority="1">Profile</th>
            <th className="text-center py-1" data-priority="2">ID</th>
            <th className="text-center py-1" data-priority="3">Fullname</th>
          </tr>
        </thead>
        <tbody>
          {filterStudents.length == 0 && (
            <tr className='text-center'>
              <td className="text-center py-1">No Search Found</td>
              <td className="text-center py-1"></td>
              <td className="text-center py-1"></td>
            </tr>)}
          {filterStudents.map(student => (
            <tr onClick={() => setKid(student)} key={student._id} className="hover:bg-gray-200">
              <td className="grid place-items-center py-1">
                <img className="w-10 h-10 rounded-full" src="/unknown_user.png" alt="profile" />
              </td>
              <td className="text-center py-1">{student?.id}</td>
              <td className="text-center py-1">{student?.fullname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DropDown