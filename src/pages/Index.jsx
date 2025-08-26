
import { Package, Receipt, Store, BarChart3, Eye } from 'lucide-react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import {Card, CardHeader, CardTitle,CardContent,CardDescription, CardButton} from '../components/Card';
import Button from '../components/Button';



function Index(){
    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* header with navbar*/}
            <Header />

            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* welcome section */}
                <div className="text-center mb-12">
                    <h2 className="text-lg sm:text-lg md:text-2xl lg:text-4xl font-bold text-gray-900 mb-4"> Welcome to Your Cosmetics Business Hub</h2>
                    <p className="text-md sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto">Manage your inventory, create professional receipts, and track your sales to pharmacies across your village.</p>
                    <Link to="/report"><p className="text-md sm:text-lg md:text-xl lg:text-2xl text-blue-600 max-w-2xl mx-auto mt-2 cursor-pointer hover:scale-110 duration-75 underline">MY REPORT</p></Link>
                </div>
                {/* Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white ">
                    <CardHeader>
                        <CardTitle className="flex items-center"><Receipt className="mr-2 h-5 w-5" />Create New Receipt</CardTitle>
                        <CardDescription className="">Generate a professional receipt for a pharmacy order</CardDescription>
                    </CardHeader>
                    <Link to="/create-receipt">
                        <CardButton variant="white" >New Recipe</CardButton>
                    </Link>
                    </Card>

                    <Card className="bg-gradient-to-b from-green-500 to-green-700 text-white ">
                    <CardHeader>
                        <CardTitle className="flex items-center"><Package className="mr-2 h-5 w-5" />Manage Inventory</CardTitle>
                        <CardDescription className="">Update product quantities and add new items</CardDescription>
                    </CardHeader>
                    <Link to="/inventory">
                        <CardButton variant="white">View Inventory</CardButton>
                    </Link>
                    </Card>

                    <Card className="bg-gradient-to-bl from-blue-700 via-blue-600 to-blue-500 text-white">
                    <CardHeader>
                        <CardTitle className="flex items-center"><Store className="mr-2 h-5 w-5" />Pharmacy Directory</CardTitle>
                        <CardDescription className="">Manage your pharmacy clients and their information</CardDescription>
                    </CardHeader>
                    <Link to="/pharmacies">
                        <CardButton variant="white">View Pharmacies</CardButton>
                    </Link>
                    </Card>
                </div>
                
            </main>
               
            

        </div>
        
    );
}
export default Index;