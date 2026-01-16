import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';

const Profile = () => {
    const [userData, setUserData] = useState({ name: '', email: '', hostel: '' });
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [newHostel, setNewHostel] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/profile', { 
            withCredentials: true,
            params: { email: new URLSearchParams(window.location.search).get('email') }
        })
        .then(response => {
            setUserData({
                name: response.data.name,
                email: response.data.email,
                hostel: response.data.hostel
            });
            setNewHostel(response.data.hostel); // Initialize newHostel with current hostel
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    const handlePasswordChange = (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('New passwords do not match.');
            return;
        }

        axios.post('http://localhost:3001/change-password', { email: userData.email, currentPassword, newPassword })
            .then(response => {
                setMessage('Password changed successfully!');
            })
            .catch(err => {
                setMessage('Error changing password.');
                console.log(err);
            });
    };

    const handleHostelChange = () => {
        axios.post('http://localhost:3001/update-hostel', { email: userData.email, hostel: newHostel })
            .then(response => {
                setUserData(prevData => ({ ...prevData, hostel: newHostel }));
                setMessage('Hostel updated successfully!');
            })
            .catch(err => {
                setMessage('Error updating hostel.');
                console.log(err);
            });
    };

    return (
        <div className="profile-container">
            <div className="profile-box">
                <h2 className="profile-heading">Profile</h2>
                <div className="user-info">
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Hostel:</strong> {userData.hostel}</p>
                </div>

                <h4 className="hostel-heading">Change Hostel</h4>
                <div className="form-field">
                    <label htmlFor="hostel" className="form-label"><strong>Select New Hostel</strong></label>
                    <select
                        id="hostel"
                        value={newHostel}
                        onChange={(event) => setNewHostel(event.target.value)}
                        className="form-control"
                    >
                        <option value="GH1">GH1</option>
                        <option value="GH2">GH2</option>
                        <option value="GH3">GH3</option>
                    </select>
                    <button type="button" onClick={handleHostelChange} className="btn-primary">Update Hostel</button>
                </div>

                <h4 className="password-heading">Change Password</h4>
                <form onSubmit={handlePasswordChange}>
                    <div className="form-field">
                        <label htmlFor="currentPassword" className="form-label"><strong>Current Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter Current Password"
                            className="form-control"
                            id="currentPassword"
                            onChange={(event) => setCurrentPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="newPassword" className="form-label"><strong>New Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter New Password"
                            className="form-control"
                            id="newPassword"
                            onChange={(event) => setNewPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="confirmPassword" className="form-label"><strong>Confirm New Password</strong></label>
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="form-control"
                            id="confirmPassword"
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary">Change Password</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default Profile;
