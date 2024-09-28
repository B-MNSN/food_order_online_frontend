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

import '../sass/foodMenu.scss'


function FoodMenu({ type, restaurantId }) {
    const [foodMenuData, setFoodMenuData] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:3000/foodMenu/${restaurantId}`);
                if (response.status === 200) {
                    setFoodMenuData(response.data);
                    setQuantities(new Array(response.data.length).fill(1));
                }
    
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();

    }, []);


    const handleQuantityChange = (index, delta) => {
        setQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];
            newQuantities[index] = Math.max(1, newQuantities[index] + delta);
            return newQuantities;
        });
    };
    
    const handleAlert = () => {
        Swal.fire({
            title: "คุณต้องการลบ “ชื่อเมนู” หรือไม่",
            icon: "warning",
            confirmButtonText: "Confirm",
            showCancelButton: true,
        });
    };

    return (
        <>
            <div className='box-list-food'>
                {foodMenuData.map((item, index) => (
                    <div className='list-food' key={item.id}>
                        <div className='item-food'>
                            <div className='box-thumbnail-name'>
                                <div className='box-img-food'>
                                    <Image src={item.food_picture ? item.food_picture : defaultImage} fluid />
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
                                    <Button variant="dark"><MdAddShoppingCart className='me-2'/>Add to cart</Button>
                                </div>
                                : 
                                <div className='box-action-list'>
                                    <span>สถานะ</span>
                                    <div className="vr"></div>
                                    <div className='d-flex align-items-center'>
                                        <FiEdit size={20} className='me-4' onClick={() => setModalShow(true)}/>
                                        <MdDelete size={25}  onClick={() => handleAlert()}/>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                ))}
            </div>
            <ModalFormFood show={modalShow} onHide={() => setModalShow(false)} type={'edit'}/>
        </>
    );
}

export default FoodMenu;