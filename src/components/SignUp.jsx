import React, { useState }  from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FiUser } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

const SignUp = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };
    return (
        <>
            <h2 className='text-center'>Create your account</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mt-2 mb-3" controlId="signup-username">
                    <FiUser size={20} className='mx-2' />
                    <Form.Label className='fw-semibold'>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" required/>
                    <Form.Control.Feedback type="invalid">
                        Please enter username.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-2 mb-3" controlId="signup-email">
                    <MdOutlineEmail size={20} className='mx-2' />
                    <Form.Label className='fw-semibold'>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" required/>
                    <Form.Control.Feedback type="invalid">
                        Please enter email.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-2 mb-3" controlId="signup-phonnumber">
                    <FiUser size={20} className='mx-2' />
                    <Form.Label className='fw-semibold'>Phone number</Form.Label>
                    <Form.Control type="text" placeholder="Enter phone number" required/>
                    <Form.Control.Feedback type="invalid">
                        Please enter phone number.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-2 mb-3" controlId="signup-pw">
                    <IoLockClosedOutline size={20} className='mx-2' />
                    <Form.Label className='fw-semibold'>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" required/>
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