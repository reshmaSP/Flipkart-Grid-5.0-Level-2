import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css'; // Import your CSS file
import { Link } from 'react-router-dom';

function SignInPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/signin', formData);
            console.log(response.data); // Handle the response from the backend
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    return (
        <div className="signin-container">
            <form className="signin-form" onSubmit={handleSubmit}>
                <h2 className="signin-title">Sign In</h2>

                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
            
                <button type="submit" className="form-button">Sign In</button>
            
            </form>
        </div>
    );
}

export default SignInPage;
