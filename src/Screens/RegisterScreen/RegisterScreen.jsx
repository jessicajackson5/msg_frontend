import React, {useState} from 'react';
import './RegisterScreen.css';
import LOCALSTORAGE_KEYS from '../../constants/localstorage'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/authService'

const RegisterScreen = () => {

        const [form_state, setFormState] = useState({name: '', email: '', password: ''});
        const handleSubmit = async (event) => {
            try{
                // We don't want the page to reload
                event.preventDefault()
                // Handle form submission
                console.log('The form was submitted')
                // Capture the values in the form
                console.log(form_state)
                // Send the values to my API using FETCH
                const server_response_http = await fetch(
                    `http://localhost:3000/api/users/login`,
                    {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                            name: form_state.name,
                            email: form_state.email,
                            password: form_state.password
                            }
                        )
                    }
                )
                const server_response_data = await server_response_http.json()
                console.log(server_response_data)
            }
            catch(error){
                alert("An error occurred")
                console.error("An error occured in the login form", error)
            }
        }
        const handleChange = (event) =>{
            const value = event.target.value
            const field_name = event.target.name
            setFormState(
                (prevFormState) => {
                    return {
                        ...prevFormState,
                        [field_name]: value
                    }
                }
            )
            console.log({value, field_name})
        }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Enter your name.</label>
                    <input 
                        id='name' 
                        name='name' 
                        placeholder='Jane Doe' 
                        type='text' 
                        value={form_state.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Enter your email.</label>
                    <input 
                        id='email' 
                        name='email' 
                        placeholder='fool@gmail.com' 
                        type='email' 
                        value={form_state.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor = 'password'>Enter your password.</label>
                    <input 
                        id='password' 
                        name='password' 
                        type='password'
                        value={form_state.password}
                    />
                </div>
                <button type = 'submit'>Register account</button>
            </form>
        </div>
    );
};
export default RegisterScreen;