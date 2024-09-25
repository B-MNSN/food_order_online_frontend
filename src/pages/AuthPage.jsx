import React, { useState } from 'react';
import SignIn from '../components/SignIn';
import Button from 'react-bootstrap/Button';
import '../sass/authPage.scss';

function AuthPage() {

    return (
        <div className='box-auth'>
            <div className="sign-in-panel">
                <div className='box-form-signin'>
                    <SignIn/>
                </div>
                <div className='box-des'>
                    <h2>Hello, Friends</h2>
                    <h3>Enter your personanl details
                        and start journey with us</h3>
                    <Button variant="dark">Sign Up</Button>
                </div>
            </div>
        </div>

    );
}

export default AuthPage;