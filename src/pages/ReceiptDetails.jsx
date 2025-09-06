import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import dayjs from 'dayjs';
import Button from "../components/Button";

const baseUrl = process.env.REACT_APP_API_URL;

function ReceiptDetails(){
  const { id } = useParams();
  const [receipt , setReceipt] = useState();
  const [items , setItems] = useState([]);
  const [pharmacy , setPharmacy] = useState();
  const [loading, setLoading] = useState(true);
  async function getReceiptDetails(){
    setLoading(true);
    try{
      const response = await axios.get(`${baseUrl}/receipt/${id}/items`);
      if(response.status === 200){
        setReceipt(response.data.data[0].receipt);
        setPharmacy(response.data.pharmacy[0]);
        setItems(response.data.data);
      }else{
        console.log(response);
      }
    }catch(e){
      console.log(e);
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

  const navigator = useNavigate();

  async function returnReceipt(id){
    try{
      setLoading(true);
      const response =  await axios.patch(`${baseUrl}/update-r-status/${id}` , {'status' : 'deleted'});
      if(response.status === 200){
        navigator('/receipts');
      }else{
        console.log(response);
      }
    }catch(e){
      console.log(e);
    }
  }
  
  async function closeReceipt(id){
    try{
      const response = await axios.post(`${baseUrl}/close-receipt` , {'receipt_id' : id});
      if(response.status == 200){
        navigator('/receipts');
      }else{
        console.log(response);
        alert('error occured');
      }
    }catch(e){
      console.log(e);
    }
  }
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
            <p className="text-sm text-gray-600">Receipt No: #{receipt.id}</p>
          </div>

          <div className="mb-4">
            <p><span className="font-semibold">Pharmacy Name:</span> {pharmacy['pharmacy_name']}</p>
            <p><span className="font-semibold">Pharmacy Owner:</span> {pharmacy['pharmacy_owner']}</p>
            <p><span className="font-semibold">Delivre Date:</span> {dayjs(new Date()).format('DD-MM-YYYY')}</p>
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
                  <td>{item.quantity} units</td>
                  <td>{item.item.item_name}</td>
                  <td>{item.price}$</td>
                  <td>{item.price * item.quantity}$</td>
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
            onClick={()=>closeReceipt(receipt.id)}
            className="bg-green-600 text-white px-6 py-2 mx-1 my-1 rounded-lg hover:bg-green-700 transition"
          >Pay Receipt
          </button>
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-6 py-2 mx-1 my-1 rounded-lg hover:bg-blue-700 transition"
          >Print Receipt
          </button>
          <button
            onClick={()=>returnReceipt(receipt.id)}
            className="bg-red-600 text-white px-6 py-2 mx-1 my-1 rounded-lg hover:bg-red-700 transition"
          >Return Receipt
          </button>
        </div>
      </div>
    )}
  </div>
);

}
export default ReceiptDetails;