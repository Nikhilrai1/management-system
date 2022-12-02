import React from 'react'

const StatusCard = ({name,amount,icon,bgColor,color}) => {

    return (
        <div style={{backgroundColor: bgColor}} className='p-5 rounded-lg shadow-xl drop-shadow-md'>
            <div className="flex justify-between items-start">
                {/* info */}
                <div style={{color}} className="flex flex-col flex-1 justify-between">
                    <h3 className='font-light'>{name}</h3>
                    <p className='font-bold'>{amount}</p>
                </div>
                {/* icon */}
                <div>
                    <div style={{color}} className="p-2 flex items-center justify-center rounded-lg bg-gray-300 font-extrabold">
                        {icon}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatusCard