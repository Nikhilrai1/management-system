import { HiOutlineSearch } from "react-icons/hi"
import { FiMenu, FiSun } from "react-icons/fi"
import { RiNotification3Line } from "react-icons/ri"
import { BsChat, BsPersonCircle } from "react-icons/bs";
import { MdOutlineDarkMode } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux";
import { getTheme, toggleTheme } from "../app/features/themeSlice";

const BadgeButton = ({ name, icon, badgeAmount, color }) => {
    return (
        <button className={`relative text-2xl text-${color} p-2 rounded-full hover:bg-gray-500 hover:text-white`}>
            {icon}
            {badgeAmount && (
                <div className="absolute top-1 right-1 h-[16px] w-[16px] rounded-full flex items-center justify-center bg-red-500">
                    <span style={{ fontSize: "10px" }} className=" text-white">{badgeAmount}</span>
                </div>
            )}
        </button>
    )
}

function AdminNavbar({ showSidebar, setShowSidebar }) {
    const { theme, themeColor } = useSelector(getTheme)
    const dispatch = useDispatch();

    return (
        <nav
            style={{ backgroundColor: theme === "dark" ? "#171718" : theme }}
            className={`bg-light-blue-500 md:ml-64 py-6 px-3 shadow-md drop-shadow-xl`}>
            <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
                <div className="md:hidden">
                    <button className="flex items-center mr-3" onClick={() => setShowSidebar('left-0')}>
                        <FiMenu />
                    </button>
                </div>

                <div className="flex justify-between items-center w-full">
                    <h4 style={{ color: themeColor }} className="text-2xl">
                        Dashboard
                    </h4>

                    <div className="flex">
                        <form className="flex items-center">
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <HiOutlineSearch />
                                </div>
                                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                            </div>
                            <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <HiOutlineSearch />
                                <span className="sr-only">Search</span>
                            </button>
                        </form>
                        <div className="ml-6 flex gap-3 justify-between">

                            <button
                                onClick={() => dispatch(toggleTheme(theme))}
                                className={`relative text-2xl text-${themeColor} p-2 rounded-full hover:bg-gray-500 hover:text-white`}
                            >
                                {theme !== "dark" ? <MdOutlineDarkMode /> : <FiSun />}
                            </button>


                            <BadgeButton
                                name={"notifications"}
                                icon={<RiNotification3Line />}
                                badgeAmount={2}
                                color={themeColor}
                            />
                            <BadgeButton
                                name={"Chats"}
                                icon={<BsChat />}
                                badgeAmount={2}
                                color={themeColor}
                            />
                            <BadgeButton
                                name={"profile"}
                                icon={<BsPersonCircle />}
                                badgeAmount={false}
                                color={themeColor}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default AdminNavbar