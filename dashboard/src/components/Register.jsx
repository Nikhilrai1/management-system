import React, { useEffect, useState } from 'react'
import { BiBook, BiBookContent, BiIdCard, BiLockAlt } from 'react-icons/bi'
import { GoLocation } from 'react-icons/go'
import { FiMail, FiUser } from 'react-icons/fi'
import MobileIcon from '../icons/MobileIcon'
import { AiOutlineCalendar } from 'react-icons/ai'
import { TfiUser } from 'react-icons/tfi'
import { SlUserFemale } from 'react-icons/sl'
import { MdOutlineSchool } from 'react-icons/md'
import { GiTeacher, GiUpgrade } from 'react-icons/gi'
import { TbSection } from 'react-icons/tb'
import { FaUserGraduate } from 'react-icons/fa'
import axios from 'axios'




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

// grade level
// school 1-10
// +2 or bachleor -> science management humanities

const studyLevels = [
    {
        name: "School",
        value: "school"
    },
    {
        name: "+2",
        value: "+2"
    },
    {
        name: "bachelors",
        value: "bachelors"
    },
]

const stream = [
    {
        name: "Management",
        value: "management"
    },
    {
        name: "Science",
        value: "science"
    },
    {
        name: "Humanities",
        value: "humanities"
    },
]

const plusTwoGrade = [
    {
        name: "Grade 11",
        value: "Grade 11"
    },
    {
        name: "Grade 12",
        value: "Grade 12"
    },
]

const bachelorsGrade = [
    {
        name: "1st Year",
        value: "1st Year"
    },
    {
        name: "2nd Year",
        value: "2nd Year"
    },
    {
        name: "3rd Year",
        value: "3rd Year"
    },
]

const schoolGrade = [
    {
        name: "Grade 1",
        value: "Grade 1",
    },
    {
        name: "Grade 2",
        value: "Grade 2",
    },
    {
        name: "Grade 3",
        value: "Grade 3",
    },
    {
        name: "Grade 4",
        value: "Grade 4",
    },
    {
        name: "Grade 5",
        value: "Grade 5",
    },
    {
        name: "Grade 6",
        value: "Grade 6",
    },
    {
        name: "Grade 7",
        value: "Grade 7",
    },
    {
        name: "Grade 8",
        value: "Grade 8",
    },
    {
        name: "Grade 9",
        value: "Grade 9",
    },
    {
        name: "Grade 10",
        value: "Grade 10",
    },
]

const sectionOptions = [
    {
        name: "A",
        value: "A"
    },
    {
        name: "B",
        value: "B"
    },
    {
        name: "C",
        value: "C"
    },
]

const genderOptions = [
    {
        name: "Male",
        value: "male"
    },
    {
        name: "Female",
        value: "female"
    },
]

