import { useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
function ReceiptDetails(){
    const receipt = {
            'id' : 224 , 
            'pharmacyOwner' : "dr. moussa",
            'pharmacyName' : 'algamal lb',
            'total' : 20,
            'status' : 'pending',
            'createdAt' : "12-06-2025",
            'items' : [
                {
                    'name':"test",
                    'quantity' : 2, 
                    'price' : 20
                },
                 {
                    'name':"test",
                    'quantity' : 2, 
                    'price' : 20
                },
                 {
                    'name':"test",
                    'quantity' : 2, 
                    'price' : 20
                },
                 {
                    'name':"test",
                    'quantity' : 2, 
                    'price' : 20
                }
            ],
        };
    const { id } = useParams();
    const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Header />
            <div ref={printRef} className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 print:shadow-none print:p-0 print:rounded-none">
        <div className="text-center mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-blue-700">Receipt</h1>
          <p className="text-sm text-gray-600">Receipt No: #{receipt.id}</p>
        </div>

        <div className="mb-4">
          <p><span className="font-semibold">Pharmacy Name:</span> {receipt.pharmacyName}</p>
          <p><span className="font-semibold">Owner:</span> {receipt.pharmacyOwner}</p>
          <p><span className="font-semibold">Date:</span> {receipt.createdAt}</p>
        </div>

        <div className="mt-4 border-t pt-4">
          <h2 className="font-semibold mb-2">Items:</h2>
          <ul className="list-disc ml-6 text-gray-700">
            {receipt.items.map((item, index) => (
              <li key={index}>
                {item.name} — {item.quantity} x ${item.price} = ${item.quantity * item.price}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 text-right font-semibold text-lg">
          Total: ${receipt.total}
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