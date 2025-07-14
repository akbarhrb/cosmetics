import { useEffect, useState } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/Card";
import Button from "../components/Button";
import SelectComp from "../components/SelectComp";
import { Edit } from "lucide-react";
function Inventory(){
    const baseUrl = "http://cosmetics-management.atwebpages.com";
    const [showForm , setShowForm] = useState(false);
    function toggleButton(){
        setShowForm(!showForm);
        console.log(showForm);
    }
    const [process , setProcess] = useState('Add New Item');
    //item attributes
    const [item_id , set_item_id] = useState();
    const [item_name , set_item_name] = useState();
    const [cat_id, set_cat_id] = useState();
    const [item_color , set_item_color] = useState('');
    const [quantity , set_quantity] = useState();
    const [price_unit_ind , set_price_unit_ind] = useState();
    const [price_dozen , set_price_dozen] = useState();
    const [price_unit_ph , set_price_unit_ph] = useState();
    const [cost , set_cost] = useState();
    const [description , set_description] = useState('');

    const [items , setItems] = useState([]);
    const [filteredItems , setFilteredItems] = useState([]);
    const [loading , setLoading] = useState(false);
    const [searchTerm , setSearchTerm] = useState('');

    async function getItems() {
        setLoading(true);
        axios
        .get(`${baseUrl}/getitems.php`)
        .then((res) => {
            setItems(res.data);
            setFilteredItems(res.data);
            console.log(res.data);
            setLoading(false); 
        })
        .catch((error) => {
            console.error(error);
            setLoading(false); 
        });
    }
    const [categories , setCategories] = useState([]);
    async function getcategories(){
        axios
        .get(`${baseUrl}/getcategories.php`)
        .then((res)=>{
            setCategories(res.data);
        })
        .catch((error) =>{
            console.error(error);
        });
    }
    const [requiredItems, setRequiredItems] = useState([]);

    async function getRequiredItems() {
        try {
            const response = await axios.get(`${baseUrl}/getRequiredItems.php`);
            if (response.data['success']) {
                let fetchedItems = response.data['data'];

                // Filter and update quantities
                const updatedItems = fetchedItems.map(reqItem => {
                    const matchingItem = items.find(filItem => filItem.item_id === reqItem.item_id);
                    if (matchingItem) {
                        const updatedQuantity = Math.max(0, reqItem.total_required_quantity - matchingItem.quantity);
                        return { ...reqItem, total_required_quantity: updatedQuantity };
                    }
                    return reqItem;
                }).filter(item => item.total_required_quantity > 0);
                setRequiredItems(updatedItems);

            } else {
                alert('Error: ' + response.data.message);
            }
        } catch (e) {
            alert('Error: ' + e.message);
        }
    }
    useEffect(()=>{
        getItems(); 
        getcategories();
        
    }, []);
    useEffect(() => {
        if (items.length > 0) {
            getRequiredItems();
        }
    }, [items]);
    async function addItem(e) {
    e.preventDefault();

    // Validate required fields
    if (!cat_id || !item_name || !quantity || !price_unit_ind || !price_dozen || !price_unit_ph || !cost) {
        alert("Please fill in all required fields.");
        return;
    }

    const newItem = {
        cat_id,
        item_name,
        item_color,
        quantity,
        price_unit_ind,
        price_dozen,
        price_unit_ph,
        cost,
        description,
    };

    try{
       const response = await axios.post(`${baseUrl}/additem.php`, newItem)
        .then(res => {
        if (res.data.success) {
            set_item_name('');
            set_item_color('');
            set_quantity('');
            set_price_unit_ind('');
            set_price_dozen('');
            set_price_unit_ph('');
            set_cost('');
            set_description('');
            set_cat_id('');
            setShowForm(false);
            getItems(); // refresh list
        } else {
            alert(res.data.error || "Something went wrong.");
        }
        })
        .catch(error => {
        console.log(error);
        alert(error);
        });
    }catch(error){
        alert(error);
    }
    }


    //search function
    function search(){
        setFilteredItems(items.filter(item => item.item_name.toLowerCase().includes(searchTerm.toLowerCase())));  
        
    }
    useEffect(()=>{
        search();
    }, [searchTerm])
    function EditItem(selectedItem){
        const item = items.find((item)=> item.item_id == selectedItem.item_id);
        setShowForm(true);
        setProcess("Update");
        set_item_id(item.item_id);
        set_item_name(item.item_name);
        set_cat_id(item.cat_id);
        set_item_color(item.item_color);
        set_quantity(item.quantity);
        set_price_unit_ind(item.price_unit_ind);
        set_price_dozen(item.price_dozen);
        set_price_unit_ph(item.price_unit_ph);
        set_cost(item.cost);
        set_description(item.description);
    }
    async function updateItem(){
        const data = {
            'item_id' : item_id,
            'item_name' : item_name,
            'cat_id' : cat_id,
            'item_color' : item_color,
            'quantity' : quantity,
            'price_unit_ind' : price_unit_ind,
            'price_dozen' : price_dozen,
            'price_unit_ph' : price_unit_ph,
            'cost' : cost,
            'description' : description
        }
        try{
            const response = await axios.post(`${baseUrl}/updateItem.php` , data);
            if(response.data['success']){
                set_item_name();
                set_cat_id();
                set_item_color('');
                set_quantity();
                set_price_unit_ind();
                set_price_dozen();
                set_price_unit_ph();
                set_cost();
                set_description('');
                setShowForm(false);
                setProcess('Add New Item');
            }else{
                alert(response.data);
            }
        }catch(e){
            alert(e);
        }
    }
    async function softDeleteItem(id) {
    if (!window.confirm("Are you sure you want to delete this item? note that before deleting the item delete all receipts that includes this item")) return;
    try {
        const response = await axios.post(`${baseUrl}/deleteItem.php`, { item_id: id });
        if (response.data.success) {
            set_item_name();
                set_cat_id();
                set_item_color('');
                set_quantity();
                set_price_unit_ind();
                set_price_dozen();
                set_price_unit_ph();
                set_cost();
                set_description('');
        alert("Item deleted.");
        setProcess("Add New Item");
        setShowForm(false);
        getItems(); 
        } else {
        alert("Failed to delete: " + response.data.message);
        }
    } catch (e) {
        alert("Error deleting item: " + e.message);
    }
    }

    
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* header and navbar */}
            <Header />
            
            {/*main content*/}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-lg sm:text-lg md:text-2xl lg:text-3xl font-bold text-gray-900">Inventory Management</h1>
                        <p className="text-gray-600 mt-2">Track and manage your cosmetic products</p>
                    </div>
                    <Button className="" onClick={toggleButton} variant="success">{showForm? 'Cancel' : 'Add Product'}</Button>
                </div>
                {/* show form*/}
              {showForm && (
                <form className="mt-6 mb-6 space-y-4 p-4 border rounded-lg bg-white shadow-md transition-all duration-300 ease-in-out opacity-100 scale-100 animate-fade-in">
                  <div>
                    <label className="block mb-1 text-gray-700">Item Name</label>
                    <Input type="text" value={item_name} onChange={(e)=>set_item_name(e.target.value)} placeholder="Enter item name" className="w-full"/>
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Item Category</label>
                    <SelectComp value={cat_id} onChange={(e) => set_cat_id(e.target.value)}>
                    {categories.map((category) => (
                        <option key={category.cat_id} value={category.cat_id}>{category.cat_name}</option>
                    ))}
                    </SelectComp>
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Item Color</label>
                    <Input type="text" value={item_color} onChange={(e)=>set_item_color(e.target.value)} placeholder="Enter item color if exit (optional)" className="w-full"/>
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Quantity Available</label>
                    <Input type="number" value={quantity} onChange={(e)=>set_quantity(e.target.value)} className="w-full" placeholder="set quantity available in our stock" />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Price For Indviduals</label>
                    <Input type="number" value={price_unit_ind} onChange={(e)=>set_price_unit_ind(e.target.value)} className="w-full" placeholder="set price for individuals" />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Price In Dozens</label>
                    <Input type="number" value={price_dozen} onChange={(e)=>set_price_dozen(e.target.value)} className="w-full" placeholder="set price in dozen selling" />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Price For Pharmacies</label>
                    <Input type="number" value={price_unit_ph} onChange={(e)=>set_price_unit_ph(e.target.value)} className="w-full" placeholder="set price for pharmacies" />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Cost</label>
                    <Input type="number" value={cost} onChange={(e)=>set_cost(e.target.value)} className="w-full" placeholder="set the cost of this item" />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Description</label>
                    <Input type="text" value={description} onChange={(e)=>set_description(e.target.value)} className="w-full" placeholder="description of the item (optional)"/>
                  </div>

                  <Button type="submit" onClick={ process == "Update" ? (e)=>updateItem(e) :(e)=> addItem(e) } variant="success" className="w-[100%]" >{process}</Button>
                  {
                    process == "Update" ? <Button variant="danger" className="w-full my-2" onClick={()=>softDeleteItem(item_id)} >Soft Delete</Button> : ''
                  }
                </form>
            )}
                {/* required items */}
                <div className="bg-white p-4 rounded-md shadow-md mx-4 mb-6">
                    <h2 className="lg:text-2xl sm:text-lg font-bold text-red-500 mb-3">Required Items</h2>
                    {requiredItems.map((reqItem) => (
                        <div key={reqItem.item_id} className="text-red-600 border-b py-1">
                            {reqItem.item_name} : {reqItem.total_required_quantity} unit needed
                        </div>
                    ))}
                </div>

              
                {/* inventory items */}
                {loading && 
                    (
                        <div className="flex justify-center items-center h-32">
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )
                }
                {/* search bar */}
                {!loading && (
                    <div className=" flex flex-row items-center justify-center" >
                        <Input type="text" className="my-2" placeholder="search inventory here..." onChange={(e)=>setSearchTerm(e.target.value)} />   
                    </div>
                )}
                <div className="main grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                    { filteredItems.map( item => (
                    
                        <Card className="m-4" >
                            <CardHeader className="justify-start">
                                
                                <CardTitle className="flex items-center" >{item.item_name} <Edit className="mt-2 text-green-700" onClick={()=>EditItem(item)} ></Edit></CardTitle> 
                                <CardDescription className="m-1" ><p className="text-gray-600" >{item.cat_name}</p></CardDescription>
                            </CardHeader>
                            <CardContent>
                               <div className="flex flex-row justify-between w-full">
                                    <div className="flex flex-col text-left ml-2">
                                        <div className="my-1" >Quantity</div>
                                        <div className="my-1">Cost</div>
                                        <div className="my-1">Total Value</div>
                                    </div>
                                    <div className="flex flex-col text-right mr-2">
                                        <div className="my-1">{item.quantity} unit</div>
                                        <div className="text-green-700 my-1" >{item.cost} $</div>
                                        <div className="my-1">{item.cost * item.quantity} $</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) )}
                </div>
                
            </main>
            
            
        </div>
    );
}
export default Inventory;