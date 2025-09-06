import { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import axios from "axios";

function Categories(){
    const [cat_name , set_cat_name] = useState();
    const [loading , setLoading] = useState(false);
    const baseUrl = process.env.REACT_APP_API_URL;
    async function addCategory(){
        try{
            setLoading(true);
            if(!cat_name){
                alert('enter the category name first');
                return;
            }
            const response = await axios.post(`${baseUrl}/add-category` , {'cat_name' : cat_name});
            if(response.status === 201){
                set_cat_name('');
            }else{
                console.log(response);
                alert('error occured');
            }
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form className="mt-6 mb-6 space-y-4 p-4 border rounded-lg bg-white shadow-md transition-all duration-300 ease-in-out opacity-100 scale-100 animate-fade-in">
                    <div>
                        <label className="block mb-1 text-gray-700">Item Name</label>
                        <Input type="text" value={cat_name} onChange={(e)=>set_cat_name(e.target.value)} placeholder="Enter category name" className="w-full"/>
                    </div>
                    <Button className="w-full" onClick={()=>addCategory()}>{loading ? 'adding...' : 'Add Category'}</Button>
                </form>
            </main>
            
        </div>
    )
}
export default Categories;