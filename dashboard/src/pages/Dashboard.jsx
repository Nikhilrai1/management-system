import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "../app/features/themeSlice";
import StatusCard from "../components/StatusCard";
import { BiMoney } from 'react-icons/bi'
import { FaUserGraduate } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import AreaChart from "../components/AreaChart";
import { areaChartData, donoutChartData } from "../assets/data";
import DonoutChart from "../components/DonoutChart";
import ProfileCard from "../components/ProfileCard";


const statusCards = [
    {
        name: "Students",
        amount: "15000",
        icon: <FaUserGraduate color={"#af42c2"} size={25} />
    },
    {
        name: "Teachers",
        amount: "15000",
        icon: <GiTeacher color={"#328ba8"} size={25} />
    },
    {
        name: "Parents",
        amount: "15000",
        icon: <MdGroups color={"#ffab24"} size={25} />
    },
    {
        name: "Earnings",
        amount: "15000",
        icon: <BiMoney color={"#24ff45"} size={25} />
    },

]

function Dashboard() {
    const { theme, themeColor, themeHoverColor } = useSelector(getTheme);
    const dispatch = useDispatch();
    return (
        <div className="p-7">

            <div className="mx-3 md:mx-6">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4 gap-5">
                        {statusCards.map((item, index) => (
                            <StatusCard
                                key={index}
                                name={item.name}
                                amount={item.amount}
                                icon={item.icon}
                                bgColor={theme}
                                color={themeColor}
                            />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 my-5 gap-5">
                        <div className="p-5 rounded-md shadow-xl drop-shadow-xl border-2">
                            <div className="flex flex-col justify-start">
                                <h2 className="text-bold text-2xl">Earnings</h2>
                                <p className="py-2 text-gray-600">Accademic year {new Date().getFullYear()} AD</p>
                                <p className="text-gray-700 pb-2">Total Earnings: <b>${10000000000}</b></p>
                            </div>
                            <div className="h-96">
                                <AreaChart
                                    data={areaChartData}
                                />
                            </div>
                        </div>
                        <div className="p-5 rounded-md shadow-xl drop-shadow-xl border-2">
                            <div className="flex flex-col justify-start">
                                <h2 className="text-bold text-2xl">New Students</h2>
                                <p className="py-2 text-gray-600">Accademic year {new Date().getFullYear()} AD</p>

                                <p className="text-gray-700 pb-2">Total New Students: <b>{1500}</b></p>
                            </div>
                            <div className="h-96">
                                <DonoutChart
                                    data={donoutChartData}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ProfileCard /> */}

            {/* <div className="px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-5">
                       
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default Dashboard
