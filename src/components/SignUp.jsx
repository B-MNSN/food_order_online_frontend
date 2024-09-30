import React, { useState }  from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FiUser } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import Swal from 'sweetalert2';
import axios from 'axios';

const SignUp = () => {
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);

        } else {
            try {
             
                const response = await axios.post('http://localhost:3000/auth/register', {
                    username,
                    email,
                    phoneNumber,
                    password,
                    role: 'customer'
                });

                if (response.status === 201) {
                    console.log(response);
                    Swal.fire({
                        title: response?.data?.message,
                        icon: "success",
                        confirmButtonText: "OK",
                    });

                    setValidated(false); 
                    setUsername('');
                    setEmail('');
                    setPhoneNumber('');
                    setPassword('');
                }
            } catch (error) {
                const iconType = error.response?.data?.icon === "warning" ? "warning" : "error";
                Swal.fire({
                    title: error.response?.data?.message ? error.response?.data?.message : 'Cannot Create Account',
                    icon: iconType,
                    confirmButtonText: "OK",
                });
            }
        }
    };

    const handChange = (fn) => {
        return (event) => { 
            fn(event.target.value);
        };
    };

    return (
        <>
            <h2 className='text-center'>Create your account</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mt-2 mb-3" controlId="signup-username">
                    <FiUser size={20} className='mx-2' />
                    <Form.Label className='fw-semibold'>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" required value={username} onChange={handChange(setUsername)}/>
                    <Form.Control.Feedback type="invalid">
                        Please enter username.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-2 mb-3" controlId="signup-email">
                    <MdOutlineEmail size={20} className='mx-2' />
                    <Form.Label className='fw-semibold'>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" required value={email} onChange={handChange(setEmail)}/>
                    <Form.Control.Feedback type="invalid">
                        Please enter email.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-2 mb-3" controlId="signup-phonnumber">
                    <FiUser size={20} className='mx-2' />
                    <Form.Label className='fw-semibold'>Phone number</Form.Label>
                    <Form.Control type="text" placeholder="Enter phone number" required value={phoneNumber} onChange={handChange(setPhoneNumber)}/>
                    <Form.Control.Feedback type="invalid">
                        Please enter phone number.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-2 mb-3" controlId="signup-pw">
                    <IoLockClosedOutline size={20} className='mx-2' />
                    <Form.Label className='fw-semibold'>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" required value={password} onChange={handChange(setPassword)}/>
                    <Form.Control.Feedback type="invalid">
                        Please enter password.
                    </Form.Control.Feedback>
                </Form.Group>
                
          
                <Button type='submit' variant="dark" className='d-block mx-auto'>Sign Up</Button>
            </Form>
        </>
    );
};

export default SignUp;