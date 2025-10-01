import Header from "../components/Header";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import { CalendarIcon, Package, Receipt, Store, DollarSign, TrendingUp, FileText } from 'lucide-react';
import Button from "../components/Button";
import Input from "../components/Input";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";


function Report(){
    const baseUrl = process.env.REACT_APP_API_URL;
    const [loading, setLoading] = useState(false);

    const today = new Date().toISOString().split("T")[0];
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];

    const [from_date, set_from_date] = useState(firstDayOfMonth);
    const [to_date, set_to_date] = useState(today);

    const [items , setItems] = useState(0);
    const [pharmacies , setPharmacies] = useState(0);
    const [receipts_total , set_receipts_total] = useState(0);
    const [receipts_count , set_receipts_count] = useState(0);
    const [total_cost , set_total_cost] = useState(0);

    async function getReport(){
        setLoading(true);
        const data = {
            'from_date' : from_date,
            'to_date' : to_date
        };
        try{
            console.log(data);
            const response = await axios.post(`${baseUrl}/report` , data);
            console.log(response);
            setPharmacies(response.data.pharmacies.length);
            setItems(response.data.items.length);
            set_receipts_total(response.data.receipts_total);
            set_receipts_count(response.data.receipts_count);
            set_total_cost(response.data.total_cost);
        }catch(e){
            toast.error(`${e}`);
            console.log(e);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        getReport();
    },[]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* header with navbar*/}
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8 text-center">
                <h2 className="lg:text-3xl text-lg font-bold text-gray-900 mb-2">Business Reports</h2>
                <p className="text-gray-600 lg:text-lg text-sm">Track your business performance and analyze sales data</p>
                </div>

                {/* Date Range Filter */}
                <Card className="mb-8 bg-white shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center lg:text-3xl text-lg">
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    Date Range
                    </CardTitle>
                    <p className="text-black lg:text-lg text-sm" >Select date range to filter reports</p>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">From Date</label>
                        <Input type="date" value={from_date} onChange={(e)=>set_from_date(e.target.value)} />
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">To Date</label>
                        <Input type="date" value={to_date} onChange={(e)=>set_to_date(e.target.value)} />
                    </div>
                    
                    <div className="flex items-end justify-center">
                        {
                            loading ? 
                        <Button className="bg-blue-900 hover:bg-blue-950 cursor-wait">
                            Generating...
                        </Button>
                        :
                        <Button className="bg-blue-600 hover:bg-blue-700" onClick={()=>getReport()}>
                        Generate Report
                        </Button>
                        }
                    </div>
                    </div>
                </CardContent>
                </Card>

                {/* Key Metrics */}
                {
                    loading ? <Spinner /> : 
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">${receipts_total - total_cost}</div>
                    <p className="text-xs text-green-100 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                         from last period
                    </p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Receipts</CardTitle>
                    <Receipt className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{receipts_count}</div>
                    <p className="text-xs text-blue-100">Receipts created</p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Receipts Total</CardTitle>
                    <FileText className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">${receipts_total}</div>
                    <p className="text-xs text-purple-100">Total receipts value</p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Pharmacies</CardTitle>
                    <Store className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{pharmacies}</div>
                    <p className="text-xs text-orange-100">Active clients</p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Inventory Items</CardTitle>
                    <Package className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{items}</div>
                    <p className="text-xs text-teal-100">Products in stock</p>
                    </CardContent>
                </Card>
                </div>
                }
            </main>
        </div>

    );
}
export default Report;