import React from 'react'

const KidList = ({kids}) => {
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
        {kids.map(student => (
          <tr key={student._id} className="hover:bg-gray-200">
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

export default KidList