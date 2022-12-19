import { useRef, useState } from "react";
import React from "react";

export default function Modal({ file, setFile, showModal, setShowModal, profile, currentProfile,setCurrentProfile }) {
    const imageRef = useRef()
    const handleChange = (e) => {
        setFile(e.target.files[0]);
        setCurrentProfile(URL.createObjectURL(e.target.files[0]));
    }

    const saveProfile = () => {
        setFile(file)
        setShowModal(false)
    }

    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center my-10 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl max-h-[600px] overflow-y-auto">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Update Profile
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        X
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">

                                    <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
                                        <input ref={imageRef} onChange={handleChange} type="file" className="hidden" accept="image/*" />

                                        <label className="block text-gray-700 text-sm font-bold mb-2 text-center" htmlFor="photo">
                                            Profile Photo <span className="text-red-600"> </span>
                                        </label>

                                        <div className="text-center">
                                            <div className="mt-2">
                                                <img src={currentProfile ? currentProfile : profile ? profile : "/unknown_user.png"} className="w-40 h-40 m-auto rounded-full shadow" />
                                            </div>
                                            <div className="mt-2 hidden">
                                                <span className="block w-40 h-40 rounded-full m-auto shadow" >
                                                </span>
                                            </div>
                                            <button onClick={() => imageRef.current.click()} type="button" className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3">
                                                Select New Photo
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => saveProfile()}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}