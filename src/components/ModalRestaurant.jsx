import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import defaultImage from '../assets/default_image.jpg';
import RatingReview from '../components/RatingReview';
import { FaLocationDot } from "react-icons/fa6";
import { TiPlus } from "react-icons/ti";
import { TiMinus } from "react-icons/ti";
import { MdAddShoppingCart } from "react-icons/md";
import '../sass/modalRestaurant.scss'

function ModalRestaurant({ show, onHide, modalId}) {
    const [rating, setRating] = useState(0);
    const [quantities, setQuantities] = useState(Array(3).fill(1));
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
            <Modal
                show={show}
                onHide={onHide}
                backdrop="static"
                keyboard={false}
                size="xl"
                className='modal-restaurant'
            >
                <Modal.Header closeButton>
                    <Modal.Title>ชื่อร้านอาหาร</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={defaultImage} fluid className='thumbnail-restaurant'/>
                    <div className='d-flex justify-content-between align-items-center mt-4'>
                        <div className='d-flex flex-column'>
                            <span className='d-flex align-items-center mb-2'><FaLocationDot size={25} />Location</span>
                            <RatingReview rating={rating} setRating={setRating} />
                        </div>
                        <div className='d-flex flex-column align-items-end'>
                            <span className='mb-2'>เวลาเปิด-ปิด</span>
                            <span>09:00 AM - 18:00 PM</span>
                        </div>
                    </div>
                    <hr/>
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
                                <div className='box-action-list'>
                                    <span>{item.price * quantities[index]}฿</span>
                                    <div className='box-qty-food'>
                                        <Button
                                            variant="dark"
                                            onClick={() => handleQuantityChange(index, -1)}
                                            disabled={quantities[index] === 1} 
                                        >
                                            <TiMinus/>
                                        </Button>
                                        <span>{quantities[index]}</span>
                                        <Button variant="dark" onClick={() => handleQuantityChange(index, 1)}><TiPlus/></Button>
                                    </div>
                                    <Button variant="dark"><MdAddShoppingCart className='me-2'/>Add to cart</Button>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </Modal.Body>
                
            </Modal>
        </>
    );
}

export default ModalRestaurant;