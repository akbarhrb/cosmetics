
import { Package, Receipt, Store, BarChart3, Eye } from 'lucide-react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import {Card, CardHeader, CardTitle,CardContent,CardDescription} from '../components/Card';
import Button from '../components/Button';



function Index(){
    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* header with navbar*/}
            <Header />

            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* welcome section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4"> Welcome to Your Cosmetics Business Hub</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Manage your inventory, create professional receipts, and track your sales to pharmacies across your village.</p>
                </div>
                {/* Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    <CardHeader>
                        <CardTitle className="flex items-center"><Receipt className="mr-2 h-5 w-5" />Create New Receipt</CardTitle>
                        <CardDescription className="text-white">Generate a professional receipt for a pharmacy order</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link to="/create-receipt">
                            <Button className='' variant='white' >New Recipe</Button>
                        </Link>
                    </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    <CardHeader>
                        <CardTitle className="flex items-center"><Package className="mr-2 h-5 w-5" />Manage Inventory</CardTitle>
                        <CardDescription className="text-white">Update product quantities and add new items</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link to="/inventory">
                            <Button className='' variant='white'>View Inventory</Button>
                        </Link>
                    </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    <CardHeader>
                        <CardTitle className="flex items-center"><Store className="mr-2 h-5 w-5" />Pharmacy Directory</CardTitle>
                        <CardDescription className="text-white">Manage your pharmacy clients and their information</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link to="/pharmacies">
                            <Button className='' variant='white'>View Pharmacies</Button>
                        </Link>
                    </CardContent>
                    </Card>
                </div>
                
            </main>
               
            

        </div>
        
    );
}
export default Index;