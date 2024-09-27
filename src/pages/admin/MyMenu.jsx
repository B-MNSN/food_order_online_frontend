import Navbars from '../../components/Navbar';
import Image from 'react-bootstrap/Image';
import defaultImage from '../../assets/default_image.jpg';
import { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import FoodMenu from '../../components/FoodMenu';
import ModalFormFood from '../../components/ModalFormFood';
import { FaPlus } from "react-icons/fa";


import '../../sass/home.scss';

function MyMenu() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Navbars />

            <div className='box-banner'>
                <Image src={defaultImage} fluid />
                <div className='box-title'>
                    <h2>Welcome</h2>
                    <h2>Restaurant owners !!</h2>
                </div>
            </div>
            <Container>
                <div className='mt-5 box-restaurants'>
                    <div className='d-flex align-items-center justify-content-between mb-3'>
                        <h2>My Menu</h2>
                        <Button variant="dark" className='d-flex align-items-center' onClick={() => setModalShow(true)}><FaPlus size={15} className='me-2'/>Add Menu</Button>

                    </div>
               
                    <Row className='mb-3'>
                        <FoodMenu type="admin"/>
                    </Row>
                </div>
            </Container>
            <ModalFormFood show={modalShow} onHide={() => setModalShow(false)} type={'add'}/>
        </>
    );
}

export default MyMenu;