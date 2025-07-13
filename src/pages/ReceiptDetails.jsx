import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
function ReceiptDetails(){
  const baseUrl = "http://cosmetics-management.atwebpages.com";
  const { id } = useParams();
  const [receipt , setReceipt] = useState();
  async function getReceiptDetails(){
    const data = {
      'receipt_id' : id
    }
    try{
      const response = await axios.post(`${baseUrl}/getReceiptDetails.php` , data);
      if(response.data['success']){
        setReceipt(response.data);
        console.log(response.data);
      }else{
        console.log(response.data);
      }
    }catch(e){
      alert(e)
    }
  }
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };
  useEffect(()=>{
    getReceiptDetails();
  },[])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Header />
            <div ref={printRef} className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg mt-4 p-6 print:shadow-none print:p-0 print:rounded-none">
        <div className="text-center mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-blue-700">Receipt</h1>
          <p className="text-sm text-gray-600">Receipt No: #{receipt?.receipt_id}</p>
        </div>

        <div className="mb-4">
          <p><span className="font-semibold">Pharmacy Name:</span> {receipt?.pharmacy_name}</p>
          <p><span className="font-semibold">Owner:</span> {receipt?.owner}</p>
          <p><span className="font-semibold">Date:</span> {receipt?.receipt_created_at}</p>
        </div>

        {/* <div className="mt-4 border-t pt-4">
          <h2 className="font-semibold mb-2">Items:</h2>
          <ul className="list-disc ml-6 text-gray-700">
            {receipt?.items.map((item, index) => (
              <li key={index}>
                {item.name} — {item.quantity} x ${item.price} = ${item.quantity * item.price}
              </li>
            ))}
          </ul>
        </div> */}

        <div className="mt-6 text-right font-semibold text-lg">
          Total: ${receipt?.total}
        </div>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Print Receipt
        </button>
      </div>
        </div>
    );
}
export default ReceiptDetails;