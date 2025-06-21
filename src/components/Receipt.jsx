import { Eye , Store} from "lucide-react";
import Button from "../components/Button.jsx"
import { Link } from "react-router-dom";
function Receipt({className , receipt}){
    return (
        <div className={`flex flex-col items-center cursor-pointer bg-white shadow-md hover:scale-105 transition-all ease-out hover:shadow-lg shadow-blue-400 p-4 m-3 rounded-xl w-fit ${className} `}>
            <div className="text-lg mb-3 bg-blue-100 rounded-2xl px-3 py-1 text-blue-900">Receipt #{receipt.id}</div>
            <div className="text-2xl px-3 py-1 flex items-center gap-2"><Store></Store> {receipt.pharmacyName}</div>
            <div className="text-lg px-3 py-1 text-gray-500">owner: {receipt.pharmacyOwner}</div>
            <div className="px-3 py-1 text-gray-500" >Total : <span className="text-green-600" >{receipt.total}$</span></div>
            <Link to={`/receipt/${receipt.id}`} className="w-full" >
                <Button className="flex gap-2 mt-5 w-full justify-center items-center"><Eye></Eye>View</Button>
            </Link>
        </div>
    );
}
export default Receipt;