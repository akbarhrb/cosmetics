import Header from "../components/Header";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { MapPin , Phone , Edit , Store } from "lucide-react";
import {Card, CardHeader, CardTitle,CardContent,CardDescription} from '../components/Card';
function Pharmacies(){
     const pharmacies = [
    {
      id: 1,
      name: 'City Central Pharmacy',
      owner: 'Dr. Ahmed Hassan',
      phone: '+961 03 123 467',
      address: 'Chevrolet Main Street, Alfa Building',
      status: 'active',
      totalOrders: 15,
      lastOrder: '2024-01-20'
    },
    {
      id: 2,
      name: 'Village Health Pharmacy',
      owner: 'Mrs. Sarah Johnson',
      phone: '+961 76 123 467',
      address: 'Chiyah, Village Center',
      status: 'active',
      totalOrders: 12,
      lastOrder: '2024-01-18'
    },
    {
      id: 3,
      name: 'Green Cross Pharmacy',
      owner: 'Mr. Mohamed Ali',
      phone: '+961 03 455 467',
      address: 'zalka, KFC North District',
      status: 'active',
      totalOrders: 8,
      lastOrder: '2024-01-15'
    },
    {
      id: 4,
      name: 'Sunset Pharmacy',
      owner: 'Dr. Fatima El-Zahra',
      phone: '+961 70 123 555',
      address: 'jnoub, West Side',
      status: 'inactive',
      totalOrders: 5,
      lastOrder: '2023-12-10'
    }
  ];
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* header and navbar */}
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Pharmacy Directory</h1>
                        <p className="text-gray-600 mt-2">Manage your pharmacy clients and their information</p>
                    </div>
                    <Button className="bg-green-500">Add Pharmacy</Button>
                </div>
                {/* Pharmacies List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pharmacies.map((pharmacy) => (
            <Card key={pharmacy.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-black m-2"> {pharmacy.name}</CardTitle>
                    <CardDescription className="text-gray-600"> Owner: {pharmacy.owner}</CardDescription>
                  </div>
                  
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mt-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{pharmacy.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{pharmacy.address}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Total Orders:</span>
                        <div className="font-semibold text-gray-900">{pharmacy.totalOrders}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Last Order:</span>
                        <div className="font-semibold text-gray-900">{pharmacy.lastOrder}</div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3">
                    <Button variant="outline" className="w-full">
                      <Link to={`/create-receipt?pharmacy=${pharmacy.id}`} className="flex items-center justify-center w-full">
                        Create Receipt
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
            </main>
        </div>
        
    );
}
export default Pharmacies;