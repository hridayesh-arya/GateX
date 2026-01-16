import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Assuming you're using the same CSS file as before

function Signup() {
    const navigate = useNavigate();

    const redirectToUser = () => {
        navigate('/register');
    };
    const redirectToAdmin = () => {
        navigate('/register');
    };
    return (
        <div className="container">
            <h1>Sign Up</h1>
            <div className="options">
                <button className="admin-btn" onClick={redirectToAdmin}>Register as Admin</button>
                <button className="user-btn" onClick={redirectToUser}>Register as User</button>
            </div>
        </div>
    );
}

export default Signup;
