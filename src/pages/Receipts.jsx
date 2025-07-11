import axios from "axios";
import Button from "../components/Button";
import Header from "../components/Header";
import Receipt from "../components/Receipt";
import { useEffect, useRef, useState } from "react";
function Receipts(){
    const baseUrl = "http://cosmetics-management.atwebpages.com";
    const [receipts , setReceipts] = useState([]);
    const [status , setStatus] = useState('pending');
    async function getReceipt(){
        try{
            const data = {
                'status' : status
            }
            const response = await axios.post(`${baseUrl}/getReceipts.php` , data );
            if(response.data['success']){
                setReceipts(response.data['data']);
                console.log(response.data['data']);
            }else{
                console.log(`error:  ${response.data['message']}` );
            }
        }catch(e){
            alert(e);
        }
    }
    useEffect(()=>{
        getReceipt();
    },[]);
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
            <div className="grid lg:grid-cols-7 sm:grid-cols-2 grid-cols-1">
                {receipts.map((receipt)=>(
                    <Receipt receipt={receipt} />
                ))}
            </div>   
            
        </div>
    );
}
export default Receipts;