const registerRole = [
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

const student = {
    id: "",
    fullname: "",
    email: "",
    password: "",
    address: "",
    gender: "male",
    profilePicture: "",
    bio: "",
    studyLevel: "+2",
    stream: "science",
    grade: "",
    section: "A",
    roll: "",
    dob: "",
    mobile: "",
    role: "student"
}

const teacher = {
    id: "",
    fullname: "",
    email: "",
    password: "",
    address: "",
    gender: "male",
    profilePicture: "",
    bio: "",
    subject: "science",
    dob: "",
    mobile: "",
    role: "teacher"
}

const parents = {
    id: "",
    fullname: "",
    email: "",
    password: "",
    address: "",
    gender: "male",
    profilePicture: "",
    bio: "",
    dob: "",
    mobile: "",
    parentsOf: [],
    role: "parents"
}

const teacherSubjects = [
    {
        name: "Science",
        value: "science"
    },
    {
        name: "Physics",
        value: "physics"
    },
    {
        name: "Chemistry",
        value: "chemistry"
    },
    {
        name: "Math",
        value: "math"
    },
    {
        name: "Computer",
        value: "computer"
    },
    {
        name: "English",
        value: "english"
    },
    {
        name: "Nepali",
        value: "nepali"
    },
    {
        name: "Social",
        value: "social"
    },
    {
        name: "Bussiness",
        value: "bussiness"
    },
    {
        name: "Ecconomics",
        value: "ecconomics"
    },
    {
        name: "Account",
        value: "account"
    },
    {
        name: "Hotel Management",
        value: "hm"
    },
]

const Register = () => {
    const [role, setRole] = useState("student");
    const [form, setForm] = useState(teacher);
    const [kidId, setKidId] = useState("");

    const handleInput = (e) => {
        setForm(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleKidId = (e) => {
        setKidId(e.target.value)
    }

    const handleSearchId = (studentId) => {
        setKidId(studentId)
        if(!form.parentsOf.includes(studentId)){
            setForm(prev => {
                return {
                    ...prev,
                    parentsOf: [...form.parentsOf, kidId]
                }
            })
        }
        else{
            alert("Children ID already set")
        }
    }

    const registerStudent = async () => {
        try {
            const res = await fetch(`/api/auth/${role}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
                credentials: "include"
            })

            const data = await res.json();
            if (data.success) {
                console.log(data)
                alert("register successfull")
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setForm(role === "student" ? student : role === "teacher" ? teacher : parents)
    }, [role])

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
                                <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                                <p>Enter information to register</p>
                            </div>
                            <div className="flex justify-center items-center gap-5 ">
                                <OptionInput
                                    name={"registerFor"}
                                    title={"Register For"}
                                    value={role}
                                    icon={<FiUser />}
                                    options={registerRole}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                            </div>
                            <div>
                                <div className="flex -mx-3">
                                    <Input
                                        name={"fullname"}
                                        title={"Full Name"}
                                        icon={<FiUser />}
                                        isFullWidth={false}
                                        value={form["fullname"]}
                                        onChange={handleInput}
                                        placeholder={"Nikhil Rai"}
                                        type={"text"}
                                    />
                                    <Input
                                        name={"id"}
                                        title={"Unique ID"}
                                        icon={<BiIdCard />}
                                        isFullWidth={false}
                                        value={form.id}
                                        onChange={handleInput}
                                        placeholder={"unique id"}
                                        type={"text"}
                                    />
                                </div>
                                <div className="flex -mx-3">
                                    <Input
                                        name={"mobile"}
                                        title={"Mobile"}
                                        icon={<FiUser />}
                                        isFullWidth={false}
                                        value={form["mobile"]}
                                        onChange={handleInput}
                                        placeholder={"mobile"}
                                        type={"text"}
                                        min={10}
                                        max={10}
                                    />
                                    <Input
                                        name={"address"}
                                        title={"Address"}
                                        icon={<GoLocation />}
                                        isFullWidth={false}
                                        value={form.address}
                                        onChange={handleInput}
                                        placeholder={"Kathmandu"}
                                        type={"text"}
                                    />
                                </div>

                                <div className="flex -mx-3">
                                    <Input
                                        name={"dob"}
                                        title={"Date of Birth"}
                                        icon={<AiOutlineCalendar />}
                                        isFullWidth={false}
                                        value={form["dob"]}
                                        onChange={handleInput}
                                        placeholder={"dob"}
                                        type={"date"}
                                    />

                                    <OptionInput
                                        name={"gender"}
                                        title={"Gender"}
                                        value={form.gender}
                                        icon={form.gender === "male" ? <TfiUser /> : <SlUserFemale />}
                                        onChange={handleInput}
                                        options={genderOptions}
                                    />

                                </div>

                                {/* only student have grade, grade level, stream, section */}
                                {form.role === "student" && (
                                    <>
                                        <div className="flex -mx-3">
                                            <OptionInput
                                                name={"studyLevel"}
                                                title={"Study Level"}
                                                value={form.studyLevel}
                                                icon={<MdOutlineSchool />}
                                                onChange={handleInput}
                                                options={studyLevels}
                                            />
                                            <OptionInput
                                                name={"stream"}
                                                title={"Stream"}
                                                value={form.stream}
                                                icon={<BiBookContent />}
                                                onChange={handleInput}
                                                options={form.studyLevel === "school" ? [{ name: "School", value: "school" }] : stream}
                                            />
                                        </div>
                                        <div className="flex -mx-3">

                                            <OptionInput
                                                name={"grade"}
                                                title={"Grade"}
                                                value={form.grade}
                                                icon={<GiUpgrade />}
                                                onChange={handleInput}
                                                options={form.studyLevel === "school" ? schoolGrade : form.studyLevel === "+2" ? plusTwoGrade : bachelorsGrade}
                                            />
                                            <OptionInput
                                                name={"section"}
                                                title={"Section"}
                                                value={form.section}
                                                icon={<TbSection />}
                                                onChange={handleInput}
                                                options={sectionOptions}
                                            />
                                        </div>
                                    </>
                                )}
                                <div className="flex -mx-3">
                                    {form.role === "student" && (
                                        <Input
                                            name={"roll"}
                                            title={"Roll No"}
                                            icon={<FiUser />}
                                            isFullWidth={false}
                                            value={form["roll"]}
                                            onChange={handleInput}
                                            placeholder={"30"}
                                            type={"text"}
                                        />)
                                    }
                                    {form.role === "teacher" && (<OptionInput
                                        name={"subject"}
                                        title={"Subject"}
                                        value={form.subject}
                                        icon={<BiBook />}
                                        onChange={handleInput}
                                        options={teacherSubjects}
                                    />)}
                                    <Input
                                        name={"role"}
                                        title={"Role"}
                                        icon={form.role === "student" ? <FaUserGraduate /> : form.role === "teacher" ? <GiTeacher /> : <FiUser />}
                                        isFullWidth={false}
                                        value={form.role}
                                        onChange={handleInput}
                                        placeholder={role}
                                        type={"text"}
                                        disabled={true}
                                    />
                                </div>
                                {form.role === "parents" && (
                                    <div className="flex -mx-3">
                                        <Input
                                            name={"kidId"}
                                            title={"Kid Id"}
                                            icon={<BiIdCard />}
                                            isFullWidth={false}
                                            value={kidId}
                                            onChange={handleKidId}
                                            placeholder={"Search kid ID"}
                                            type={"text"}
                                        />
                                        <div className="w-1/2 px-3 flex items-center justify-center">
                                            <button onClick={() => handleSearchId(kidId)} className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">Search ID</button>
                                        </div>
                                    </div>
                                )}
                                {form.role === "parents" && (<div className="flex -mx-3">
                                    {form.parentsOf.map((item, index) => (
                                        <span key={index}>{item}</span>
                                    ))}
                                </div>)}
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
                                        <button onClick={() => registerStudent()} className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">REGISTER</button>
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

export default Register