import { useEffect, useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import { Save , Printer, Trash} from "lucide-react";
import SelectComp from "../components/SelectComp";
import Select from "react-select";
import axios from "axios";
import {v4 as uuid} from 'uuid';
import { useLocation, useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_API_URL;

function CreateReceipt(){
    const [pharmacies , setPharmacies] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const preselectedPharmacyId = queryParams.get("pharmacy_id");
    const [pharmacy_id , set_pharmacy_id] = useState(preselectedPharmacyId);
    const [loading , setLoading] = useState(false);
   

    const navigate = useNavigate();
    async function getPharmacies(){
      try{
        const response = await axios.get(`${baseUrl}/pharmacies`);
        setPharmacies(response.data.data);
        console.log(response.data); 
      }catch(e){
        console.error(e);
      }
    }
    useEffect(()=>{
        getPharmacies();
        getItems();
    } , []);
    const [items , setItems] = useState([]);
    async function getItems() {
        axios
        .get(`${baseUrl}/items`)
        .then((res) => {
            setItems(res.data.data);
            console.log(items);
        })
        .catch((error) => {
            console.error(error);
        });
    }
    const [receiptItems , setReceiptItems] = useState([]);
    const options = items.map((item) => ({
    value: item.id,
    label: item.item_name,
    }));
    

    function addReceiptItem(){
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
        calcReceiptTotal(updated);
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
    calcReceiptTotal(updated);
}

    const [receipt_total , set_receipt_total] = useState(0);
    function calcReceiptTotal(items){
        const total = items.reduce((sum , item) => sum + item.total , 0);
        set_receipt_total(total);
    }
    function deleteReceiptItem(itemToDelete) {
        const updatedItems = receiptItems.filter(
            (item) => item.receipt_item_id !== itemToDelete.receipt_item_id
        );
        setReceiptItems(updatedItems);
        calcReceiptTotal(updatedItems);
    }
    const [receipt_id , set_receipt_id] = useState();
    async function createReceipt(){
        try{
            setLoading(true);
            console.log(receiptItems);
            if(!pharmacy_id){
                alert('choose pharmacy');
                return;
            }
            if(receipt_total<=0){
                alert('cant create empty receipt');
                return;
            }
            const response = await axios.post(`${baseUrl}/add-receipt` , {'pharmacy_id' : pharmacy_id});
            console.log(response);
            if(response.status === 201){
                set_receipt_id(response.data.data['id']);
            }else{
                alert(response.data['message']);
            }
            const rcpItems = {
                'receipt_id' : response.data.data['id'],
                'receipt_items' : receiptItems
            }
            console.log(rcpItems);
            const res = await axios.post(`${baseUrl}/add-receipt-items` , rcpItems);
            
            console.log(res);
            setReceiptItems([]);
            navigate('/receipts');
            return response.data.data['id'];
        }catch(e){
            alert(e);
        }finally{
            setLoading(false);
        }
    }
    async function saveDraft(){
        const receipt_id = await createReceipt();
        console.log(receipt_id)
        try{
            const response = await axios.patch(`${baseUrl}/update-r-status/${receipt_id}`, {'status' : 'draft'});
            if(response.status === 201){

            }else{
                console.log(response);
            }

        }catch(e){
            console.log(e);
            alert(e);
        }
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* header and navbar */}
            <Header />
            
            {/* create new receipt form */}
            
            <div className="flex flex-col items-center">
                {/* main header */}
                <div className="flex flex-col items-start sm:items-center md:items-center lg:items-start cursor-pointer w-[70%] my-6">
                    <div className="text-3xl font-bold my-1">Create New Receipt</div>
                    <div className="text-md text-gray-500 my-1 ">Generate a professional receipt for your pharmacy order</div>
                </div>
                {/* the form */}
                <form className=" flex flex-col items-center w-full">

                    {/* select pharmacy */}
                    <div className="w-[95%] bg-white p-3 my-3 rounded-lg flex flex-col items-center lg:w-[70%] cursor-pointer md:w-[95%] sm:w-[95%]" >

                        {/* header select pharmacy */}
                        <div className="flex flex-col w-full items-start p-1 mb-3 ">
                            <div className="text-3xl font-bold mt-4 ">Pharmacy Information</div>
                            <div className="text-md text-gray-500 mt-1">Select the pharmacy for this receipt</div>
                        </div>

                        {/* select pharmacy and date*/}
                        <div className="flex flex-row w-full items-center">                          
                            <SelectComp className="w-[50%] m-1" value={pharmacy_id} onChange={(e)=>set_pharmacy_id(e.target.value)} >
                                <option value={null}>Select Pharmacy</option>
                                {pharmacies.map((pharmacy) => (
                                    <option key={pharmacy.id} value={pharmacy.id}>{pharmacy.pharmacy_name}</option>
                                ))}
                            </SelectComp>  
                        </div>

                        
                    </div>

                    {/* add items  */}
                    <div className="w-[95%] bg-white p-3 my-3 rounded-lg lg:w-[70%] flex flex-col items-center cursor-pointer md:w-[95%] sm:w-[95%] " >
                        {/* header item section */}
                        <div className="flex flex-row flex-wrap w-full items-center justify-between mb-3">
                            <div className="flex flex-col justify-start">
                                <div className="text-3xl font-bold mt-4">Items</div>
                                <div className="text-md text-gray-500 mt-1 ">Add products to this receipt</div>
                            </div>
                            <Button variant="success" onClick={()=>addReceiptItem()}>Add Item</Button> 
                        </div>
                        
                        {/* item section */}
                        {receiptItems.map((receiptItem)=>{
                            return (
                                <div key={receiptItem.receipt_item_id} className="flex flex-row w-full rounded-lg border-4 p-1 mt-2 items-center justify-center flex-wrap lg:flex-nowrap sm:flex-wrap md:flex-wrap">
                                    <Select
                                            options={options}
                                            value={options.find(opt => opt.value === receiptItem.item_id)}
                                            onChange={(selected) => {
                                                const selectedItem = items.find(item => item.id === selected.value);
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
                                    <Button variant="danger" onClick={()=>deleteReceiptItem(receiptItem)} className="m-1 w-[95%] sm:w-[95%] lg:w-fit flex items-center justify-center" ><Trash></Trash></Button>
                                    
                                </div>
                            );
                        })}
                        
                    </div>
                    {/* total receipt */}
                    <div className="w-[95%] lg:w-[70%] md:w-[95%] sm:w-[95%]  flex flex-col items-center justify-between bg-white p-3 my-3 rounded-lg cursor-pointer">
                        <div className="flex flex-row w-full ">
                            <div className="text-3xl font-bold my-3 mx-1" >Total: </div>
                            <div className="text-3xl my-3" >{receipt_total}$</div>
                        </div>
                        <div className="flex flex-row w-full justify-between items-start">
                            {
                                loading ? 
                                <Button variant="" className="m-1 flex gap-3 bg-green-800 text-white">generating...</Button> :
                                <Button onClick={()=>createReceipt()} variant="success" className="m-1 flex gap-3"><Printer></Printer> generate receipt</Button>
                            }
                            <Button variant="outline" onClick={()=>saveDraft()} className="m-1 flex gap-1"><Save></Save> save as draft</Button>
                        </div>
                    </div>
                    
                </form>
                
            </div>
        </div>
    );
}
export default CreateReceipt;