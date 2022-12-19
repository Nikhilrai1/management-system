import React, { useState } from 'react'
import { BiEdit, BiShareAlt } from 'react-icons/bi';
import { BsFillCameraFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTheme } from '../app/features/themeSlice';

const Profile = ({ profile }) => {
    const [showSetting, setShowSetting] = useState(false);
    const { theme, themeColor, themeHoverColor } = useSelector(getTheme)
    const navigate = useNavigate()
    return (
        <div className="h-full bg-gray-200 p-8">
            <div className="bg-white rounded-lg shadow-xl pb-8">
                <div className="absolute right-12 mt-4 rounded">
                    <button onClick={() => setShowSetting(!showSetting)} className="border border-gray-400 p-2 rounded text-gray-300 hover:text-gray-300 threedot bg-gray-100 bg-opacity-10 hover:bg-opacity-20" title="Settings">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                        </svg>
                    </button>
                    <div style={{ display: showSetting ? "block" : "none" }} className="profilesetting bg-white absolute right-0 w-40 py-2 mt-1 border border-gray-200 shadow-2xl ">
                        <div className="py-2 border-b">
                            <p className="text-gray-400 text-xs px-6 uppercase mb-1">Settings</p>
                            <button className="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
                                <BiShareAlt />
                                <span className="text-sm text-gray-700">Share Profile</span>
                            </button>
                            <button onClick={() => navigate("/update", { state: { profile: profile } })} className="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
                                <BiEdit />
                                <span className="text-sm text-gray-700">Edit Profile</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[250px]">
                    <img src="/profile-background.jpg" className="w-full h-full rounded-tl-lg rounded-tr-lg" />
                </div>
                <div className="flex flex-col items-center -mt-20">
                    <div className='relative'>
                        <img src={profile.photo ? profile.photo : "/unknown_user.png"} className="w-40 h-40  border-6 border-white rounded-full" />
                        <button className="w-10 h-10 rounded-full cursor-pointer absolute right-0 bottom-3 text-white text-2xl p-1 bg-gray-700 flex items-center justify-center">
                            <BsFillCameraFill />
                        </button>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                        <p className="text-2xl">{profile.fullname}</p>
                        <span className="bg-blue-500 rounded-full p-1" title="Verified">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </span>
                    </div>
                    <p className="text-gray-700">{profile.role}</p>
                    <p className="text-sm text-gray-500">{profile.address}</p>
                </div>
                <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
                    <div className="flex items-center space-x-4 mt-2">
                        <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
                            </svg>
                            <span>Message</span>
                        </button>
                    </div>
                </div>
            </div >

            <div className="my-4 flex flex-col xl:flex-row space-y-4 xl:space-y-0 xl:space-x-4">
                <div className="w-full flex flex-col 2xl:w-1/3">
                    <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                        <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
                        <ul className="mt-2 text-gray-700">
                            <li className="flex border-y py-2">
                                <span className="font-bold w-24">ID:</span>
                                <span className="text-gray-700">{profile?.id}</span>
                            </li>
                            <li className="flex border-y py-2">
                                <span className="font-bold w-24">Full name:</span>
                                <span className="text-gray-700">{profile?.fullname}</span>
                            </li>
                            <li className="flex border-y py-2">
                                <span className="font-bold w-24">Gender:</span>
                                <span className="text-gray-700">{profile?.gender}</span>
                            </li>
                            {profile.role === "student" && (
                                <>
                                    <li className="flex border-y py-2">
                                        <span className="font-bold w-24">Stream:</span>
                                        <span className="text-gray-700">{profile?.stream}</span>
                                    </li>
                                    <li className="flex border-y py-2">
                                        <span className="font-bold w-24">Grade:</span>
                                        <span className="text-gray-700">{profile?.grade}</span>
                                    </li>
                                    <li className="flex border-y py-2">
                                        <span className="font-bold w-24">Section:</span>
                                        <span className="text-gray-700">{profile?.section}</span>
                                    </li>
                                    <li className="flex border-y py-2">
                                        <span className="font-bold w-24">Roll No:</span>
                                        <span className="text-gray-700">{profile?.roll}</span>
                                    </li>
                                </>
                            )}
                            {profile.role === "teacher" && (<li className="flex border-b py-2">
                                <span className="font-bold w-24">Subject:</span>
                                <span className="text-gray-700">{profile?.subject}</span>
                            </li>)}
                            <li className="flex border-b py-2">
                                <span className="font-bold w-24">Birthday:</span>
                                <span className="text-gray-700">{profile?.dob}</span>
                            </li>
                            <li className="flex border-b py-2">
                                <span className="font-bold w-24">Joined:</span>
                                <span className="text-gray-700">{profile?.createdAt?.slice(0, 10)}</span>
                            </li>
                            <li className="flex border-b py-2">
                                <span className="font-bold w-24">Mobile:</span>
                                <span className="text-gray-700">{profile?.mobile}</span>
                            </li>
                            <li className="flex border-b py-2">
                                <span className="font-bold w-24">Email:</span>
                                <span className="text-gray-700">{profile?.email}</span>
                            </li>
                            <li className="flex border-b py-2">
                                <span className="font-bold w-24">Address:</span>
                                <span className="text-gray-700">{profile?.address}</span>
                            </li>
                            <li className="flex border-b py-2">
                                <span className="font-bold w-24">Role:</span>
                                <span className="text-gray-700">{profile?.role}</span>
                            </li>
                        </ul>
                    </div>
                    {/* <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                        <h4 className="text-xl text-gray-900 font-bold">Activity log</h4>
                        <div className="relative px-4">
                            <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>

                            <div className="flex items-center w-full my-6 -ml-1.5">
                                <div className="w-1/12 z-10">
                                    <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                                </div>
                                <div className="w-11/12">
                                    <p className="text-sm">Profile informations changed.</p>
                                    <p className="text-xs text-gray-500">3 min ago</p>
                                </div>
                            </div>

                            <div className="flex items-center w-full my-6 -ml-1.5">
                                <div className="w-1/12 z-10">
                                    <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                                </div>
                                <div className="w-11/12">
                                    <p className="text-sm">
                                        Connected with <a href="#" className="text-blue-600 font-bold">Colby Covington</a>.</p>
                                    <p className="text-xs text-gray-500">15 min ago</p>
                                </div>
                            </div>

                            <div className="flex items-center w-full my-6 -ml-1.5">
                                <div className="w-1/12 z-10">
                                    <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                                </div>
                                <div className="w-11/12">
                                    <p className="text-sm">Invoice <a href="#" className="text-blue-600 font-bold">#4563</a> was created.</p>
                                    <p className="text-xs text-gray-500">57 min ago</p>
                                </div>
                            </div>

                            <div className="flex items-center w-full my-6 -ml-1.5">
                                <div className="w-1/12 z-10">
                                    <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                                </div>
                                <div className="w-11/12">
                                    <p className="text-sm">
                                        Message received from <a href="#" className="text-blue-600 font-bold">Cecilia Hendric</a>.</p>
                                    <p className="text-xs text-gray-500">1 hour ago</p>
                                </div>
                            </div>

                            <div className="flex items-center w-full my-6 -ml-1.5">
                                <div className="w-1/12 z-10">
                                    <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                                </div>
                                <div className="w-11/12">
                                    <p className="text-sm">New order received <a href="#" className="text-blue-600 font-bold">#OR9653</a>.</p>
                                    <p className="text-xs text-gray-500">2 hours ago</p>
                                </div>
                            </div>

                            <div className="flex items-center w-full my-6 -ml-1.5">
                                <div className="w-1/12 z-10">
                                    <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                                </div>
                                <div className="w-11/12">
                                    <p className="text-sm">
                                        Message received from <a href="#" className="text-blue-600 font-bold">Jane Stillman</a>.</p>
                                    <p className="text-xs text-gray-500">2 hours ago</p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="flex flex-col w-full 2xl:w-2/3">
                    <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                        <h4 className="text-xl text-gray-900 font-bold">About</h4>
                        <p className="mt-2 text-gray-700">{profile.bio ? profile.bio : "No Bio Yet"}</p>
                    </div>
                    {/* <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                        <h4 className="text-xl text-gray-900 font-bold">Statistics</h4>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                            <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-sm text-indigo-600">Total Revenue</span>
                                    <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">7 days</span>
                                </div>
                                <div className="flex items-center justify-between mt-6">
                                    <div>
                                        <svg className="w-12 h-12 p-2.5 bg-indigo-400 bg-opacity-20 rounded-full text-indigo-600 border border-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-end">
                                            <span className="text-2xl 2xl:text-3xl font-bold">$8,141</span>
                                            <div className="flex items-center ml-2 mb-1">
                                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                                <span className="font-bold text-sm text-gray-500 ml-0.5">3%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-sm text-green-600">New Orders</span>
                                    <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">7 days</span>
                                </div>
                                <div className="flex items-center justify-between mt-6">
                                    <div>
                                        <svg className="w-12 h-12 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-end">
                                            <span className="text-2xl 2xl:text-3xl font-bold">217</span>
                                            <div className="flex items-center ml-2 mb-1">
                                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                                <span className="font-bold text-sm text-gray-500 ml-0.5">5%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-sm text-blue-600">New Connections</span>
                                    <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">7 days</span>
                                </div>
                                <div className="flex items-center justify-between mt-6">
                                    <div>
                                        <svg className="w-12 h-12 p-2.5 bg-blue-400 bg-opacity-20 rounded-full text-blue-600 border border-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-end">
                                            <span className="text-2xl 2xl:text-3xl font-bold">54</span>
                                            <div className="flex items-center ml-2 mb-1">
                                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                                <span className="font-bold text-sm text-gray-500 ml-0.5">7%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div >
    )
}

export default Profile