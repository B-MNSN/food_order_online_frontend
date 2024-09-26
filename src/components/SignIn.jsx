import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FiUser } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";

const SignIn = () => {
    return (
        <>
            <h2 className='text-center'>Sign In to <br/> Food Order Online</h2>
            <Form>
                <Form.Group className="mt-3 mb-4" controlId="signin-email">
                    <FiUser size={20} className='mx-2'/>
                    <Form.Label className='fw-semibold'>Email or Username</Form.Label>
                    <Form.Control type="email" placeholder="Email or Username" />
                </Form.Group>
                <Form.Group className="mb-4" controlId="signin-pw">
                    <IoLockClosedOutline size={20} className='mx-2'/>
                    <Form.Label className='fw-semibold'>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="link" className='d-block mx-auto'>For got your password?</Button>
                <hr/>
                <Button variant="dark" className='d-block mx-auto'>Sign In</Button>
            </Form>
        </>

    );
};

export default SignIn;
