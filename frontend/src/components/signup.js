// import React, { useState } from 'react';
// import axios from 'axios';
// import '../css/Signup.css'; // Import your CSS file

// function SignUpForm() {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         phone: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('/signup', formData);
//             console.log(response.data); // Handle the response from the backend
//         } catch (error) {
//             console.error('Error submitting form:', error);
//         }
//     };

//     return (
//         <div className="signup-form-container">
//             <h2>Sign Up</h2>
//             <form onSubmit={handleSubmit} className="signup-form">
//                 <label>
//                     Name:
//                     <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//                 </label><br /><br />

//                 <label>
//                     Email:
//                     <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//                 </label><br /><br />

//                 <label>
//                     Password:
//                     <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//                 </label><br /><br />

//                 <label>
//                     Phone Number:
//                     <input type="tel" name="phone" pattern="[0-9]{10}" value={formData.phone} onChange={handleChange} required />
//                 </label><br /><br />

//                 <button type="submit">Sign Up</button>
//             </form>
//         </div>
//     );
// }

// export default SignUpForm;
import React, { useState } from 'react';
import axios from 'axios';
import '../css/Signup.css';
import { Link } from 'react-router-dom';

// Create an Axios instance with baseURL
const instance = axios.create({
    baseURL: 'http://localhost:5000', // Replace with your Flask backend URL
});

function SignUpForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
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
            const response = await instance.post('/signup', formData);
            console.log(response.data); // Handle the response from the backend
        } catch (error) {
            console.error('Error submitting form:', error);
        }

    };

    return (
        
        <div className="signup-form-container">
            
            <form onSubmit={handleSubmit} className="signup-form">
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label><br /><br />

                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label><br /><br />

                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label><br /><br />

                <label>
                    Phone Number:
                    <input type="tel" name="phone" pattern="[0-9]{10}" value={formData.phone} onChange={handleChange} required />
                </label><br /><br />
                
                <button type="submit" >Sign Up</button>
                
            </form>
        </div>
    );
}

export default SignUpForm;
