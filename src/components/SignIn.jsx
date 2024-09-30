import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FiUser } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";
import Swal from 'sweetalert2';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const SignIn = () => {
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();

        } else {
            try {
                const response = await axios.post('http://localhost:3000/auth/login', {
                    username,
                    password,
                });

                if (response.status === 200) {
                    const token = response?.data?.token;
                    sessionStorage.setItem('token', status);
                    let role = '';
                    if (token) {
                        const decoded = jwtDecode(token);
                        role = decoded.role;
                        if (role === 1) {
                            window.location.href = '/admin/home';

                        } else {
                            window.location.href = '/home';
                        }
                    }
                }
            } catch (e) {
                Swal.fire({
                    title: e.response.data.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }

        }

        setValidated(true);
    };

    const handChange = (fn) => {
        return (event) => {
            fn(event.target.value);
        };
    };

    return (
        <>
            <h2 className='text-center'>Sign In to <br /> Food Order Online</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mt-3 mb-3" controlId="signin-email">
                    <FiUser size={20} className='mx-2' />
                    <Form.Label className='fw-semibold'>Email or Username</Form.Label>
                    <Form.Control type="text" placeholder="Email or Username" required value={username}  onChange={handChange(setUsername)} />
                    <Form.Control.Feedback type="invalid">
                        Please enter email or username.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="signin-pw">
                    <IoLockClosedOutline size={20} className='mx-2' />
                    <Form.Label className='fw-semibold'>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required value={password}  onChange={handChange(setPassword)} />
                    <Form.Control.Feedback type="invalid">
                        Please enter password.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="link" className='d-block mx-auto'>For got your password?</Button>
                <hr />
                <Button type="submit" variant="dark" className='d-block mx-auto'>Sign In</Button>
            </Form>
        </>

    );
};

export default SignIn;
