import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/Card";
import Button from "../components/Button";
import { Plus } from "lucide-react";
function Inventory(){

    const [items , setItems] = useState([]);
    const [filteredItems , setFilteredItems] = useState([]);
    const [loading , setLoading] = useState(false);
    const [searchTerm , setSearchTerm] = useState('');
    function getItems() {
        setLoading(true);
        axios
        .get("http://makeup-api.herokuapp.com/api/v1/products.json")
        .then((res) => {
            setItems(res.data);
            setLoading(false); 
        })
        .catch((error) => {
            console.error(error);
            setLoading(false); 
        });
  }

    useEffect(()=>{
        getItems(); 
        
    }, []);

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
                        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
                        <p className="text-gray-600 mt-2">Track and manage your cosmetic products</p>
                    </div>
                    <Button className="" variant="success">Add Product</Button>
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
                        <input
                            onChange={(e)=>setSearchTerm(e.target.value)}
                            type="text"
                            placeholder="search inventory here..."
                            className="w-[95%] px-4 py-2 my-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ease-in-out"
                        />
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
                    { filteredItems.length == 0 && items.map( item => (
                    
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