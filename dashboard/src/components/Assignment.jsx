import React, { useRef } from 'react'
import { useState } from 'react'
import { BiBook, BiBookContent } from 'react-icons/bi';
import { BsChatLeft, BsThreeDotsVertical } from 'react-icons/bs';
import { FiUpload } from 'react-icons/fi'
import { GiUpgrade } from 'react-icons/gi';
import { MdOutlineSchool } from 'react-icons/md';
import { TbSection } from 'react-icons/tb';
import { OptionInput } from './formcomponents/OptionInput';
import { Input } from './formcomponents/Input';
import Ripples from "react-ripples"
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineCalendar } from 'react-icons/ai';
import { formatDate } from '../utils/utilsModules';
import Upload from './Upload';
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

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

const subjects = [
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

const studentAssignment = {
    studyLevel: "+2",
    stream: "science",
    grade: "12",
    section: "A",
    subject: "science",
    deadline: formatDate(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
    description: "",
    file: "",
}
const Assignment = () => {
    const [form, setForm] = useState(studentAssignment);
    const [files, setFiles] = useState([]);
    const [showSetting, setShowSetting] = useState(false);
    const fileRef = useRef();
    const [progress, setProgress] = useState(0);
    const [URLs, setURLs] = useState([]);
    const handleInput = (e) => {
        setForm(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleFileChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newFile = e.target.files[i];
            newFile["id"] = Math.random();
            setFiles((prevState) => [...prevState, newFile]);
        }
    };

    const uploadFile = (files) => {
        const promises = []
        files.map((file) => {
            const sotrageRef = ref(storage, `Assignment/${file.name}`);

            const uploadTask = uploadBytesResumable(sotrageRef, file);
            promises.push(uploadTask)
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const prog = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(prog);
                },
                (error) => console.log(error),
                async () => {
                    await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                        setURLs(prevState => [...prevState, downloadURLs])
                    });
                }
            );


        })

        Promise.all(promises)
            .then(() => {
                setFiles([])
                alert('All Files are upload')
            })
            .catch(err => console.log(err))

    };


    const postAssignment = async (files) => {
        console.log(form)
    }

    return (
        <div className="max-h-fit rounded-xl border w-full  sm:px-8 md:px-16 sm:py-8">
            <main className="container mx-auto max-w-[900px] h-full">
                <article aria-label="Assignment" className="relative p-5 border h-full flex flex-col bg-white shadow-xl rounded-md">
                    <header>
                        <div className="flex text-blue-400 items-center gap-5 my-5">
                            <div className="text-4xl">
                                <BsChatLeft />
                            </div>
                            <p className='text-2xl'>Assignment</p>
                        </div>
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
                        <div className="flex -mx-3">
                            <OptionInput
                                name={"subject"}
                                title={"Subject"}
                                value={form.subject}
                                icon={<BiBook />}
                                onChange={handleInput}
                                options={subjects}
                            />
                            <Input
                                name={"deadline"}
                                title={"Deadline"}
                                icon={<AiOutlineCalendar />}
                                isFullWidth={false}
                                value={form.deadline}
                                onChange={handleInput}
                                placeholder={"Deadline"}
                                type={"date"}
                            />
                        </div>
                        <Upload fileRef={fileRef} handleFileChange={handleFileChange} />
                    </header>
                    <section>

                        {/* text area */}
                        <div>
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-blue-300">Write something about assignment</label>
                            <textarea name='description' value={form.description} onChange={handleInput} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Write your thoughts here..."></textarea>
                        </div>

                        {/* display attachfile */}
                        <ul className="flex flex-col items-center my-5 w-full">
                            <li className="border mb-5 py-1 sm:py-0 dark:bg-gray-900 pr-5 sm-h-[100px] w-full rounded-md flex items-center justify-between">
                                <div className="flex space-x-5">
                                    <img src="https://source.unsplash.com/75x75/?portrait" alt="" className="rounded-l-md hidden sm:block sm:h-[100px] sm:w-[150px]" />
                                    <div className="flex flex-col my-auto">
                                        <h4 className="text-xs md:text-lg font-semibold text-gray-700 text-center   md:text-left">Background profile</h4>
                                        <p className="text-gray-500 text-xs md:text:sm">image</p>
                                    </div>
                                </div>
                                <div>
                                    <Ripples className='rounded-full'>
                                        <button onClick={() => setShowSetting(!showSetting)} className='p-2 h-11 w-11 rounded-full gap-3 border flex items-center justify-between font-extrabold text-blue-900'>
                                            <BsThreeDotsVertical size={25} />
                                        </button>
                                    </Ripples>
                                    <div style={{ display: showSetting ? "block" : "none" }} className="profilesetting  bg-white absolute right-0 w-92 py-2 mt-1 border border-gray-200 shadow-2xl ">
                                        <div className="py-2">
                                            <button onClick={() => { }} className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                                                <RiDeleteBin6Line />
                                                <span className="text-sm text-gray-700">Remove attachment</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </li>
                        </ul>

                        {/* attach file */}
                        <div className="mt-5">
                            <Ripples className='rounded-full'>
                                <button onClick={() => fileRef.current.click()} className='p-2 rounded-full gap-3 border flex items-center justify-between font-extrabold text-blue-900'>
                                    <FiUpload size={25} />
                                    <p className="text-blue-500">Attach File</p>
                                </button>
                            </Ripples>
                        </div>
                    </section>

                    <footer className="flex justify-end px-8 pb-8 pt-4">
                        <button onClick={() => postAssignment(files)} id="submit" className="rounded-full px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none">
                            Post Now
                        </button>
                        <button id="cancel" className="ml-3 rounded-full px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                            Cancel
                        </button>
                    </footer>
                </article>
            </main>
        </div>
    )
}

export default Assignment