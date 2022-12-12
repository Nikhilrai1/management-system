import React, { useState } from 'react'
import { BiEdit, BiShareAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTheme } from '../app/features/themeSlice';

const UpdateProfile = ({ profile }) => {
    const [showSetting, setShowSetting] = useState(false);
    const { theme, themeColor, themeHoverColor } = useSelector(getTheme)
    const navigate = useNavigate()
    const student = {
        _id: "638791ac9afd47d23b995cac",
        id: "10",
        fullname: "Nikhil",
        email: "new@gmail.com",
        password: "123456",
        address: "fattepur",
        gender: "male",
        profile: "hello",
        photo: "hello",
        bio: "hdkfhkdshf",
        stream: "science",
        grade: "12",
        section: "A",
        roll: "13",
        dob: "2000/02/03",
        mobile: "9876543210",
        role: "student"
    }
    const updateProfile = async () => {
        console.log("update button tigger")
        try {
            const res = await fetch(`/api/auth/admin/updateProfile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
                credentials: "include"
            })

            const data = await res.json();
            if (data.success) {
                console.log(data.message)
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
                            <button onClick={() => updateProfile()} className="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
                                <BiShareAlt />
                                <span className="text-sm text-gray-700">Update Profile</span>
                            </button>
                            <button onClick={() => navigate("/update", { state: { profile: profile } })} className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
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
                    <img src={profile.photo ? profile.photo : "/unknown_user.png"} className="w-40  border-6 border-white rounded-full" />
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

                </div>
                <div className="flex flex-col w-full 2xl:w-2/3">
                    <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                        <h4 className="text-xl text-gray-900 font-bold">About</h4>
                        <p className="mt-2 text-gray-700">{profile.bio ? profile.bio : "No Bio Yet"}</p>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default UpdateProfile