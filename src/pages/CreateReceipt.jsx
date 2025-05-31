import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import Select from "../components/Select";
function CreateReceipt(){
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* header and navbar */}
            <Header />
            
            {/* create new receipt form */}
            
            <div className="flex flex-col items-center">
                {/* main header */}
                <div className="flex flex-col items-start cursor-pointer w-[70%] my-6">
                    <div className="text-3xl font-bold my-1 ">Create New Receipt</div>
                    <div className="text-md text-gray-500 my-1">Generate a professional receipt for your pharmacy order</div>
                </div>
                {/* the form */}
                <form className="w-full flex flex-col items-center" >

                    {/* select pharmacy */}
                    <div className="bg-white p-3 my-3 rounded-lg lg:w-[70%] flex flex-col items-center cursor-pointer" >

                        {/* header select pharmacy */}
                        <div className="flex flex-col w-full items-start p-1 mb-3 ">
                            <div className="text-3xl font-bold mt-4 ">Pharmacy Information</div>
                            <div className="text-md text-gray-500 mt-1">Select the pharmacy for this receipt</div>
                        </div>

                        {/* select pharmacy and date*/}
                        <div className="flex flex-row w-full items-center">                          
                            <Select className="w-[50%] m-1" >
                                <option value="" className="" >select pharmacy</option>
                                <option value="">select pharmacy</option>
                                <option value="">select pharmacy</option>
                            </Select>  
                            <Input type="date" className="w-[50%] m-1"/>
                        </div>

                        
                    </div>

                    {/* add items  */}
                    <div className="bg-white p-3 my-3 rounded-lg lg:w-[70%] flex flex-col items-center cursor-pointer" >
                        {/* header item section */}
                        <div className="flex flex-row w-full items-center justify-between mb-3">
                            <div className="flex flex-col justify-start">
                                <div className="text-3xl font-bold mt-4 ">Items</div>
                                <div className="text-md text-gray-500 mt-1 ">Add products to this receipt</div>
                            </div>
                            <Button variant="success" >Add Item</Button> 
                        </div>
                        
                        {/* item section */}
                        
                    </div>
                    
                    
                </form>
                
            </div>
        </div>
    );
}
export default CreateReceipt;