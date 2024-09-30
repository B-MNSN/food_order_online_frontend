import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import defaultImage from '../assets/default_image.jpg';
import { TiPlus } from "react-icons/ti";
import { TiMinus } from "react-icons/ti";
import { MdAddShoppingCart } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import ModalFormFood from './ModalFormFood';
import Swal from 'sweetalert2';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


import '../sass/foodMenu.scss'


function FoodMenu({ type, restaurantId }) {
    const [foodMenuData, setFoodMenuData] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedFoodId, setSelectedFoodId] = useState(null); 
    const token = sessionStorage.getItem('token'); 
    let userId = '';
    if (token) {
        const decoded = jwtDecode(token);
        userId = decoded.id;
    }
    
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:3000/foodMenu/restaurant/${restaurantId}`);
                if (response.status === 200) {
                    console.log(response.data);
                    setFoodMenuData(response.data);
                    setQuantities(new Array(response.data.length).fill(1));
                }
    
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();

    }, [restaurantId]);


    const handleQuantityChange = (index, delta) => {
        setQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];
            newQuantities[index] = Math.max(1, newQuantities[index] + delta);
            return newQuantities;
        });
    };

    const handleDeleteFood = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/foodMenu/delete/${id}`);
            if (response.status === 200) {
                setFoodMenuData((prevData) => prevData.filter((item) => item.id !== id));
                Swal.fire({
                    title: response?.data?.message,
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
        } catch (err) {
            Swal.fire({
                title: 'Failed to deleted food item',
                icon: 'error',
                confirmButtonText: "OK",
            });
        }
    };

    const handleAddToCart = async (qtyIndex, foodItem) => {
        if (token) {
            try {
                const response = await axios.post('http://localhost:3000/orderFoods/add', {
                    quantity: quantities[qtyIndex],
                    status: 'pending',
                    userId: userId,
                    restaurantId: restaurantId,
                    foodMenuId: foodItem.id
                });
    
                if (response.status === 200) {
                    Swal.fire({
                        title: `คำสั่งซื้อ ${foodItem.food_name} ถูกเพิ่มลงในตระกร้า`,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                }
        
               
            } catch (error) {
                console.log(error);
                const errorMsg = error.response?.data?.message || 'Failed add to cart';
                Swal.fire({
                    title: errorMsg,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } else {
            Swal.fire({
                title: `คุณต้องเข้าสู่ระบบก่อน`,
                icon: 'warning',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/auth';
                }
            });
        }
        
    };

    const handleAlert = (id, foodName) => {
        Swal.fire({
            title: `คุณต้องการลบ ${foodName} หรือไม่`,
            icon: "warning",
            confirmButtonText: "Confirm",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteFood(id);
            }
        });
    };

    const handleEditClick = (foodId) => {
        setSelectedFoodId(foodId);
        setModalShow(true);
    };

    const updateFoodItem = (updatedFood) => {
        setFoodMenuData((prevData) =>
            prevData.map((item) =>
                item.id === updatedFood.id ? updatedFood : item
            )
        );
    };

    return (
        <>
            <div className='box-list-food'>
                {foodMenuData.map((item, index) => (
                    <div className='list-food' key={item.id}>
                        <div className='item-food'>
                            <div className='box-thumbnail-name'>
                                <div className='box-img-food'>
                                    <Image src={item.food_picture ? `http://localhost:3000/uploads/${item.food_picture}` : defaultImage} fluid />
                                </div>
                                <span>{item.food_name}</span>
                            </div>

                            {type !== "admin" ?
                                <div className='box-action-list'>
                                    <span>{item.food_price * quantities[index]}฿</span>
                                    <div className='box-qty-food'>
                                        <Button
                                            variant="dark"
                                            onClick={() => handleQuantityChange(index, -1)}
                                            disabled={quantities[index] === 1}
                                        >
                                            <TiMinus />
                                        </Button>
                                        <span>{quantities[index]}</span>
                                        <Button variant="dark" onClick={() => handleQuantityChange(index, 1)}><TiPlus /></Button>
                                    </div>
                                    <Button variant="dark" onClick={() => handleAddToCart(index, item)}><MdAddShoppingCart className='me-2'/>Add to cart</Button>
                                </div>
                                : 
                                <div className='box-action-list'>
                                    <span>สถานะ</span>
                                    <div className="vr"></div>
                                    <div className='d-flex align-items-center'>
                                        <FiEdit size={20} className='me-4' onClick={() => handleEditClick(item.id)}/>
                                        <MdDelete size={25}  onClick={() => handleAlert(item.id, item.food_name)}/>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                ))}
            </div>
            <ModalFormFood show={modalShow} onHide={() => setModalShow(false)} foodId={selectedFoodId} type={'edit'} updateFoodItem={updateFoodItem}/>
        </>
    );
}

export default FoodMenu;