import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ForgotPassword.css';  // Importing the CSS file

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [favoritePet, setFavoritePet] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:3001/forgot-password', { email, favoritePet, newPassword })
            .then(result => {
                if (result.data === "Password updated") {
                    alert('Password updated successfully!');
                    navigate('/login');
                } else {
                    alert('Incorrect favorite pet! Please try again.');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container-bg">  {/* Matches the container styling */}
            <div className="form-container">  {/* Matches the form container styling */}
                <h2 className="form-heading">Forgot Password</h2>  {/* Matches the heading styling */}
                <form onSubmit={handleSubmit}>
                    <div className="form-field text-start">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            <strong>Email Id</strong>
                        </label>
                        <input 
                            type="email" 
                            placeholder="Enter Email"
                            className="form-control" 
                            id="exampleInputEmail1" 
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-field text-start">
                        <label htmlFor="favoritePet" className="form-label">
                            <strong>Your Favorite Pet</strong>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Enter Your Favorite Pet"
                            className="form-control" 
                            id="favoritePet" 
                            onChange={(event) => setFavoritePet(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-field text-start">
                        <label htmlFor="newPassword" className="form-label">
                            <strong>New Password</strong>
                        </label>
                        <input 
                            type="password" 
                            placeholder="Enter New Password"
                            className="form-control" 
                            id="newPassword" 
                            onChange={(event) => setNewPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Update Password</button>  {/* Matches button styling */}
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
