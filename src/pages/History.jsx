import Navbars from '../components/Navbar';
import OrderFood from '../components/OrderFood';
import { MdHistory } from "react-icons/md";
import { useState } from 'react';

function History() {
    const [eventKey, setEventKey] = useState(0);
    
    return (
        <>
            <Navbars />
            <div className='d-flex align-items-center mt-5 mb-4'>
                <MdHistory size={60} className='me-3'/>
                <h1>Order History</h1>
            </div>
            <OrderFood eventKey={eventKey} page={'history'}/>

        </>
    );
}

export default History;