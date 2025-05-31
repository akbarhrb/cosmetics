function Select({ children, name = '', id = '', value, onChange, className = '' }){
    return (
        <select name={name} id={id} value={value} onChange={onChange} className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200 ${className} `}>{children}</select>
    );
}
export default Select;