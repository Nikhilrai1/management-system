import { useState } from 'react'
import React from 'react'
import { BsCalendar4Event } from 'react-icons/bs'

const OptionInput = ({ name, value, title, onChange, options }) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="leading-loose">{title}</label>
            <select onChange={onChange} name={name} value={value} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" id={"eventFor"} >
                {options.map((item, index) => (
                    <option key={index} className='w-full text-start' value={item.value}>{item.name}</option>
                ))}
            </select>
        </div>
    )
}

const eventFor = [
    {
        name: "Common to All",
        value: "everyone"
    },
    {
        name: "Selected Grade",
        value: "grade"
    },
    {
        name: "Selected Stream",
        value: "stream"
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

const grade = [
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
    {
        name: "Grade 11",
        value: "Grade 11",
    },
    {
        name: "Grade 12",
        value: "Grade 12",
    },
]


const CreateEvent = () => {
    const [form, setForm] = useState({
        eventTitle: "",
        eventDescription: "",
        startDate: "",
        endDate: "",
        eventFor: "",
        stream: "",
        grade: "",
    })

    const handleInput = (e) => {
        setForm(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    const createNewEvent = async () => {
        try {
            const res = await fetch(`/api/event/createEvent`, {
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
    return (
        <div>
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                        <div className="max-w-md mx-auto">
                            <div className="flex items-center space-x-5">
                                <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                                    <BsCalendar4Event />
                                </div>
                                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                                    <h2 className="leading-relaxed">Create an Event</h2>
                                    <p className="text-sm text-gray-500 font-normal leading-relaxed">Fill the event details</p>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Event Title</label>
                                        <input onChange={handleInput} value={form.eventTitle} type="text" name="eventTitle" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Event title" />
                                    </div>

                                    <OptionInput
                                        name={"eventFor"}
                                        title={"Event For"}
                                        value={form.eventFor}
                                        onChange={handleInput}
                                        options={eventFor}
                                    />
                                    {form.eventFor !== "everyone" && (
                                        <>
                                            <OptionInput
                                                name={"stream"}
                                                title={"Select Stream"}
                                                value={form.stream}
                                                onChange={handleInput}
                                                options={stream}
                                            />
                                            <OptionInput
                                                name={"grade"}
                                                title={"Select Grade"}
                                                value={form.grade}
                                                onChange={handleInput}
                                                options={grade}
                                            />
                                        </>
                                    )}

                                    <div className="flex items-center space-x-4">
                                        <div className="flex flex-col">
                                            <label className="leading-loose">Start</label>
                                            <div className="relative focus-within:text-gray-600 text-gray-400">
                                                <input onChange={handleInput} value={form.startDate} type="date" name="startDate" className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="25/02/2020" />
                                                <div className="absolute left-3 top-2">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="leading-loose">End</label>
                                            <div className="relative focus-within:text-gray-600 text-gray-400">
                                                <input onChange={handleInput} value={form.endDate} type="date" name="endDate" className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="26/02/2020" />
                                                <div className="absolute left-3 top-2">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Event Description</label>
                                        <textarea rows={4} onChange={handleInput} value={form.eventDescription} type="text" name="eventDescription" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="write some details abot event for clarity..." />
                                    </div>
                                </div>
                                <div className="pt-4 flex items-center space-x-4">
                                    <button onClick={() => createNewEvent()} className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>f
        </div>
    )
}

export default CreateEvent