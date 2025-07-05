import { useEffect, useState } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/Card";
import Button from "../components/Button";
import SelectComp from "../components/SelectComp";
function Inventory(){
    const baseUrl = "http://cosmetics-management.atwebpages.com";
    const [showForm , setShowForm] = useState(true);
    function toggleButton(){
        setShowForm(!showForm);
        console.log(showForm);
    }
    //item attributes
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


    useEffect(()=>{
        getItems(); 
        getcategories();
    }, []);
    function addItem(e) {
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

    axios.post(`${baseUrl}/addItem.php`, newItem)
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
        alert(error);
        });
    }


    //search function
    function search(){
        setFilteredItems(items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())));  
        
    }
    useEffect(()=>{
        search();
    }, [searchTerm])
    
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

                  <Button type="submit" onClick={(e)=> {addItem(e)} } variant="success" className="w-[100%]" >Add New Item</Button>
                </form>
              )}
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
                                
                                <CardTitle>{item.name}</CardTitle>
                                <CardDescription className="m-1" ><p className="text-gray-600" >{item.product_type}</p></CardDescription>
                            </CardHeader>
                            <CardContent>
                               <div className="flex flex-row justify-between w-full">
                                <div className="flex flex-col text-left ml-2">
                                    <div className="my-1" >Quantity</div>
                                    <div className="my-1">Price</div>
                                    <div className="my-1">Total Value</div>
                                </div>
                                <div className="flex flex-col text-right mr-2">
                                    <div className="my-1">10</div>
                                    <div className="text-green-700 my-1" >12$</div>
                                    <div className="my-1">120$</div>
                                </div>
                               </div>
                            </CardContent>
                        </Card>
                    ) )}
                </div>
                <div className="main grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">      
                    { filteredItems.length === 0 && items.map( item => (
                    
                        <Card className="m-4" >
                            <CardHeader className="justify-start">
                                
                                <CardTitle>{item.name}</CardTitle>
                                <CardDescription className="m-1" ><p className="text-gray-600" >{item.product_type}</p></CardDescription>
                            </CardHeader>
                            <CardContent>
                               <div className="flex flex-row justify-between w-full">
                                <div className="flex flex-col text-left ml-2">
                                    <div className="my-1" >Quantity</div>
                                    <div className="my-1">Price</div>
                                    <div className="my-1">Total Value</div>
                                </div>
                                <div className="flex flex-col text-right mr-2">
                                    <div className="my-1">10</div>
                                    <div className="text-green-700 my-1" >12$</div>
                                    <div className="my-1">120$</div>
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