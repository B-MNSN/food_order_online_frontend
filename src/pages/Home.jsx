import Navbars from '../components/Navbar';
import Image from 'react-bootstrap/Image';
import defaultImage from '../assets/default_image.jpg';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import CardRestaurant from '../components/CardRestaurant';

import '../sass/home.scss';

function Home() {
    const cards = Array.from({ length: 8 });

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
                        {cards.map((_, index) => (
                            <Col key={index} xs={12} md={6} lg={3} className="mb-4 d-flex justify-content-center">
                                <CardRestaurant />
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>

        </>
    );
}

export default Home;