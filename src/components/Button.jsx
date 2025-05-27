function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`px-6 py-2 rounded-2xl font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-200 ${className}`}
      {...props}
    >
    {children}
    </button>
  );
}

export default Button;
