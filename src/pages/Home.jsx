import Navbars from '../components/Navbar';
import Image from 'react-bootstrap/Image';
import defaultImage from '../assets/default_image.jpg';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import CardRestaurant from '../components/CardRestaurant';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../sass/home.scss';

function Home() {
    const [ restaurantsData, setrestaurantsData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/restaurants');
                if (response.status === 200) {
                    setrestaurantsData(response.data)
                }
    
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();

    }, []);

    return (
        <>
            <Navbars />

            <div className='box-banner'>
                <Image src={defaultImage} fluid />
                <div className='box-title'>
                    <h2>Welcome to the website,</h2>
                    <h2>Food Order Online (FOODR) !!</h2>
                </div>
            </div>
            <Container>
                <div className='mt-5 box-restaurants'>
                    <h2>Restaurants</h2>
                    <Row className='mb-3'>
                  
                        {Array.isArray(restaurantsData) && restaurantsData?.map((data, index) => (
                            <Col key={data.id} xs={12} md={6} lg={3} className="mb-4 d-flex justify-content-center">
                                <CardRestaurant data_rest={data}/>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>

        </>
    );
}

export default Home;