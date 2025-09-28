import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import dayjs from 'dayjs';
import { MapPin , Phone , Edit  } from "lucide-react";
import {Card, CardHeader, CardTitle, CardContent ,CardDescription} from '../components/Card';
import { toast } from "react-toastify";
import SelectComp from '../components/SelectComp';

function Pharmacies(){
    const baseUrl = process.env.REACT_APP_API_URL;
    const [showForm, setShowForm] = useState(false);
    const [updateForm , setUpdateForm] = useState(false);
    const [loading , setLoading] = useState(false);

    const toggleForm = () => {
      setUpdateForm(false);
      setShowForm((prev) => !prev);
      
    };
    const [pharmacy_name , set_pharmacy_name] = useState('');
    const [owner , setOwner] = useState('');
    const [phoneNumber , setPhoneNumber] = useState('');
    const [address , setAddress] = useState('');
    const [status, set_status] = useState('opened');
    const [pharmacies , setPharmacies] = useState([]);
    
    async function getPharmacies(){
      setLoading(true);
      try{
        const response = await axios.get(`${baseUrl}/pharmacies`);
        setPharmacies(response.data.data);  
        toast.success('Pharmacies Loaded Successfully')
        console.log(response.data.data);
      }catch(e){
        console.error(e);
        toast.error('NETWORK ERROR' . e)
      }finally{
        setLoading(false);
      }
    }
    useEffect(()=>{
      getPharmacies();
    }, []);

    async function addPharmacy(e) {
      setLoading(true);
  e.preventDefault();

  // Trim input values to avoid spaces-only inputs
  const trimmedName = pharmacy_name?.trim();
  const trimmedOwner = owner?.trim();
  const trimmedPhone = phoneNumber?.trim();
  const trimmedAddress = address?.trim();

  if (trimmedName && trimmedOwner && trimmedPhone && trimmedAddress) {
    const newPharmacy = {
      pharmacy_name: trimmedName,
      pharmacy_owner: trimmedOwner,
      phone_number: trimmedPhone,
      address: trimmedAddress
    };

    try {
      const response = await axios.post(`${baseUrl}/add-pharmacy`, newPharmacy);

      // Assuming the backend returns 201 on success
      if (response.status === 201) {
        getPharmacies();
        set_pharmacy_name('');
        setOwner('');
        setPhoneNumber('');
        setAddress('');
        toast.success('Pharmacy Added Successfully')
        setShowForm(false);
      } else {
        toast.error('NETWORK ERROR' . response.data.error)
      }
    } catch (error) {
      toast.error('NETWORK ERROR' . error)
    }finally{
      setLoading(false);
    }
  } else {
    alert("Please fill in all fields.");
  }
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
      set_pharmacy_name(pharmacy.pharmacy_name);
      setOwner(pharmacy.pharmacy_owner);
      setPhoneNumber(pharmacy.phone_number);
      setAddress(pharmacy.address);
      set_status(pharmacy.status);
    }
    async function updatePharmacy(e){
      e.preventDefault();
      try{
        const data = {
          'pharmacy_name': pharmacy_name,
          'pharmacy_owner': owner,
          'phone_number': phoneNumber,
          'address' : address ,
          'status' : status
        }
        console.log(data)
        const response = await axios.put(`${baseUrl}/update-pharmacy/${idToUpdate}` , data);
        if(response.status === 200){
          toast.success(`Pharmacy ${pharmacy_name} updated successfully`);
          getPharmacies();
        }else{
          console.log(response);
          toast.error(`NETWORK ERROR ${response.data.error}`);
        }

      }catch(e){
        console.log(e);
        toast.error(`NETWORK ERROR ${e}`);
      }

      setUpdateForm(false);
      setShowForm(false);
      setIdToUpdate(null);
      set_pharmacy_name('');
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
                    <div className="w-[70%]" >
                        <h1 className="text-md sm:text-lg md:text-2xl lg:text-3xl font-bold text-gray-900">Pharmacy Directory</h1>
                        <p className="text-sm lg:text-md text-gray-600 mt-2 mr-3">Manage your pharmacy clients and their information</p>
                    </div>
                    <button className="bg-green-600 text-white hover:bg-green-700 rounded-lg py-2 text-xs sm:text-sm md:text-md lg:text-lg px-2 lg:px-6" variant="success" onClick={toggleForm}>{showForm ? "Cancel" : "Add Pharmacy" }</button>
                </div>
              {/* show form*/}
              {showForm && (
                <form className="mt-6 mb-6 space-y-4 p-4 border rounded-lg bg-white shadow-md transition-all duration-300 ease-in-out opacity-100 scale-100 animate-fade-in">
                  <div>
                    <label className="block mb-1 text-gray-700">Pharmacy Name</label>
                    <Input type="text" value={pharmacy_name} onChange={(e)=>set_pharmacy_name(e.target.value)} placeholder="Enter pharmacy name" className="w-full"/>
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
                  <div>
                    <label className="block mb-1 text-gray-700">Pharmacy Status</label>
                    <SelectComp name="" id="" value={status} onChange={(e)=>set_status(e.target.value)}>
                      <option value="opened">opened</option>
                      <option value="closed">closed</option>
                    </SelectComp>
                  </div>

                  {
                    loading ?
                    <Button variant="success" className="w-[100%]" >Submitting...</Button>:
                    <Button type="submit" onClick={(e)=> {updateForm? updatePharmacy(e): addPharmacy(e)} } variant="success" className="w-[100%]" >{updateForm ? "Update" : "Submit"}</Button>
                  }
                </form>
              )}
              {/* Pharmacies List */}
              {loading && 
                    (
                        <div className="flex justify-center items-center h-32">
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )
                }
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pharmacies.map((pharmacy) => (
            <Card key={pharmacy.id} className="">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-black m-2"> {pharmacy.pharmacy_name}</CardTitle>
                    <CardDescription className="text-gray-600"> Owner: {pharmacy.pharmacy_owner}</CardDescription>
                  </div>
                  
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mt-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{pharmacy.phone_number}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{pharmacy.address}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Total Orders:</span>
                        <div className="font-semibold text-gray-900">{pharmacy.total_orders}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Last Order:</span>
                        <div className="font-semibold text-gray-900">{dayjs(pharmacy.last_order_date).format('DD-MM-YYYY') === "Invalid Date" ?  "No Orders Yet" : dayjs(pharmacy.last_order_date).format('DD-MM-YYYY')}</div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 flex flex-row">
                    {
                      pharmacy.status === 'closed' ? <Button variant="danger" className="bg-red-600 rounded-lg text-white text-center text-sm lg:text-lg">closed</Button> :
                    
                      <Button variant="outline" className="w-full">
                        <Link to={`/create-receipt?pharmacy_id=${pharmacy.id}`} className="flex items-center justify-center w-full">
                          Create Receipt
                        </Link>
                      </Button>
                    }
                    
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