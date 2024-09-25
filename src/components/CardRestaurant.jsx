import Card from 'react-bootstrap/Card';
import defaultImage from '../assets/default_image.jpg';
import React, { useState } from "react";
import RatingReview from '../components/RatingReview';
import ModalRestaurant from '../components/ModalRestaurant';

import { FaLocationDot } from "react-icons/fa6";

import '../sass/cardRestaurant.scss';

function CardRestaurant() {
    const [rating, setRating] = useState(0);
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Card className='card-restaurant' onClick={() => setModalShow(true)}>
                <Card.Img variant="top" src={defaultImage} />
                <Card.Body>
                    <Card.Title>ชื่อร้าน</Card.Title>
                    <Card.Text className='d-flex align-items-center'><FaLocationDot size={25} />Location</Card.Text>
                    <hr />
                    <RatingReview rating={rating} setRating={setRating} />
                </Card.Body>
            </Card>
            <ModalRestaurant show={modalShow} onHide={() => setModalShow(false)} />
        </>


    );
}

export default CardRestaurant;
