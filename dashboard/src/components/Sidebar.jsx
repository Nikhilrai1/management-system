import { useState } from 'react';
import { NavLink } from "react-router-dom";
import AdminNavbar from './AdminNavbar';
import { MdDashboard, MdSettings, MdLogout, MdOutlineAssignment, MdGroups, MdOutlineCancel } from "react-icons/md"
import { FaUserGraduate } from "react-icons/fa"
import { GiTeacher } from "react-icons/gi"
import { AiFillNotification } from "react-icons/ai"
import { BsFillPersonPlusFill, BsPersonCircle, BsChat } from "react-icons/bs"
import { RiNotification3Line } from "react-icons/ri"
import Ripples from "react-ripples"
import { getTheme } from '../app/features/themeSlice';
import { useSelector } from 'react-redux';
const iconSize = 22;

const sidebarNavigations = [
    {
        name: "Students",
        link: "/students",
        icon: <FaUserGraduate size={iconSize} />
    },
    {
        name: "Teachers",
        link: "/teachers",
        icon: <GiTeacher size={iconSize} />
    },
    {
        name: "Parents",
        link: "/parents",
        icon: <MdGroups size={iconSize} />
    },
    {
        name: "Assignments",
        link: "/assignment",
        icon: <MdOutlineAssignment size={iconSize} />
    },
    {
        name: "All Assignment",
        link: "/viewAssignment",
        icon: <MdOutlineAssignment size={iconSize} />
    },
    {
        name: "Notifications",
        link: "/notifications",
        icon: <RiNotification3Line size={iconSize} />
    },
    {
        name: "Chats",
        link: "/chats",
        icon: <BsChat size={iconSize} />
    },
    {
        name: "Notice",
        link: "/notice",
        icon: <AiFillNotification size={iconSize} />
    },
    {
        name: "Settings",
        link: "/settings",
        icon: <MdSettings size={iconSize} />
    },
]

const sidebarAuthNav = [
    {
        name: "Profile",
        link: "/profile",
        icon: <BsPersonCircle size={iconSize} />
    },
    {
        name: "Register",
        link: "/register",
        icon: <BsFillPersonPlusFill size={iconSize} />
    },
    {
        name: "Login",
        link: "/login",
        icon: <BsFillPersonPlusFill size={iconSize} />
    },
]

const SidebarLink = ({ name, link, color, icon, activeColor }) => {
    const navStyle = `w-full flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg`;
    const activeNavStyle = `to-blue-400 shadow-md`;


    return (
        <Ripples className='w-full'>
            <li className="rounded-lg mb-2 w-full">
                <NavLink
                    to={link}
                    style={({ isActive }) => isActive ? { color: "white", backgroundColor: activeColor } : { color }}
                    className={({ isActive }) => `${navStyle} ${isActive && activeNavStyle}`}
                >
                    {icon}
                    <span>{name}</span>
                </NavLink>
            </li>
        </Ripples>
    )
}


const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState('-left-64');
    const { theme, themeColor, themeHoverColor } = useSelector(getTheme)
    const logout = async () => {
        try {
            const res = await fetch(`/api/auth/logout`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            })

            const data = await res.json();
            if (data.success) {
                console.log(data)
                alert("Logout successfull")
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
        <>
            <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <div
                style={{ overflowY: "auto", backgroundColor: theme === "dark" ? "#171718" : theme }}
                className={`h-screen fixed top-0 md:left-0 ${showSidebar} flex-row flex-nowrap overflow-hidden shadow-2xl drop-shadow-2xl  w-64 z-10 py-4 px-6 transition-all duration-300`}
            >
                <div
                    className={`absolute top-1 right-1 text-${themeColor} text-lg md:hidden z-50 transition-all duration-300`}
                >
                    <button onClick={() => setShowSidebar('-left-64')}>
                        <MdOutlineCancel />
                    </button>
                </div>

                <div className="flex-col bg-transparent  items-stretch min-h-full flex-nowrap px-0 relative">
                    <a
                        href={"#"}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 text-center w-full inline-block"
                    >
                        <img className="rounded-lg" src={"./logo.png"} alt="logo" />
                    </a>
                    <div className="flex flex-col">
                        <hr className="my-4 min-w-full" />

                        <ul className="flex-col min-w-full flex list-none">
                            <SidebarLink
                                name={"Dashboard"}
                                link={"/"}
                                color={themeColor}
                                icon={<MdDashboard size={iconSize} />}
                                activeColor={themeHoverColor}
                            />
                            <h1 className='text-gray-500 mb-1 ml-4 text-xs font-semibold'>Apps</h1>
                            {sidebarNavigations.map(item => (
                                <SidebarLink
                                    key={item.name}
                                    name={item.name}
                                    link={item.link}
                                    color={themeColor}
                                    icon={item.icon}
                                    activeColor={themeHoverColor}
                                />
                            ))}

                            <h1 className='text-gray-500  mb-1 ml-4 text-xs font-semibold'>Auth</h1>

                            {sidebarAuthNav.map(item => (
                                <SidebarLink
                                    key={item.name}
                                    name={item.name}
                                    link={item.link}
                                    color={themeColor}
                                    icon={item.icon}
                                    activeColor={themeHoverColor}
                                />
                            ))}
                            <Ripples className="w-full">
                                <li className="w-full bg-gradient-to-tr from-purple-500 to-purple-700 px-4 rounded-lg text-white">
                                    <button onClick={() => logout()} className="flex items-center justify-center gap-4 text-sm font-light py-3">
                                        Logout
                                        <MdLogout />
                                    </button>
                                </li>
                            </Ripples>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Sidebar
