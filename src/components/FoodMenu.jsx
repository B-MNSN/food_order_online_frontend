import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import defaultImage from '../assets/default_image.jpg';
import { TiPlus } from "react-icons/ti";
import { TiMinus } from "react-icons/ti";
import { MdAddShoppingCart } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import ModalFormFood from './ModalFormFood';


import '../sass/foodMenu.scss'


function FoodMenu({ type }) {
    const [quantities, setQuantities] = useState(Array(3).fill(1));
    const [modalShow, setModalShow] = useState(false);
    const foodItems = [
        { id: 1, name: 'ชื่ออาหาร 1', price: 50 },
        { id: 2, name: 'ชื่ออาหาร 2', price: 60 },
        { id: 3, name: 'ชื่ออาหาร 3', price: 70 }
    ];


    const handleQuantityChange = (index, delta) => {
        setQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];
            newQuantities[index] = Math.max(1, newQuantities[index] + delta);
            return newQuantities;
        });
    };

    return (
        <>
            <div className='box-list-food'>
                {foodItems.map((item, index) => (
                    <div className='list-food' key={item.id}>
                        <div className='item-food'>
                            <div className='box-thumbnail-name'>
                                <div className='box-img-food'>
                                    <Image src={defaultImage} fluid />
                                </div>
                                <span>ชื่ออาหาร</span>
                            </div>

                            {type !== "admin" ?
                                <div className='box-action-list'>
                                    <span>{item.price * quantities[index]}฿</span>
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
                                        <MdDelete size={25}/>
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