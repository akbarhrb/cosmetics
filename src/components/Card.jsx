import Button from "./Button";

export function Card({ className = '', children }) {
  return (
    <div
      className={`rounded-2xl border cursor-pointer bg-white p-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 flex flex-col items-center justify-evenly text-center ease-in-out duration-300 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children }) {
  return (
    <div className={`mb-4 flex flex-col items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ className = '', children }) {
  return (
    <h3 className={`text-3xl font-semibold ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ className = '', children }) {
  return (
    <p className={`text-m text-gray-100 ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ className = '', children , }) {
  return (
    <div className={`flex flex-col w-full items-center justify-center ${className}`}>
      {children}
    </div>
  );
}
export function CardButton({className="" , children, ...props}){
  return (
    <Button {...props} className={` ${className}`} >{children}</Button>
  );
}
