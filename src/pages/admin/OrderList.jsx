import Navbars from '../../components/Navbar';
import OrderFood from '../../components/OrderFood';
import { useState } from 'react';
import { FaListCheck } from "react-icons/fa6";

function OrderList() {
    const [eventKey, setEventKey] = useState(0);
    
    return (
        <>
            <Navbars />
            <div className='d-flex align-items-center mt-5 mb-4'>
                <FaListCheck size={40} className='me-3'/>
                <h1>Order Lists</h1>
            </div>
            <OrderFood eventKey={eventKey} page={'admin_orderfood'}/>

        </>
    );
}

export default OrderList;