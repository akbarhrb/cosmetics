import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import {  useState } from "react";
import { Link } from "react-router-dom";
import { MapPin , Phone , Edit  } from "lucide-react";
import {Card, CardHeader, CardTitle, CardContent ,CardDescription} from '../components/Card';
function Pharmacies(){
    const [showForm, setShowForm] = useState(false);
    const [updateForm , setUpdateForm] = useState(false);

    const toggleForm = () => {
      setUpdateForm(false);
      setShowForm((prev) => !prev);
      
    };
    const [pharmacyName , setName] = useState('');
    const [owner , setOwner] = useState('');
    const [phoneNumber , setPhoneNumber] = useState('');
    const [address , setAddress] = useState('');
    const [pharmacies , setPharmacies] = useState([
    {
      id: 1,
      name: 'City Central Pharmacy',
      owner: 'Dr. Ahmed Hassan',
      phoneNumber: '96103123467',
      address: 'Chevrolet Main Street, Alfa Building',
      status: 'active',
      totalOrders: 15,
      lastOrder: '2024-01-20'
    },
    {
      id: 2,
      name: 'Village Health Pharmacy',
      owner: 'Mrs. Sarah Johnson',
      phoneNumber: '96176123467',
      address: 'Chiyah, Village Center',
      status: 'active',
      totalOrders: 12,
      lastOrder: '2024-01-18'
    },
    {
      id: 3,
      name: 'Green Cross Pharmacy',
      owner: 'Mr. Mohamed Ali',
      phoneNumber: '96103455467',
      address: 'zalka, KFC North District',
      status: 'active',
      totalOrders: 8,
      lastOrder: '2024-01-15'
    },
    {
      id: 4,
      name: 'Sunset Pharmacy',
      owner: 'Dr. Fatima El-Zahra',
      phoneNumber: '96170123555',
      address: 'jnoub, West Side',
      status: 'inactive',
      totalOrders: 5,
      lastOrder: '2023-12-10'
    }
  ]);
    
    let [id , setId] = useState(4);
    

    function addPharmacy(e){
      e.preventDefault();
      
      setId(id +1);
      const newPharmacy = {
        'id': id,
        'name' : pharmacyName,
        'owner' : owner,
        'phoneNumber' : phoneNumber,
        'address' : address,
        'status' : 'active',
        'totalOrders' : 0,
        'lastOrder' : '00-00-0000'
      };
      setPharmacies([...pharmacies,newPharmacy]);
      setName('');
      setOwner('');
      setPhoneNumber('');
      setAddress('');
    }
    //edit function
    let [idToUpdate , setIdToUpdate] = useState(null);
    function EditPharmacy(id){
      console.log(id);
      setShowForm(true);
      setUpdateForm(true);
      let pharmacy = {};
      for(let i=0 ; i< pharmacies.length ; i++){
        if(pharmacies[i].id === id){
          pharmacy = pharmacies[i];
        }
      }
      setIdToUpdate(pharmacy.id);
      setName(pharmacy.name);
      setOwner(pharmacy.owner);
      setPhoneNumber(pharmacy.phoneNumber);
      setAddress(pharmacy.address);
      
      
    }
    function updatePharmacy(e){
      e.preventDefault();
      const updatedPharmacies = pharmacies.map(p=>{
        if(p.id === idToUpdate){
          return {
            ...p,
            name : pharmacyName,
            owner: owner,
            phoneNumber : phoneNumber,
            address : address
          };
          
        }
        return p;
      });
      setPharmacies(updatedPharmacies);
      setUpdateForm(false);
      setShowForm(false);
      setIdToUpdate(null);
      setName('');
      setOwner('');
      setPhoneNumber();
      setAddress('');
    }
    
    
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
                    <Button className="" variant="success" onClick={toggleForm}>{showForm ? "Cancel" : "Add Pharmacy" }</Button>
                </div>
              {/* show form*/}
              {showForm && (
                <form className="mt-6 mb-6 space-y-4 p-4 border rounded-lg bg-white shadow-md transition-all duration-300 ease-in-out opacity-100 scale-100 animate-fade-in">
                  <div>
                    <label className="block mb-1 text-gray-700">Pharmacy Name</label>
                    <Input type="text" value={pharmacyName} onChange={(e)=>setName(e.target.value)} placeholder="Enter pharmacy name" className="w-full"/>
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Owner</label>
                    <Input type="text" value={owner} onChange={(e)=>setOwner(e.target.value)} placeholder="Enter owner name" className="w-full"/>
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Phone Number</label>
                    <Input type="number" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} className="w-full" placeholder="Enter phone number" />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Address</label>
                    <Input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} className="w-full" placeholder="Enter address..."/>
                  </div>

                  <Button type="submit" onClick={(e)=> {updateForm? updatePharmacy(e): addPharmacy(e)} } variant="success" className="w-[100%]" >{updateForm ? "Update" : "Submit"}</Button>
                </form>
              )}
              {/* Pharmacies List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pharmacies.map((pharmacy) => (
            <Card key={pharmacy.id} className="">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-black m-2"> {pharmacy.name}</CardTitle>
                    <CardDescription className="text-gray-600"> Owner: {pharmacy.owner}</CardDescription>
                  </div>
                  
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mt-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{pharmacy.phoneNumber}</span>
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
                  <div className="pt-3 flex flex-row">
                    <Button variant="outline" className="w-full">
                      <Link to={`/create-receipt?pharmacy=${pharmacy.id}`} className="flex items-center justify-center w-full">
                        Create Receipt
                      </Link>
                    </Button>
                    
                    <Edit onClick={()=> EditPharmacy(pharmacy.id)} className="w-fit h-full p-3 text-white bg-green-500 rounded-xl mx-2 hover:bg-green-600 transition-all ease-in cursor-pointer "/>
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