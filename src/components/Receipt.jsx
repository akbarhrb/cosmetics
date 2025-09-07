import { Eye , Store} from "lucide-react";
import Button from "../components/Button.jsx"
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
function Receipt({className , receipt}){
    return (
        <div className={`flex flex-col items-center cursor-pointer bg-white shadow-md hover:scale-105 transition-all ease-out hover:shadow-lg shadow-blue-400 p-4 m-3 rounded-xl w-[90%]"> ${className} `}>
            {
            receipt.status === 'deleted' ? 
            <div className="text-lg mb-3 bg-red-300 rounded-2xl px-3 py-1 text-blue-900">Deleted Receipt #{receipt.id}</div>
            : 
            <div className="text-lg mb-3 bg-blue-100 rounded-2xl px-3 py-1 text-blue-900">Receipt #{receipt.id}</div>
            }
            <div className="text-gray-500">{dayjs(receipt.created_at).format('MMMM DD, YYYY')}</div> 
            <div className="flex items-center justify-end text-xl">
                <Store></Store>
                <div className="px-3 py-1 w-full">{receipt.pharmacy.pharmacy_name}</div>
            </div>
            
            <div className="text-lg px-3 py-1 text-gray-500">owner: {receipt.pharmacy.pharmacy_owner}</div>
            <div className="px-3 py-1 text-gray-500" >Total : <span className="text-green-600" >{receipt.receipt_total}$</span></div>
            <Link to={`/receipt/${receipt.id}`} className="w-full" >
                <Button className="flex gap-2 mt-5 w-full justify-center items-center"><Eye></Eye>View</Button>
            </Link>
        </div>
    );
}
export default Receipt;