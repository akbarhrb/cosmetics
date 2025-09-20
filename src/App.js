import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import Inventory from './pages/Inventory';
import Pharmacies from './pages/Pharmacies';
import Receipts from './pages/Receipts';
import CreateReceipt from './pages/CreateReceipt';
import NotFound from './pages/NotFound';
import ReceiptDetails from './pages/ReceiptDetails';
import Report from './pages/Report';
import Categories from './pages/Categories';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/report" element={<Report />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path='/categories' element={<Categories />} />
        <Route path="/pharmacies" element={<Pharmacies />} />
        <Route path="/create-receipt" element={<CreateReceipt />} />
        <Route path="/receipts" element={<Receipts />} />
        <Route path="/receipt/:id" element={<ReceiptDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </>

    
  );
}

export default App;
