import React, { useState } from 'react'
import { BiEdit } from 'react-icons/bi';
import { BsFillCameraFill } from 'react-icons/bs';
import { FaRegEye } from 'react-icons/fa';
import { FiSave } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTheme } from '../app/features/themeSlice';
import Modal from './Modal';
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";


const user = {
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
}
const student = {
    ...user,
    stream: "science",
    grade: "",
    section: "A",
    roll: "",
    role: "student"
}

const teacher = {
    ...user,
    subject: "science",
    role: "teacher"
}

const parents = {
    ...user,
    role: "parents"
}
const UpdateProfile = ({ profile }) => {
    const [showSetting, setShowSetting] = useState(false);
    const [form, setForm] = useState(profile)
    const [file, setFile] = useState();
    const [isChange, setIsChange] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [currentProfile,setCurrentProfile] = useState()
    const [progress, setProgress] = useState(0);
    const handleInput = (e) => {
        setIsChange(false)
        setForm(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const uploadProfileImage = (file) => {
        console.log(file)
        if (!file) return;

        const filesPromises = new Promise(async (resolve, reject) => {
            let storageRef;
            if (profile?.photo && profile.photo !== "") {
                storageRef = ref(storage, profile?.photo);
                if (storageRef) {
                    deleteObject(storageRef).then(() => {
                        console.log("deleted successfully...")
                    }).catch((error) => {
                        console.log(error)
                    });
                }
            }
            storageRef = ref(storage, `profileImages/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed", (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                setProgress(prog);
                if (prog >= 100) {
                    console.log("uploaded")
                }
            },
                (error) => {
                    console.log(error)
                    reject(error)
                },
                async () => {
                    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
                    console.log(downloadUrl)
                    resolve(downloadUrl)
                }
            );

        })
        return filesPromises;
    }

    const updateProfile = async (file) => {
        let newForm = form;
        if ((file?.length !== 0) && file) {
            const uploadedFiles = await uploadProfileImage(file)
            newForm = { ...form, photo: uploadedFiles, }
        }
        try {
            const res = await fetch("/api/auth/admin/updateProfile", {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newForm),
                credentials: "include"
            })

            const data = await res.json();
            if (data.success) {
                alert("Profile Updated successfully...")
                setFile([])
            }

        }
        catch (error) {
            console.log(error)
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
                </div>
                <div className="w-full h-[250px]">
                    <img src="/profile-background.jpg" className="w-full h-full rounded-tl-lg rounded-tr-lg" />
                </div>
                <div className="flex flex-col items-center -mt-20 ">
                    <div className='relative'>
                        <img src={currentProfile ? currentProfile : profile?.photo ? profile?.photo : "/unknown_user.png"} className="w-40 h-40  border-6 border-white rounded-full" />
                        <button onClick={() => setShowSetting(!showSetting)} className="w-10 h-10 rounded-full cursor-pointer absolute right-0 bottom-3 text-white text-2xl p-1 bg-gray-700 flex items-center justify-center">
                            <BsFillCameraFill />
                        </button>
                        <div style={{ display: showSetting ? "block" : "none" }} className="profilesetting bg-white absolute -right-20 -bottom-25 w-40 py-2 mt-1 border border-gray-200 shadow-2xl ">
                            <div className="py-2 border-b">
                                <button onClick={() => { }} className="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
                                    <FaRegEye />
                                    <span className="text-sm text-gray-700">View Profile</span>
                                </button>
                                <button onClick={() => setShowModal(true)} className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                                    <BiEdit />
                                    <span className="text-sm text-gray-700">Edit Profile</span>
                                </button>
                            </div>
                        </div>
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
                        <button disabled={isChange} onClick={() => updateProfile(file)} className={`flex items-center bg-green-600 ${!isChange && "hover:bg-green-700"} text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100`}>
                            <FiSave />
                            <span>Save</span>
                        </button>
                    </div>
                </div>
            </div >

            <Modal file={file} setFile={setFile} showModal={showModal} setShowModal={setShowModal} profile={profile?.photo} currentProfile={currentProfile}  setCurrentProfile={setCurrentProfile} />

            <div className="my-4 flex flex-col xl:flex-row space-y-4 xl:space-y-0 xl:space-x-4">
                <div className="w-full flex flex-col 2xl:w-1/3">
                    <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                        <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
                        <ul className="mt-2 text-gray-700">
                            <li className="flex py-2">
                                <span className="font-bold w-24">ID:</span>
                                <input onChange={handleInput} name="id" type="text" value={form?.id} disabled className="pl-2 pr-3 w-1/2 rounded-sm border-2 border-gray-200 outline-none focus:border-indigo-500" />
                            </li>
                            <li className="flex py-2">
                                <span className="font-bold w-24">Full name:</span>
                                <input onChange={handleInput} name={"fullname"} type="text" value={form?.fullname} className="pl-2 pr-3 w-1/2 rounded-sm border-2 border-gray-200 outline-none focus:border-indigo-500" />
                            </li>
                            <li className="flex py-2">
                                <span className="font-bold w-24">Gender:</span>
                                <input onChange={handleInput} name={"gender"} type="text" value={form?.gender} className="pl-2 pr-3 w-1/2 rounded-sm border-2 border-gray-200 outline-none focus:border-indigo-500" />
                            </li>
                            {profile.role === "student" && (
                                <>
                                    <li className="flex py-2">
                                        <span className="font-bold w-24">Stream:</span>
                                        <input onChange={handleInput} name={"stream"} type="text" value={form?.stream} className="pl-2 pr-3 w-1/2 rounded-sm border-2 border-gray-200 outline-none focus:border-indigo-500" />

                                    </li>
                                    <li className="flex py-2">
                                        <span className="font-bold w-24">Grade:</span>
                                        <input onChange={handleInput} name={"grade"} type="text" value={form?.grade} className="pl-2 pr-3 w-1/2 rounded-sm border-2 border-gray-200 outline-none focus:border-indigo-500" />

                                    </li>
                                    <li className="flex py-2">
                                        <span className="font-bold w-24">Section:</span>
                                        <input onChange={handleInput} name={"section"} type="text" value={form?.section} className="pl-2 pr-3 w-1/2 rounded-sm border-2 border-gray-200 outline-none focus:border-indigo-500" />

                                    </li>
                                    <li className="flex py-2">
                                        <span className="font-bold w-24">Roll No:</span>
                                        <input onChange={handleInput} name={"roll"} type="text" value={form?.roll} className="pl-2 pr-3 w-1/2 rounded-sm border-2 border-gray-200 outline-none focus:border-indigo-500" />
                                    </li>
                                </>
                            )}
                            {profile.role === "teacher" && (<li className="flex py-2">
                                <span className="font-bold w-24">Subject:</span>
                                <input onChange={handleInput} name={"subject"} type="text" value={form?.subject} className="pl-2 pr-3 w-1/2 rounded-sm border-2 border-gray-200 outline-none focus:border-indigo-500" />

                            </li>)}
                            <li className="flex py-2">
                                <span className="font-bold w-24">Birthday:</span>
                                <input onChange={handleInput} name="dob" type="date" value={profile.dob} className="pl-2 w-1/2 pr-3 rounded-sm border-2 border-gray-200 outline-none focus:border-indigo-500" />
                            </li>
                            <li className="flex py-2">
                                <span className="font-bold w-24">Joined:</span>
                                <input onChange={handleInput} name="createdAt" type="text" value={form?.createdAt.slice(0, 10)} disabled className="pl-2 pr-3 w-1/2 rounded-sm border-2 border-gray-200 outline-none focus:border-indigo-500" />

                            </li>
                            <li className="flex py-2">
                                <span className="font-bold w-24">Mobile:</span>
                                <input onChange={handleInput} name={"mobile"} type="text" value={form?.mobile} className="pl-2 pr-3 w-1/2 rounded-sm border-2 border-gray-200 outline-none focus:border-indigo-500" />

                            </li>
                            <li className="flex py-2">
                                <span className="font-bold w-24">Email:</span>
                                <input onChange={handleInput} name={"email"} type="text" value={form?.email} className="pl-2 pr-3 w-1/2 rounded-sm border-2 border-gray-200 outline-none focus:border-indigo-500" />

                            </li>
                            <li className="flex py-2">
                                <span className="font-bold w-24">Address:</span>
                                <input onChange={handleInput} name={"address"} type="text" value={form?.address} className="pl-2 pr-3 w-1/2 rounded-sm border-2 border-gray-200 outline-none focus:border-indigo-500" />

                            </li>
                            <li className="flex py-2">
                                <span className="font-bold w-24">Role:</span>
                                <input onChange={handleInput} name="role" type="text" value={form?.role} disabled className="pl-2 pr-3 w-1/2 rounded-sm border-2 border-gray-200 outline-none focus:border-indigo-500" />
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="flex flex-col w-full 2xl:w-2/3">
                    <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                        <h4 className="text-xl text-gray-900 font-bold">About</h4>
                        <textarea onChange={handleInput} name="bio" value={form.bio} placeholder={profile.bio ? profile.bio : "No Bio Yet"} className="p-2 focus:outline-1 focus:outline-blue-500 font-bold border-[0.1px] resize-none w-full h-fit border-[#9EA5B1] rounded-md"></textarea>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default UpdateProfile