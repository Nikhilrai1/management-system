export const Input = ({ name, title, type, icon, placeholder, value, onChange, isFullWidth, min, max, disabled }) => {
    return (
        <div className={`${isFullWidth ? "w-full" : "w-1/2"} px-3 mb-5`}>
            <label htmlFor={name} className="text-xs font-semibold px-1">{title}</label>
            <div className="flex">
                {icon &&
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        {icon}
                    </div>
                }
                {(min && max) ? (
                    <input min={min} max={max} name={name} type={type} value={value} onChange={onChange} disabled={disabled} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder={placeholder} />
                ) : (
                    <input name={name} type={type} value={value} onChange={onChange} disabled={disabled} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder={placeholder} />
                )
                }
            </div>
        </div>
    )
}
