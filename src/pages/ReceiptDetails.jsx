import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import axios from "axios";
import dayjs from 'dayjs';
import SelectComp from "../components/SelectComp";
import Select from "react-select";
import { Trash } from "lucide-react";
import {v4 as uuid} from 'uuid';
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_API_URL;

function ReceiptDetails(){
  const { id } = useParams();
  const [receipt , setReceipt] = useState();
  const [items , setItems] = useState([]);
  const [pharmacy , setPharmacy] = useState();
  const [loading, setLoading] = useState(true);
  const [adding , setAdding] = useState(false);
  async function getReceiptDetails(){
    setLoading(true);
    try{
      const response = await axios.get(`${baseUrl}/receipt/${id}/items`);
      if(response.status === 200){
        console.log(response);
        setReceipt(response.data.data[0].receipt);
        setPharmacy(response.data.pharmacy);
        setItems(response.data.data);
      }else{
        console.log(response);
        toast.error(`NETWORK ERROR OCCURED ${response.data.error}`);
      }
    }catch(e){
      console.log(e);
      toast.error(`NETWORK ERROR OCCURED ${e}`);
    }finally{
      setLoading(false);
    }
  }
  const [newitems , setNewItems] = useState([]);
    async function getItems() {
        axios
        .get(`${baseUrl}/items`)
        .then((res) => {
            setNewItems(res.data.data);
            console.log(items);
        })
        .catch((error) => {
            console.error(error);
            toast.error(`NETWORK ERROR OCCURED ${error}`);
        });
    }
    const options = newitems.map((item) => ({
    value: item.id,
    label: item.item_name,
    }));


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
    getItems();
    getReceiptDetails();
  },[])

  const navigator = useNavigate();

  async function deleteReceipt(id){
    try{
      setLoading(true);
      const response =  await axios.delete(`${baseUrl}/delete-receipt/${id}`);
      if(response.status === 201){
        navigator('/receipts');
        toast.success('Receipt Deleted Successfully')
      }else{
        console.log(response);
        toast.error(`NETWORK ERROR OCCURED ${response.data.error}`);
      }
    }catch(e){
      console.log(e);
      toast.error(`NETWORK ERROR OCCURED ${e}`);
    }finally{
      setLoading(false);
    }
  }
  
  async function returnReceipt(id){
    try{
      setLoading(true);
      const response =  await axios.delete(`${baseUrl}/return-receipt/${id}`);
      if(response.status === 200){
        navigator('/receipts');
        toast.success('Receipt Deleted Successfully')
      }else{
        console.log(response);
        toast.error(`NETWORK ERROR OCCURED ${response.data.error}`);
      }
    }catch(e){
      console.log(e);
      toast.error(`NETWORK ERROR OCCURED ${e}`);
    }finally{
      setLoading(false);
    }
  }
  
  async function closeReceipt(id){
    try{
      setLoading(true);
      console.log(pharmacy.id);
      const response = await axios.post(`${baseUrl}/close-receipt` , {'receipt_id' : id, 'pharmacy_id': pharmacy.id});
      if(response.status == 200){
        navigator('/receipts');
        toast.success('Receipt Closed Successfully')
      }else{
        console.log(response);
        toast.error(`NETWORK ERROR OCCURED ${response.data.error}`);
      }
    }catch(e){
      console.log(e);
      toast.error(`NETWORK ERROR OCCURED ${e}`);
    }
  }
  async function increment(item){
    try{
     setLoading(true);
     const data = {
      'receipt_id': receipt.id,
      'price': item.price,
      'item_id': item.item_id,
      'quantity':item.quantity + 1,
      'total':(item.quantity +1 ) * item.price,
     }
     const response = await axios.put(`${baseUrl}/receipt-item/${item.id}`, data);
     if(response.status === 201){
      getReceiptDetails();
      toast.success('Quantity Updated Successfully')
     }else{
      console.log(response);
      toast.error(`NETWORK ERROR OCCURED ${response.data.error}`);
     }
    }catch(e){
      console.log(e);
      toast.error(`NETWORK ERROR OCCURED ${e}`);
    }finally{
      setLoading(false);
    }
  }
  async function decrement(item){
    try{
      setLoading(true);
      const data = {
        'receipt_id': receipt.id,
        'price': item.price,
        'item_id': item.item_id,
        'quantity':item.quantity - 1,
        'total':(item.quantity - 1 ) * item.price,
      }
      const response = await axios.put(`${baseUrl}/receipt-item/${item.id}`, data);
      if(response.status === 201){
        getReceiptDetails();
        toast.success('Quantity Updated Successfully')
      }else{
        console.log(response);
        toast.error(`NETWORK ERROR OCCURED ${response.data.error}`);
      }
      }catch(e){
        console.log(e);
        toast.error(`NETWORK ERROR OCCURED ${e}`);
      }finally{
        setLoading(false);
      }
   }
  async function deleteItem(item){
    try{
      if(items.length === 1){
        toast.error('Can Not Delete Last Item From Receipt');
        return;
      }
     setLoading(true);
     const data = {
      'receipt_total' : receipt.receipt_total - item.total
     };
     const response = await axios.delete(`${baseUrl}/receipt-item/${item.id}`);
     const response_update = await axios.put(`${baseUrl}/update-receipt/${receipt.id}` , data)
     if(response.status === 201){
      getReceiptDetails();
      toast.success('Item Deleted Successfully')
     }else{
      console.log(response);
      toast.error(`NETWORK ERROR OCCURED ${response.data.error}`);
     }
    }catch(e){
      console.log(e);
      toast.error(`NETWORK ERROR OCCURED ${e}`);
    }finally{
      setLoading(false);
    }
  }
      function deleteReceiptItem(itemToDelete) {
        const updatedItems = receiptItems.filter(
            (item) => item.receipt_item_id !== itemToDelete.receipt_item_id
        );
        setReceiptItems(updatedItems);
        setAdding(false);
    }
        function updateMultipleFields(id, updates) {
    const updated = receiptItems.map((item) => {
        if (item.receipt_item_id === id) {
            const updatedItem = { ...item, ...updates };
            if ('price' in updates || 'quantity' in updates) {
                updatedItem.total = updatedItem.quantity * updatedItem.price;
            }
            return updatedItem;
        }
        return item;
    });
    setReceiptItems(updated);
    // calcReceiptTotal(updated);
}
    function updateItem(id, field, value) {
        const updated = receiptItems.map((item) => {
            if (item.receipt_item_id === id) {
                const updatedItem = { ...item, [field]: value };
                if (field === "price" || field === "quantity") {
                    updatedItem.total = updatedItem.quantity * updatedItem.price;
                    }
                return updatedItem;
                }   
            return item;
        });
        setReceiptItems(updated);
        // calcReceiptTotal(updated);
    }



  const [receiptItems, setReceiptItems] = useState([]);
  function addItem(){
    setAdding(true);
    const newReceiptItem = {
      receipt_item_id : uuid(),
      item_id: null,
      quantity: 1,
      price_unit_ph: 0,
      price_dozen: 0,
      price_unit_ind: 0,
      price: 0,
      total: 0,
      notes : ''
     };
    setReceiptItems([...receiptItems , newReceiptItem]);
  }
  async function saveItem(){
    try{
      setLoading(true)
      const data = {
        'receipt_items' : receiptItems,
        'receipt_id' : receipt.id
      }
      const response = await axios.post(`${baseUrl}/add-receipt-items`, data);
      if(response.status === 201){
        setReceiptItems([]);
        setAdding(false);
        getReceiptDetails();
        toast.success('Item Added Successfully')
      }else{
        console.log(response);
        toast.error(`NETWORK ERROR OCCURED ${response.data.error}`);
      }
    }catch(e){
      console.log(e);
      toast.error('NETWORK ERROR' . e)
    }finally{
      setLoading(false);
    }
  }
  async function submitReceipt(id){
    try{
      setLoading(true);
      const response = await axios.patch(`${baseUrl}/update-r-status/${id}`, {'status' : 'pending'});
      if(response.status === 200){
        navigator('/receipts');
      }else{
        console.log(response);
        toast.error(`NETWORK ERROR OCCURED ${response.data.error}`);
      }
    }catch(e){
      console.log(e)
      toast.error(`NETWORK ERROR OCCURED ${e}`);
    }finally{
      setLoading(false);
    }
  }
  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <Header />
    
    {loading ? (
      <div className="text-center mt-10 text-lg text-gray-700">Loading receipt...</div>
    ) : (
      <div>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-4 p-6 print:shadow-none print:p-0 print:rounded-none">
            <div className="text-center mb-6 border-b pb-4">
              <h1 className="text-2xl font-bold text-blue-700">MSH Cosmetics</h1>
              <p className="text-sm text-gray-600">Receipt No: #{receipt.id}</p>
            </div>

            <div className="mb-4">
              <p><span className="font-semibold">Store Name:</span> {pharmacy['pharmacy_name']}</p>
              <p><span className="font-semibold">Store Owner:</span> {pharmacy['pharmacy_owner']}</p>
              <p><span className="font-semibold">Delivre Date:</span> {dayjs(new Date()).add(1,'day').format('DD-MM-YYYY')}</p>
            </div>
            <div>
              <hr />
              <div className="w-full flex items-center justify-end mt-2">
                {
                  adding ? 
                  <button onClick={()=>saveItem()} className="border-b border-green-500 text-green-500">Save</button>:
                  <button onClick={()=>addItem()} className="border-b border-blue-500 text-blue-500">Add New Item</button>
                }
              </div>
              <table className="w-full">
                <thead className="">
                  <th>Quantity</th>
                  <th>Item</th>
                  <th>Notes</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                  <th>Actions</th>
                </thead>
                <tbody className="text-center">
                  {items.map((item)=>
                  ( <tr className="my-1 border-b b-4">
                    <td>{item.quantity}</td>
                    <td>{item.item.item_name}</td>
                    <td>{item.notes}</td>
                    <td>{item.price}$</td>
                    <td>{item.price * item.quantity}$</td>
                    <td><Button variant="outline" onClick={()=> increment(item)}>+</Button></td>
                    <td><Button variant="outline" onClick={()=> decrement(item)}>-</Button></td>
                    <td><Button variant="danger" onClick={()=> deleteItem(item)}><Trash></Trash></Button></td>

                  </tr>
                    
                )
                )}
                </tbody>
              </table>
                {/* item section */}
                        {receiptItems.map((receiptItem)=>{
                            return (
                                <div key={receiptItem.receipt_item_id} className="flex flex-row w-full rounded-lg border-4 p-1 mt-2 items-center justify-center flex-wrap lg:flex-wrap sm:flex-wrap md:flex-wrap">
                                    <Select
                                            options={options}
                                            value={options.find(opt => opt.value === receiptItem.item_id)}
                                            onChange={(selected) => {
                                                const selectedItem = newitems.find(item => item.id === selected.value);
                                                console.log(selectedItem);
                                                
                                                updateMultipleFields(receiptItem.receipt_item_id, {
                                                    item_id: selectedItem.id,
                                                    price :selectedItem.price_unit_ph,
                                                    price_unit_ph: selectedItem.price_unit_ph,
                                                    price_dozen: selectedItem.price_dozen,
                                                    price_unit_ind: selectedItem.price_unit_ind
                                                });
                                            }}
                                            className="w-[95%] m-1 mx-2 min-w-72"
                                        />
                                    <Input type="text" className="" placeholder="notes..." onChange={(e)=>updateItem(receiptItem.receipt_item_id , 'notes' , e.target.value)}/>
                                    <div className="w-full flex items-center justify-start mx-1">
                                        <Input type="number" value={receiptItem.quantity} onChange={(e)=> updateItem(receiptItem.receipt_item_id , "quantity" , Math.max(1 , e.target.value))} placeholder="quantity" className="w-[25%] m-1" />
                                        <Button variant="outline" className="mx-1" onClick={(e)=> updateItem(receiptItem.receipt_item_id , "quantity" , Math.max(1 , receiptItem.quantity + 1))}>+</Button>
                                        <Button variant="outline" className="mx-1" onClick={(e)=> updateItem(receiptItem.receipt_item_id , "quantity" , Math.max(1 , receiptItem.quantity - 1))}>-</Button>
                                    </div>
                                    <SelectComp value={receiptItem.price} onChange={(e)=>updateItem(receiptItem.receipt_item_id , "price" , e.target.value)}  className="w-[25%] m-1 mx-2">
                                        <option value={receiptItem.price_unit_ph} >pharmacies {receiptItem.price_unit_ph}$</option>
                                        <option value={receiptItem.price_dozen} >dozens {receiptItem.price_dozen}$</option>
                                        <option value={receiptItem.price_unit_ind}>indviduals {receiptItem.price_unit_ind}$</option>
                                    </SelectComp>
                                    <Input type="text" disabled value={`total: ${receiptItem.total}$`} className="w-[25%] m-1" />
                                    <Button variant="danger" onClick={()=>deleteReceiptItem(receiptItem)} className="m-1 w-[95%] sm:w-[95%] flex items-center justify-center" ><Trash></Trash></Button>
                                    
                                </div>
                            );
                        })}

              
            </div>
            <div className="mt-6 text-right font-semibold text-lg">
              Total: ${receipt?.receipt_total}
            </div>
        </div>
        <div ref={printRef} className="hidden max-w-2xl mx-auto bg-white shadow-lg rounded-lg mt-4 p-6 print:shadow-none print:p-0 print:rounded-none">
          <div className="text-center mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-blue-700">MSH Cosmetics</h1>
            <p className="text-sm text-gray-600">Receipt No: #{receipt.id}</p>
          </div>

          <div className="mb-4">
              <p><span className="font-semibold">Store Name:</span> {pharmacy['pharmacy_name']}</p>
              <p><span className="font-semibold">Delivre Date:</span> {dayjs(new Date()).add(1,'day').format('DD-MM-YYYY')}</p>
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
                ( <tr className="my-1 border-b b-4">
                  <td>{item.quantity}</td>
                  <td>{item.item.item_name}</td>
                  <td>{item.price}$</td>
                  <td>{item.price * item.quantity}$</td>

                </tr>
                  
              )
              )}
              </tbody>
            </table>
            
          </div>
          <div className="mt-6 text-right font-semibold text-lg">
            Total: ${receipt?.receipt_total}
          </div>
        </div>

        <div className="mt-4 text-center">
          {receipt.status === 'draft'?
          <button
            onClick={()=>submitReceipt(receipt.id)}
            className="bg-green-600 text-white px-6 py-2 mx-1 my-1 rounded-lg hover:bg-green-700 transition"
          >Submit Receipt
          </button>
          : ''
          }
          {receipt.status === 'pending'?
          <button
            onClick={()=>closeReceipt(receipt.id)}
            className="bg-green-600 text-white px-6 py-2 mx-1 my-1 rounded-lg hover:bg-green-700 transition"
          >Pay Receipt
          </button>
          : ''
          }
          
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-6 py-2 mx-1 my-1 rounded-lg hover:bg-blue-700 transition"
          >Print Receipt
          </button>
          {
            receipt.status != 'deleted' && receipt.status != 'closed'?
            <button
              onClick={()=>deleteReceipt(receipt.id)}
              className="bg-red-600 text-white px-6 py-2 mx-1 my-1 rounded-lg hover:bg-red-700 transition"
            >Delete Receipt
            </button>
            : ''
          }
          {
            receipt.status === 'closed' ?
            <button
              onClick={()=>returnReceipt(receipt.id)}
              className="bg-red-600 text-white px-6 py-2 mx-1 my-1 rounded-lg hover:bg-red-700 transition"
            >Return Receipt
            </button>
            : null
          }
          
        </div>
      </div>
    )}
  </div>
);

}
export default ReceiptDetails;