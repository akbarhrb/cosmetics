export function Card({ className = '', children }) {
  return (
    <div
      className={`rounded-2xl border bg-white p-6 shadow-md flex flex-col items-center justify-center text-center ${className}`}
    >
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
    <h3 className={`text-3xl text-white font-semibold text-gray-800 ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ className = '', children }) {
  return (
    <p className={`text-m text-gray-500 ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ className = '', children }) {
  return (
    <div className={`flex flex-col w-full items-center justify-center ${className}`}>
      {children}
    </div>
  );
}
