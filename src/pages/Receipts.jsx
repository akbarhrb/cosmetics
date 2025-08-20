import axios from "axios";
import Button from "../components/Button";
import Header from "../components/Header";
import Receipt from "../components/Receipt";
import { useEffect, useRef, useState } from "react";
function Receipts(){
    const baseUrl = process.env.REACT_APP_API_URL;
    const [receipts , setReceipts] = useState([]);
    const [status , setStatus] = useState('pending');
    async function getReceipts(receipts_status){
        setStatus(receipts_status);
        try{
            const response = await axios.get(`${baseUrl}/receipts/${receipts_status}`);
            console.log(response);
            if(response.status === 200){
                setReceipts(response.data.receipts);
                
            }else{
                console.log(`error:  ${response.data.data['error']}` );
            }
        }catch(e){
            console.log(e);
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
                <Button variant={status === "returned" ? 'default' : 'white'} className="w-full m-3" onClick={()=>getReceipts('deleted')}>returned</Button>
            </div>

            {/* receipts */}
            <div className="w-full grid lg:grid-cols-7 sm:grid-cols-2 grid-cols-1">
                {receipts.length === 0 ? ( <div className="w-full text-3xl mt-5 text-center">no receipts</div> ): <div></div> }
                {receipts.map((receipt)=>(
                    <Receipt receipt={receipt} />
                ))}
            </div>   
            
        </div>
    );
}
export default Receipts;