import Button from "../components/Button";
import Header from "../components/Header";
import Receipt from "../components/Receipt";
import { useRef, useState } from "react";
function Receipts(){
    const [receipts , setReceipts] = useState([]);
    const receiptRef = useRef();
    const freceipt = {
            'id' : 224 , 
            'pharmacyOwner' : "dr. moussa",
            'pharmacyName' : 'Algamal lb Pharmacy',
            'pharmacy_id' : 222,
            'total' : 20,
            'status' : 'pending',
            'createdAt' : "12-06-2025"
    }
    function getReceipts(){
        const receipt = {
            'id' : 224 , 
            'owner' : "dr. moussa",
            'pharmacy_name' : 'algamal lb',
            'pharmacy_id' : 222,
            'total' : 20,
            'status' : 'pending',
            'createdAt' : "12-06-2025"

        };
    }
    function print(){
        document.body.innerHTML = receiptRef.current.innerHTML;
        document.title = 'RECEIPT';
        window.print();
        window.location.reload();   
    }
    

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* header and navbar */}
            <Header />
            {/* select receitps status */}
            <div className="flex flex-row overflow-x-scroll w-full">
                <Button variant="white" className="w-full m-3" >draft</Button>
                <Button variant="white" className="w-full m-3" >pending</Button>
                <Button variant="white" className="w-full m-3" >receieved</Button>
                <Button variant="white" className="w-full m-3" >returned</Button>
            </div>

            {/* receipts */}
            <div className="grid grid-cols-4">
                <Receipt receipt={freceipt} />
        
            </div>   
            
        </div>
    );
}
export default Receipts;