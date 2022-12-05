import React, { useLayoutEffect, useState } from 'react'
import Register from "../components/Register"

const RegisterPage = () => {
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
    <div>
      <Register students={students} />
    </div>
  )
}

export default RegisterPage