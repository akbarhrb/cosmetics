import Button from "../components/Button";
import Header from "../components/Header";
import Select from "react-select";
import { useRef } from "react";
function Receipts(){
    const receiptRef = useRef();
    function print(){
        document.body.innerHTML = receiptRef.current.innerHTML;
        document.title = 'RECEIPT';
        window.print();
        window.location.reload();   
    }
    const options = [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* header and navbar */}
            <Header />
            <Select options={options} />    
            <div ref={receiptRef} className="flex flex-col items-center w-full bg-white p-5 m-5 rounded-lg">
                <div className="flex flex-col items-center w-full">
                    <div className="text-3xl my-3 text-blue-600 ">MSH Cosmetics</div>
                    <Button onClick={print} className="w-full" >PRINT</Button>
                </div>
            </div>
        </div>
    );
}
export default Receipts;