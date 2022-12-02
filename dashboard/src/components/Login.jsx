import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiLockAlt } from 'react-icons/bi'
import { FiMail, FiUser } from 'react-icons/fi'
import MobileIcon from '../icons/MobileIcon'





const loginRole = [
    {
        name: "Student",
        value: "student"
    },
    {
        name: "Teacher",
        value: "teacher"
    },
    {
        name: "Parents",
        value: "parents"
    },
]

const Input = ({ name, title, type, icon, placeholder, value, onChange, isFullWidth, min, max, disabled }) => {
    return (
        <div className={`${isFullWidth ? "w-full" : "w-1/2"} px-3 mb-5`}>
            <label htmlFor={name} className="text-xs font-semibold px-1">{title}</label>
            <div className="flex">
                {icon &&
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        {icon}
                    </div>
                }
                {(min && max) ? (
                    <input min={min} max={max} name={name} type={type} value={value} onChange={onChange} disabled={disabled} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder={placeholder} />
                ) : (
                    <input name={name} type={type} value={value} onChange={onChange} disabled={disabled} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder={placeholder} />
                )
                }
            </div>
        </div>
    )
}

const OptionInput = ({ name, title, icon, value, onChange, options }) => {
    return (
        <div className={`w-1/2 px-3 mb-5`}>
            <label htmlFor={name} className="text-xs font-semibold px-1">{title}</label>
            <div className="flex">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    {icon}
                </div>
                <select onChange={onChange} name={name} value={value} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" id={name} >
                    {options.map((item, index) => (
                        <option key={index} className='w-full text-start' value={item.value}>{item.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

const Login = () => {
    const [role, setRole] = useState("student");
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    // const urlWithProxy = "/api";

    const login = async () => {
        try {
            const res = await fetch('/api/auth/teacher/login', {
                method: 'POST', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
                credentials: "include"
              })

              const data = await res.json();
              console.log(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleInput = (e) => {
        setForm(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }


    return (
        <>
            <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5 lg:mx-10 shadow:xl drop-shadow-xl">
                <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
                    <div className="md:flex w-full">
                        <div className="hidden lg:block w-1/2 bg-indigo-500 py-10 px-10">
                            <MobileIcon />
                        </div>
                        <div className="w-full lg:w-1/2 py-10 px-5 md:px-10">
                            <div className="text-center mb-5">
                                <h1 className="font-bold text-3xl text-gray-900">Login</h1>
                                <p>Enter information to login</p>
                            </div>
                            <div className="flex justify-center items-center gap-5 ">
                                <OptionInput
                                    name={"loginfo"}
                                    title={"Login For"}
                                    value={role}
                                    icon={<FiUser />}
                                    options={loginRole}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                            </div>
                            <div>
                                <div className="flex -mx-3">
                                    <Input
                                        name={"email"}
                                        title={"Email"}
                                        icon={<FiMail />}
                                        isFullWidth={true}
                                        value={form.email}
                                        onChange={handleInput}
                                        placeholder={"nikhil@gmail.com"}
                                        type={"email"}
                                    />
                                </div>
                                <div className="flex -mx-3">
                                    <Input
                                        name={"password"}
                                        title={"Password"}
                                        icon={<BiLockAlt />}
                                        isFullWidth={true}
                                        value={form.password}
                                        onChange={handleInput}
                                        placeholder={"password"}
                                        type={"password"}
                                    />
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <button onClick={() => login()} className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">Login</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login