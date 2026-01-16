import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css';  // Importing the CSS file


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                if (result.data === "Success") {
                    alert('Login successful!');
                    navigate(`/profile?email=${email}`); // Pass the email to Profile
                } else {
                    alert('Incorrect password! Please try again.');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="login-container">  {/* Matches the background container */}
            <div className="login-box">  {/* Matches the box styling */}
                <h2 className="login-heading">Login</h2>  {/* Matches the heading style */}
                <form onSubmit={handleSubmit}>
                    <div className="form-field text-start">  {/* Matches form field styling */}
                        <label htmlFor="exampleInputEmail1" className="form-label"><strong>Email</strong></label>
                        <input 
                            type="email"
                            placeholder="Enter Email"
                            className="form-control"
                            id="exampleInputEmail1"
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-field text-start">  {/* Matches form field styling */}
                        <label htmlFor="exampleInputPassword1" className="form-label"><strong>Password</strong></label>
                        <input 
                            type="password"
                            placeholder="Enter Password"
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>  {/* Matches button styling */}
                </form>
                <p className="mt-3">
                    <Link to="/Forgetpassword" className="link-text">Forgot Password?</Link>  {/* Matches link styling */}
                </p>
                <p className="container my-2">Don't have an account?</p>
                <Link to='/register' className="login-btn">Register</Link>  {/* Matches button styling */}
            </div>
        </div>
    );
};

export default Login;
