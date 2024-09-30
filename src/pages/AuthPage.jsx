import React, { useState } from 'react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Button from 'react-bootstrap/Button';
import '../sass/authPage.scss';

function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false); 

    return (
        <div className='box-auth'>
            <div className={isSignUp ? "sign-up-panel" : "sign-in-panel"}>
                <div className='box-form'>
                    {isSignUp ? <SignUp /> : <SignIn />}
                </div>
                <div className='box-des'>
                    <h2>{isSignUp ? "Welcome back!" : "Hello, Friends"}</h2>
                    <h3>
                        {isSignUp 
                        ? "To keep connected with us, please login with your personal info" 
                        : "Enter your personal details and start your journey with us"}
                    </h3>
                    <Button variant="dark" onClick={() => setIsSignUp(!isSignUp)}>
                        {isSignUp ? "Sign In" : "Sign Up"}
                    </Button>
                </div>
            </div>
        </div>

    );
}

export default AuthPage;