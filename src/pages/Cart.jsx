import Navbars from '../components/Navbar';
import OrderFood from '../components/OrderFood';
import { FaCartShopping } from "react-icons/fa6";
import { useState } from 'react';

function Cart() {
    const [eventKey, setEventKey] = useState(0);
    
    return (
        <>
            <Navbars />
            <div className='d-flex align-items-center mt-5 mb-4'>
                <FaCartShopping size={40} className='me-3'/>
                <h1>Order Cart</h1>
            </div>
            <OrderFood eventKey={eventKey} page={'cart'}/>

        </>
    );
}

export default Cart;