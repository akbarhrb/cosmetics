import axios from "axios";
import Button from "../components/Button";
import Header from "../components/Header";
import Receipt from "../components/Receipt";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
function Receipts(){
    const baseUrl = process.env.REACT_APP_API_URL;
    const [receipts , setReceipts] = useState([]);
    const [status , setStatus] = useState('pending');
    async function getReceipts(receipts_status){
        setStatus(receipts_status);
        try{
            const response = await axios.get(`${baseUrl}/receipts/${receipts_status}`);
            const response_clear = await axios.get(`${baseUrl}/delete-empty-receipts`);
            if(response.status === 200){
                setReceipts(response.data.receipts);
                toast.success('Receipts Loaded Successfully');
            }else{
                toast.error(`NETWORK ERROR OCCURED" ${response.data.error}`);
            }
            if(response_clear.status === 200){
                console.log(`nb of deleted receipts: ${response_clear.data.count}`);
            }else{
                toast.error(`NETWORK ERROR OCCURED" ${response_clear.data.error}`);
            }
        }catch(e){
            toast.error(`NETWORK ERROR OCCURED" ${e}`);
        }
    }
    useEffect(()=>{
        getReceipts(status);
    },[]);
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* header and navbar */}
            <Header />
            {/* select receitps status */}
            <div className="flex flex-row overflow-x-scroll w-full">
                <Button variant={status === "draft" ? 'default' : 'white'} className="w-full m-3" onClick={()=>getReceipts('draft')}>draft</Button>
                <Button variant={status === "pending" ? 'default' : 'white'} className="w-full m-3" onClick={()=>getReceipts('pending')}>pending</Button>
                <Button variant={status === "closed" ? 'default' : 'white'} className="w-full m-3" onClick={()=>getReceipts('closed')}>closed</Button>
                <Button variant={status === "deleted" ? 'default' : 'white'} className="w-full m-3" onClick={()=>getReceipts('deleted')}>returned</Button>
            </div>

            {/* receipts */}
            {receipts.length === 0 ? ( <div className="w-full flex items-center justify-center"><div className="w-fit text-3xl mt-5 p-3 rounded-lg text-center border-solid border-2 bg-white cursor-pointer hover:scale-105 duration-100">No Receipts</div></div> ): ''}
            <div className="w-full grid lg:grid-cols-7 sm:grid-cols-2 grid-cols-1">
                {receipts.map((receipt)=>(
                    <Receipt receipt={receipt} />
                ))}
            </div>   
            
        </div>
    );
}
export default Receipts;