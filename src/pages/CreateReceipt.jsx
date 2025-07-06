import { useEffect, useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import { Save , Printer, Trash} from "lucide-react";
import SelectComp from "../components/SelectComp";
import Select from "react-select";
import axios from "axios";
function CreateReceipt(){
    const baseUrl = "http://cosmetics-management.atwebpages.com";
    const [pharmacies , setPharmacies] = useState([]);
    async function getPharmacies(){
      try{
        const response = await axios.get(`${baseUrl}/getPharmacies.php`);
        setPharmacies(response.data);
        console.log(response.data); 
      }catch(e){
        console.error(e);
      }
    }
    const [items , setItems] = useState([]);
    async function getItems() {
        axios
        .get(`${baseUrl}/getitems.php`)
        .then((res) => {
            setItems(res.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }
    const inventoryItems = [
        {value : "0" , label : "brownie"},
        {value : "1" , label : "mroeww"},
        {value : "2" , label : "lipss"},
    ];
    const [receiptItems , setReceiptItems] = useState([]);
    function addReceiptItem(){
        const receiptItem = {
            'id':'',
            'quantity' : 1 ,
            'price' : 12 , 
            'total' : 12 , 
        };
        setReceiptItems([...receiptItems , receiptItem]);
    }
    useEffect(()=>{
        getPharmacies();
        getItems();
    } , []);
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
                            <SelectComp className="w-[50%] m-1" >
                                {pharmacies.map((pharmacy) => (
                                    <option key={pharmacy.pharmacy_id} value={pharmacy.pharmacy_id}>{pharmacy.pharmacy_name}</option>
                                ))}
                            </SelectComp>  
                            <Input type="date" className="w-[50%] m-1"/>
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
                            <Button variant="success" onClick={addReceiptItem}>Add Item</Button> 
                        </div>
                        
                        {/* item section */}
                        {receiptItems.map((receiptItem)=>{
                            return (
                                <div className="flex flex-row w-full mt-2 items-center justify-center flex-wrap lg:flex-nowrap sm:flex-wrap md:flex-wrap">
                                    <Select options={inventoryItems} className="w-[95%] m-1 min-w-72" />
                                    <Input type="number" placeholder="quantity" className="w-[25%] m-1" />
                                    <Input type="number" value={receiptItem.price} disabled="true" className="w-[25%] m-1" />
                                    <Input type="number" disabled="true" value={receiptItem.price * 2}  className="w-[25%] m-1" />
                                    <Button variant="danger" className="m-1 w-[95%] sm:w-[95%] lg:w-fit flex items-center justify-center" ><Trash></Trash></Button>
                                    
                                </div>
                            );
                        })}
                        
                    </div>
                    {/* total receipt */}
                    <div className="w-[95%] lg:w-[70%] md:w-[95%] sm:w-[95%]  flex flex-col items-center justify-between bg-white p-3 my-3 rounded-lg cursor-pointer">
                        <div className="flex flex-row w-full ">
                            <div className="text-3xl font-bold my-3 mx-1" >Total: </div>
                            <div className="text-3xl my-3" >12$</div>
                        </div>
                        <div className="flex flex-row w-full justify-between items-start">
                            <Button variant="success" className="m-1 flex gap-3"><Printer></Printer> generate receipt</Button>
                            <Button variant="outline" className="m-1 flex gap-1"><Save></Save> save as draft</Button>
                        </div>
                    </div>
                    
                </form>
                
            </div>
        </div>
    );
}
export default CreateReceipt;