import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import defaultImage from '../assets/default_image.jpg';
import RatingReview from '../components/RatingReview';
import { FaLocationDot } from "react-icons/fa6";
import FoodMenu from './FoodMenu';
import '../sass/modalRestaurant.scss'

function ModalRestaurant({ show, onHide, modalId}) {
    const [rating, setRating] = useState(0);

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
                    <FoodMenu/>
                </Modal.Body>
                
            </Modal>
        </>
    );
}

export default ModalRestaurant;