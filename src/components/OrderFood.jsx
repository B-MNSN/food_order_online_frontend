import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';
import dietImage from '../assets/diet.svg';
import orderHiImage from '../assets/order-history.svg';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

import { FaLocationDot } from "react-icons/fa6";

function OrderFood({ eventKey, page }) {
    const handleAlert = () => {
        Swal.fire({
            title: "สั่งซื้อรายการอาหารของคุณเรียบร้อย",
            icon: "success",
            confirmButtonText: "Confirm",
        });
    };

    return (
        <Accordion>
            <Accordion.Item eventKey={eventKey}>
                <Accordion.Header>
                    <div className='d-flex align-items-center justify-content-between w-100'>
                        <div className='accordion-title'>
                            <div className='box-icon'>
                                <Image src={page === 'cart' ? dietImage : orderHiImage} fluid />
                            </div>
                            <div className='lh-base'>
                                <span>21 ก.ย. 67 | 20:00</span>
                                <h3>Restaurant Name</h3>
                                <span className='d-flex align-items-center'><FaLocationDot size={25} />Location</span>
                            </div>
                        </div>
                        <span className='fs-2 fw-bold'>120฿</span>
                    </div>
                </Accordion.Header>

                <Accordion.Body className='box-list-menu'>
                    <h3>เมนู</h3>
                    <ul>
                        <li>
                            <span>รายการที่1 x1</span>
                            <span>50฿</span>
                        </li>
                        <li>
                            <span>รายการที่2 x1</span>
                            <span>50฿</span>
                        </li>

                    </ul>
                    <hr />
                    <ul>
                        <li>
                            <span>ค่าอาหาร</span>
                            <span>100฿</span>
                        </li>
                        <li>
                            <span>ค่าจัดส่ง</span>
                            <span>20฿</span>
                        </li>
                        <li className='order-price-total'>
                            <span>รวมทั้งหมด</span>
                            <span>120฿</span>
                        </li>
                    </ul>
                    {page === 'cart' ?
                        <div className='d-flex justify-content-end mt-4'>
                            <Button variant="dark" onClick={() => handleAlert()}>confirm order</Button>
                        </div>
                        :
                        ''
                    }
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default OrderFood;