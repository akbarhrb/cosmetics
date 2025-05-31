function Input({className , ...props}){
    return (
        <input
          {...props}
          className={`w-[95%] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-xl focus:shadow-blue-300 focus:border-transparent transition-all ease-in-out ${className}`}
        />
    );
}
export default Input;