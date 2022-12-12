export const OptionInput = ({ name, title, icon, value, onChange, options }) => {
    return (
        <div className={`w-1/2 px-3 mb-5`}>
            <label htmlFor={name} className="text-xs font-semibold px-1">{title}</label>
            <div className="flex">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    {icon}
                </div>
                <select onChange={onChange} name={name} value={value} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" id={name} >
                    {options.map((item, index) => (
                        <option key={index} className='w-full text-start' value={item.value}>{item.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}