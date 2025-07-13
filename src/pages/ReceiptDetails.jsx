import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import dayjs from 'dayjs';
function ReceiptDetails(){
  const baseUrl = "http://cosmetics-management.atwebpages.com";
  const { id } = useParams();
  const [receipt , setReceipt] = useState();
  const [items , setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  async function getReceiptDetails(){
    setLoading(true);
    const data = {
      'receipt_id' : id
    }
    try{
      const response = await axios.post(`${baseUrl}/getReceiptDetails.php` , data);
      if(response.data['success']){
        setReceipt(response.data['data'][0]);
        setItems(response.data['data']);
        console.log(response.data['data']);
      }else{
        console.log(response.data);
      }
    }catch(e){
      alert(e)
    }finally{
      setLoading(false);
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
    
    {loading ? (
      <div className="text-center mt-10 text-lg text-gray-700">Loading receipt...</div>
    ) : (
      <div>
        <div ref={printRef} className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg mt-4 p-6 print:shadow-none print:p-0 print:rounded-none">
          <div className="text-center mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-blue-700">Receipt</h1>
            <p className="text-sm text-gray-600">Receipt No: #{receipt.receipt_id}</p>
          </div>

          <div className="mb-4">
            <p><span className="font-semibold">Pharmacy Name:</span> {receipt.pharmacy_name}</p>
            <p><span className="font-semibold">Pharmacy Owner:</span> {receipt.pharmacy_owner}</p>
            <p><span className="font-semibold">Order Date:</span> {dayjs(receipt.receipt_created_at).format('DD-MM-YYYY')}</p>
          </div>
          <div>
            <hr />
            <table className="w-full">
              <thead className="">
                <th>Quantity</th>
                <th>Item</th>
                <th>Unit Price</th>
                <th>Total</th>
              </thead>
              <tbody className="text-center">
                {items.map((item)=>
                ( <tr className="my-1">
                  <td>{item.total_quantity}</td>
                  <td>{item.item_name}</td>
                  <td>{item.price}</td>
                  <td>{item.price * item.total_quantity}</td>
                </tr> )
              )}
              </tbody>
            </table>
            
          </div>
          <div className="mt-6 text-right font-semibold text-lg">
            Total: ${receipt?.receipt_total}
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >Print Receipt
          </button>
        </div>
      </div>
    )}
  </div>
);

}
export default ReceiptDetails;