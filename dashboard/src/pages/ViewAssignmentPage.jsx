import React, { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataGrid from '../components/DataGrid';
import { deleteUser } from '../utils/authServices';


const columns = [
    {
        name: 'Filename',
        selector: row => row.files[0]?.uploadTask?._metadata?.name,
        sortable: true,
        grow: 1
    },
    {
        name: 'FileType',
        selector: row => row.files[0]?.uploadTask?._blob?.type_,
        sortable: true,
    },
    {
        name: 'Stream',
        selector: row => row.stream,
        sortable: true,
        grow: 2
    },
    {
        name: 'Grade',
        selector: row => row.grade,
        sortable: true,
        grow: 1
    },
    {
        name: 'Subject',
        selector: row => row.subject,
        sortable: true,
        grow: 1

    },
    {
        name: 'Deadline',
        selector: row => row.deadline,
        sortable: true,
        center: true,
        grow: 1
    },
    {
        name: 'Actions',
        cell: (row) => {
            return (
                <div className="flex gap-1 justify-between items-center">
                    <button onClick={() => { }} className="px-2 py-1 text-xs bg-blue-400 rounded-md text-white hover:bg-blue-600">
                        view
                    </button>
                    <button onClick={() => { }} className="px-2 py-1 text-xs bg-green-400 rounded-md text-white hover:bg-green-600">
                        Edit
                    </button>
                    <button onClick={() => { }} className="px-2 py-1 text-xs bg-red-400 rounded-md text-white hover:bg-red-600">
                        Delete
                    </button>
                </div>
            )
        },
        center: true,
        grow: 5
    },
];


function ViewAssignmentPage() {
    const [assignment, setAssignment] = useState([])
    useLayoutEffect(() => {
        const getAssignments = async () => {
            try {
                const res = await fetch(`/api/assignment/getAllAssignment`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include"
                })

                const data = await res.json();
                if (data.success) {
                    setAssignment(data.assignment)
                }
                else {
                    alert(data.message)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        getAssignments()
    }, [])
    return (
        <div className='m-10 shadow-xl drop-shadow-xl'>
            {assignment.length != 0 ?
                (<DataGrid
                    title={"Assignment"}
                    columns={columns}
                    data={assignment}
                />
                ) : (
                    <h1>Loading...</h1>
                )}
        </div>
    )
};

export default ViewAssignmentPage