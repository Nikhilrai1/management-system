import React, { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataGrid from '../components/DataGrid';
import { deleteUser } from '../utils/authServices';


const columns = [
    {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
        grow: 1
    },
    {
        name: 'Profile',
        selector: row => <img src={row.photo ? row.photo : "./unknown_user.png"} className='h-[30px] w-[30px] rounded-full' alt="img" />,
        grow: 1
    },
    {
        name: 'Fullname',
        selector: row => row.fullname,
        sortable: true,
    },
    {
        name: 'Gender',
        selector: row => row.gender,
        sortable: true,
        grow: 1
    },
    {
        name: 'Roll',
        selector: row => row.roll,
        sortable: true,
        grow: 1
    },
    {
        name: 'Stream',
        selector: row => row.stream,
        sortable: true,
        grow: 1
    },
    {
        name: 'Grade',
        selector: row => row.grade,
        sortable: true,
        center: true,
        grow: 1
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
        grow: 2
    },
    {
        name: 'Mobile',
        selector: row => row.mobile,
        sortable: true,
        grow: 1
    },
    {
        name: 'Address',
        selector: row => row.address,
        sortable: true,
        grow: 1

    },
    {
        name: 'Section',
        selector: row => row.section,
        sortable: true,
        center: true
    },
    {
        name: 'DOB',
        selector: row => row.dob,
        sortable: true,
        center: true,
        grow: 1
    },
    {
        name: 'Actions',
        cell: (row) => {
                const navigate = useNavigate();
            return (
                <div className="flex gap-1 justify-between items-center">
                    <button onClick={() => navigate(`/profile`,{state: {profile: row}})} className="px-2 py-1 text-xs bg-blue-400 rounded-md text-white hover:bg-blue-600">
                        view
                    </button>
                    <button onClick={() => alert(row.id)} className="px-2 py-1 text-xs bg-green-400 rounded-md text-white hover:bg-green-600">
                        Edit
                    </button>
                    <button onClick={() => deleteUser(row._id, "Student")} className="px-2 py-1 text-xs bg-red-400 rounded-md text-white hover:bg-red-600">
                        Delete
                    </button>
                </div>
            )
        },
        center: true,
        grow: 5
    },
];


function Students() {
    const [students, setStudents] = useState([])
    useLayoutEffect(() => {
        const getAllStudents = async () => {
            try {
                const res = await fetch(`/api/auth/admin/getAllStudents`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include"
                })

                const data = await res.json();
                if (data.success) {
                    setStudents(data.students)
                }
                else {
                    console.log(data.message)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        getAllStudents()
    }, [])
    return (
        <div className='m-10 shadow-xl drop-shadow-xl'>
            {students.length != 0 ?
                (<DataGrid
                    title={"Students"}
                    columns={columns}
                    data={students}
                />
                ) : (
                    <h1>Loading...</h1>
                )}
        </div>
    )
};

export default Students