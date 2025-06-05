import { Link } from 'react-router-dom';
import { Package, Receipt, Store, BarChart3, Plus, Eye } from 'lucide-react';
function Header(){
    return(
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/">
                        <div className="flex items-center">
                            <Package className="h-8 w-8 text-blue-600 mr-3" />
                            <h1 className="text-xs sm:text-sm md:text-md lg:text-lg  font-bold text-blue-600">MSH Cosmetics</h1>
                        </div>
                    </Link>
                    
                    <nav className="flex space-x-4">
                        <Link to="/inventory" className="text-gray-600 hover:text-blue-600 px-1 py-2 rounded-md text-xs sm:text-sm md:text-md lg:text-lg">Inventory</Link>
                        <Link to="/pharmacies" className="text-gray-600 hover:text-blue-600 px-1 py-2 rounded-md text-xs sm:text-sm md:text-md lg:text-lg">Pharmacies</Link>
                        <Link to="/receipts" className="text-gray-600 hover:text-blue-600 px-1 py-2 rounded-md text-xs sm:text-sm md:text-md lg:text-lg">Receipts</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
export default Header;