import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';  // Importing the CSS file

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [favoritePet, setFavoritePet] = useState('');  // State for favorite pet
    const [hostel, setHostel] = useState('');  // State for hostel
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3001/register', { name, email, password, favoritePet, hostel })  // Send hostel info
            .then(result => {
                if (result.data === "Already registered") {
                    alert("E-mail already registered! Please Login to proceed.");
                    navigate('/login');
                } else {
                    alert("Registered successfully! Please Login to proceed.");
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="register-container">  {/* Matches the background container */}
            <div className="register-box">  {/* Matches the box styling */}
                <h2 className='login-heading'>Register</h2>  {/* Matches the heading style */}
                <form onSubmit={handleSubmit}>
                    <div className="form-field text-start">  {/* Matches form field styling */}
                        <label htmlFor="exampleInputname" className="form-label">
                            <strong>Name</strong>
                        </label>
                        <input 
                            type="text"
                            placeholder="Enter Name"
                            className="form-control" 
                            id="exampleInputname" 
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-field text-start">  {/* Matches form field styling */}
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
                    <div className="form-field text-start">  {/* Matches form field styling */}
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            <strong>Password</strong>
                        </label>
                        <input 
                            type="password" 
                            placeholder="Enter Password"
                            className="form-control" 
                            id="exampleInputPassword1" 
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-field text-start">  {/* Matches form field styling */}
                        <label htmlFor="favoritePet" className="form-label">
                            <strong>Your School Name</strong>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Enter School Name"
                            className="form-control" 
                            id="favoritePet" 
                            onChange={(event) => setFavoritePet(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-field text-start">  {/* Matches form field styling */}
                        <label htmlFor="hostel" className="form-label">
                            <strong>Select Hostel</strong>
                        </label>
                        <select 
                            id="hostel" 
                            className="form-control" 
                            value={hostel} 
                            onChange={(event) => setHostel(event.target.value)}
                            required
                        >
                            <option value="">Select Hostel</option>
                            <option value="GH1">GH1</option>
                            <option value="GH2">GH2</option>
                            <option value="GH3">GH3</option>
                        </select>
                    </div>
                    <button type="submit" className="register-btn">Register</button>  {/* Matches button styling */}
                </form>

                <p className="container my-2">Already have an account?</p>
                <Link to='/login' className="login-link">Login</Link>  {/* Matches link styling */}
            </div>
        </div>
    );
}

export default Register;
