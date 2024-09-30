import Navbars from '../components/Navbar';
import CardRestaurant from '../components/CardRestaurant';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { FaSearch } from "react-icons/fa";

function Search() {
    const location = useLocation();
    const [results, setResults] = useState([]);

    const query = new URLSearchParams(location.search).get('search');

    useEffect(() => {
        const fetchData = async () => {
            if (query) {
                try {
                    const response = await axios.get(`http://localhost:3000/restaurants?search=${query}`);
                    if (response.status === 200) {
                        setResults(response.data);
                    }
                   
                } catch (error) {
                    console.error("Error fetching search results:", error);
                }
            }
        };

        fetchData();
    }, [query]);

    
    return (
        <>
            <Navbars />
            <div className='d-flex align-items-center mt-5 mb-4'>
                <FaSearch size={35} className='me-3'/>
                <h1>Search "{query}"</h1>
            </div>
            <Container>
                <div className=' box-restaurants'>
                    {results.length ? (
                        <>
                        <span className='fs-4'>ผลลัพธ์ทั้งหมด {results.length}</span>
                        <Row className='my-4'>
                    
                            {Array.isArray(results) && results?.map((data, index) => (
                                <Col key={data.id} xs={12} md={6} lg={3} className="mb-4 d-flex justify-content-center">
                                    <CardRestaurant data_rest={data}/>
                                </Col>
                            ))}
                        </Row>
                        </>
                        
                    ) : (
                        <>
                            <div className='d-flex align-items-center justify-content-center'>
                                <span className='fs-2 text-secondary'>ไม่พบการค้นหา "{query}"</span>
                            </div>
                        </>
                    )
                    }
                    
                </div>
            </Container>

        </>
    );
}

export default Search;