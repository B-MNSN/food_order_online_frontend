import Card from 'react-bootstrap/Card';
import defaultImage from '../assets/default_image.jpg';
import React, { useState } from "react";
import RatingReview from '../components/RatingReview';
import ModalRestaurant from '../components/ModalRestaurant';

import { FaLocationDot } from "react-icons/fa6";

import '../sass/cardRestaurant.scss';

function CardRestaurant({ data_rest }) {
    const [rating, setRating] = useState(data_rest?.rating);
    const [modalShow, setModalShow] = useState(false);
    const Address = `${data_rest?.subdistrict} ${data_rest?.district} ${data_rest?.province}`;
    data_rest = {
        ...data_rest,
        Address
    }

    return (
        <>
            <Card className='card-restaurant' onClick={() => setModalShow(true)}>
                <Card.Img variant="top" src={data_rest.restaurant_picture ? data_rest.restaurant_picture : defaultImage} />
                <Card.Body>
                    <Card.Title>{data_rest.restaurant_name}</Card.Title>
                    <Card.Text className='d-flex align-items-center'><FaLocationDot size={25} />{Address}</Card.Text>
                    <hr />
                    <RatingReview rating={rating} setRating={setRating} />
                </Card.Body>
            </Card>
            <ModalRestaurant show={modalShow} onHide={() => setModalShow(false)} data_rest={data_rest}/>
        </>


    );
}

export default CardRestaurant;
