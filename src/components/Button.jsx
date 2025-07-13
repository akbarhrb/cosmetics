import classNames from "classnames";

function Button({ children, onClick, type = "button", className = "", variant = "default", ...props }) {
  const baseStyles = "px-6 py-2 text-sm sm:text-sm md:text-md lg:text-lg rounded-lg font-medium transition focus:outline-none";

  const variants = {
    white : "bg-white text-black hover:bg-gray-100 hover:shadow-md hover:shadow-blue-200",
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    ghost: "bg-transparent text-gray-800 hover:bg-gray-100",
  };

  const finalClassName = classNames(baseStyles, variants[variant], className);

  return (
    <button type={type} onClick={onClick} className={finalClassName} {...props}>
      {children}
    </button>
  );
}

export default Button;

