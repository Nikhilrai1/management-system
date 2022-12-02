import React, { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataGrid from '../components/DataGrid';
import { deleteUser } from '../utils/authServices';


const Children = ({parentsOf}) => {
    console.log(parentsOf)
    const [child,setChild] = useState(parentsOf[0]);
    return (
        <select onChange={(e) => setChild(e.target.value)} name={"children"} value={child} >
            {parentsOf.map((item, index) => (
                <option key={index} className='w-full text-start' value={item}>{item}</option>
            ))}
        </select>
    )
}

const columns = [
    {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
        grow: 1
    },
    {
        name: 'Profile',
        selector: row => <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className='h-[30px] w-[30px] rounded-full' alt="img" />
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
        name: 'childern ID',
        selector: row => (
            <Children parentsOf={row.parentsOf} />
        ),
        sortable: true,
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
                    <button onClick={() => deleteUser(row._id, "Parents")} className="px-2 py-1 text-xs bg-red-400 rounded-md text-white hover:bg-red-600">
                        Delete
                    </button>
                </div>
            )
        },
        center: true,
        grow: 5
    },
];


function ParentsPage() {
    const [parents, setParents] = useState([])
    useLayoutEffect(() => {
        const getAllParents = async () => {
            try {
                const res = await fetch(`/api/auth/admin/getAllParents`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include"
                })

                const data = await res.json();
                if (data.success) {
                    setParents(data.parents)
                    console.log(parents)
                }
                else {
                    console.log(data.message)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        getAllParents()
    }, [])
    return (
        <div className='m-10 shadow-xl drop-shadow-xl'>
            {parents.length != 0 ?
                (<DataGrid
                    title={"Parents"}
                    columns={columns}
                    data={parents}
                />
                ) : (
                    <h1>Loading...</h1>
                )}
        </div>
    )
};

export default ParentsPage