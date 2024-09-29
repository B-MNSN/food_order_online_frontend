import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';
import dietImage from '../assets/diet.svg';
import orderHiImage from '../assets/order-history.svg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { FaLocationDot } from "react-icons/fa6";

function OrderFood({ eventKey, page }) {
    const [orderCart, setOrderCart] = useState([]);
    const [orderStatus, setOrderStatus] = useState('');
    const token = sessionStorage.getItem('token');
    let userId = '';
    let restaurantId = '';
    if (token) {
        const decoded = jwtDecode(token);
        restaurantId = decoded.restaurant;
        userId = decoded.id;
    }

    const handleAlert = () => {
        Swal.fire({
            title: "สั่งซื้อรายการอาหารของคุณเรียบร้อย",
            icon: "success",
            confirmButtonText: "Confirm",
        });
    };
    useEffect(() => {
        async function fetchData(status, restaurantId) {
            let urlFetchData = '';
            if (restaurantId) {
                urlFetchData = `http://localhost:3000/orderFoods/orders?restaurantId=${restaurantId}&role=admin`;
            } else {
                urlFetchData = `http://localhost:3000/orderFoods/orders?userId=${userId}&status=${status}`;
            }
            try {
                const response = await axios.get(urlFetchData);
                if (response.status === 200) {
                    setOrderStatus(response?.data[0]?.status);
                    setOrderCart(response?.data || []);
                }

            } catch (err) {
                console.log(err);
                setOrderCart([]);
            }
        }

        if (userId) {
            if (page === 'cart') {
                fetchData('pending');
            } else if (page === 'history') {
                fetchData('all');
            } else if (page === 'admin_orderfood') {
                fetchData('ordered', restaurantId);
            }
        }

    }, [userId]);

    const groupedOrders = orderCart.reduce((group, order) => {
        const { restaurant_id, restaurant_name, user_id, username } = order;
    
        const groupKey = (page === 'admin_orderfood') ? user_id : restaurant_id;
    
        if (!group[groupKey]) {
            group[groupKey] = { name: (page === 'admin_orderfood') ? username : restaurant_name, orders: [] };
        }
        group[groupKey].orders.push(order);

        return group;
    }, {});

    const handleConfirmOrder = async (restaurantId) => {
        try {
            const response = await axios.put(`http://localhost:3000/orderFoods/updateStatus`, {
                userId,
                restaurantId,
                status: 'ordered'
            });

            if (response.status === 200) {
                setOrderCart(prevOrders => prevOrders.filter(order => order.restaurant_id !== restaurantId && order.status === 'ordered'));
                handleAlert();

            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const statusMap = {
        'success': 'ทำอาหารเสร็จเรียบร้อย',
        'cancel': 'ยกเลิกคำสั่งซื้อ',
    };

    const handleChangeOrderStatus = async (customerId, status) => {
        try {
            const response = await axios.put(`http://localhost:3000/orderFoods/updateStatus?role=admin`, {
                userId: customerId,
                restaurantId: restaurantId,
                status: status
            });

            if (response.status === 200) {
                Swal.fire({
                    title: "สถานะการสั่งซื้อถูกอัปเดตแล้ว",
                    icon: "success",
                    confirmButtonText: "Confirm",
                });
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            Swal.fire({
                title: "Error updating order status",
                icon: "error",
                confirmButtonText: "Confirm",
            });
        }
    };

    const handChange = (customerId) => (event) => {
        const newStatus = event.target.value;
        setOrderStatus(newStatus);
        handleChangeOrderStatus(customerId, newStatus);
    };


    return (
        <Accordion>
            {Object.keys(groupedOrders).map((groupKey, index) => {
                const { name, orders } = groupedOrders[groupKey] || { name: '', orders: [] };
                const totalFoodPrice = orders.reduce((total, item) => total + item.food_price * item.quantity, 0);
                const deliveryFee = 20;
                const totalPrice = totalFoodPrice + deliveryFee;

                return (
                    <Accordion.Item eventKey={`${eventKey}-${index}`} key={index}>
                        <Accordion.Header>
                            <div className='d-flex align-items-center justify-content-between w-100'>
                                <div className='accordion-title'>
                                    <div className='box-icon'>
                                        <Image src={page === 'cart' ? dietImage : orderHiImage} fluid />
                                    </div>
                                    <div className='lh-base'>
                                        <span>21 ก.ย. 67 | 20:00</span>
                                        <h3>{name}</h3>
                                        <span className='d-flex align-items-center'><FaLocationDot size={25} />Location</span>
                                    </div>
                                </div>
                                <div className='box-status-price'>
                                    <span className='text-status'>{statusMap[orderStatus] || 'กำลังสั่งซื้อ'}</span>
                                    <div className="vr"></div>
                                    <span className='fs-2 fw-bold'>{totalPrice}฿</span>
                                </div>
                            </div>
                        </Accordion.Header>

                        <Accordion.Body className='box-list-menu'>
                            <h3>เมนู</h3>
                            <ul>
                                {orders.map((order, orderIndex) => (
                                    <li key={orderIndex}>
                                        <span>{order.food_name} x{order.quantity}</span>
                                        <span>{order.food_price * order.quantity}฿</span>
                                    </li>
                                ))}
                            </ul>
                            <hr />
                            <ul>
                                <li>
                                    <span>ค่าอาหาร</span>
                                    <span>{totalFoodPrice}฿</span>
                                </li>
                                <li>
                                    <span>ค่าจัดส่ง</span>
                                    <span>{deliveryFee}฿</span>
                                </li>
                                <li className='order-price-total'>
                                    <span>รวมทั้งหมด</span>
                                    <span>{totalPrice}฿</span>
                                </li>
                            </ul>
                            {page === 'cart' ? (
                                <div className='d-flex justify-content-end mt-4'>
                                    <Button variant="dark" onClick={() => handleConfirmOrder(restaurantId)}>
                                        Confirm Order
                                    </Button>
                                </div>
                            ) : page === 'admin_orderfood' ? (
                                <>
                                    <hr />
                                    <div className='d-flex justify-content-between align-items-center box-status-order'>
                                        <span>สถานะการสั่งซื้อ</span>
                                        <Form.Select aria-label="สถานะการสั่งซื้อ" onChange={handChange(groupKey)}>
                                            <option >เลือกสถานะการสั่งซื้อ</option>
                                            <option value="success">ทำอาหารเสร็จเรียบร้อบ</option>
                                            <option value="cancel">ยกเลิกคำสั่งซื้อ</option>
                                        </Form.Select>
                                    </div>
                                </>

                            ) : (
                                ''
                            )

                            }
                        </Accordion.Body>
                    </Accordion.Item>
                );
            })}
        </Accordion>
    );
}

export default OrderFood;