import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import Inventory from './pages/Inventory';
import Pharmacies from './pages/Pharmacies';
import Receipts from './pages/Receipts';
import CreateReceipt from './pages/CreateReceipt';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/pharmacies" element={<Pharmacies />} />
        <Route path="/create-receipt" element={<CreateReceipt />} />
        <Route path="/receipts" element={<Receipts />} />
        <Route path="*" element={<NotFound />} />


      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
