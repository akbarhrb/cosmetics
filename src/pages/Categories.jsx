import { useEffect, useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import axios from "axios";
import { toast } from "react-toastify";
import { Cuboid, Trash } from "lucide-react";
import Spinner from "../components/Spinner";

function Categories(){
    const [cat_name , set_cat_name] = useState();
    const [loading , setLoading] = useState(false);
    const [adding , setAdding] = useState(false);
    const [categories, set_categories] = useState([]);
    const baseUrl = process.env.REACT_APP_API_URL;
    async function addCategory(){
        try{
            setAdding(true);
            if(!cat_name){
                alert('enter the category name first');
                return;
            }
            const response = await axios.post(`${baseUrl}/add-category` , {'cat_name' : cat_name});
            if(response.status === 201){
                set_cat_name('');
                getCategories();
                toast.success('Category Created Successfully');
            }else{
                console.log(response);
                toast.error(`NETWORK ERROR OCCURED ${response.data.error}`);
            }
        }catch(e){
            console.log(e);
            toast.error(`NETWORK ERROR OCCURED ${e}`);
        }finally{
            setAdding(false);
        }
    }
    async function getCategories(){
        setLoading(true);
        try{
            const response = await axios.get(`${baseUrl}/categories`);
            if(response.status === 200){
                toast.success('Categories Loaded Successfuly');
                set_categories(response.data.data);
            }else{
                toast.error(`NETWORK ERROR OCCURED ${response.data.error}`);
            }
        }catch(e){
            console.log(e);
            toast.error(`NETWORK ERROR OCCURED ${e}`);
        }finally{
            setLoading(false);
        }
    }
    async function deleteCategroy(id){
        setLoading(true);
        try{
            const response = await axios.delete(`${baseUrl}/delete-category/${id}`);
            if(response.status === 200){
                toast.success('Category Deleted Successfully');
                getCategories();
            }else{
                toast.error(`NETWORK ERROR OCCURED ${response.data.error}`);
                console.log(response);
            }
        }catch(e){
            toast.error(`NETWORK ERROR OCCURED ${e}`);
            console.log(e);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        getCategories();
    },[]);
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form className="mt-6 mb-6 space-y-4 p-4 border rounded-lg bg-white shadow-md transition-all duration-300 ease-in-out opacity-100 scale-100 animate-fade-in">
                    <div>
                        <label className="block mb-1 text-gray-700">Item Name</label>
                        <Input type="text" value={cat_name} onChange={(e)=>set_cat_name(e.target.value)} placeholder="Enter category name" className="w-full"/>
                    </div>
                    <Button className="w-full" onClick={()=>addCategory()}>{adding ? 'adding...' : 'Add Category'}</Button>
                </form>
                {
                    loading ? <Spinner /> :
                
                <div className="w-full categories-container flex flex-col items-center mx-auto px-4">
                {categories.map((category) => (
                    <div
                    key={category.id}
                    className="group flex items-center justify-between w-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300 my-2 px-4 py-3 rounded-lg border border-gray-200 cursor-pointer"
                    >
                    <div className="flex items-center space-x-3">
                        <Cuboid className="text-blue-600" />
                        <p className="text-gray-800 font-medium text-base">{category.cat_name}</p>
                    </div>
                    <button
                        onClick={()=>deleteCategroy(category.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                        aria-label={`Delete ${category.cat_name}`}
                    >
                        <Trash />
                    </button>
                    </div>
                ))}
                </div>
                }
            </main>

            
        </div>
    )
}
export default Categories;