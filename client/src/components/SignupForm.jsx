import React from 'react'
import authStore from '../stores/AuthStore'
import { useNavigate } from 'react-router-dom'

const SignupForm = () => {
    
    const store = authStore()
    const navigate = useNavigate()

    const handleSignup = async(e) => {
        e.preventDefault()
        store.signup()
        navigate('/login');
    };
    
    return (
        <form onSubmit={handleSignup}>
            <input
                onChange={store.updateSignupForm}
                value={store.signupForm.email}
                type="email"
                name="email"
            />
            <input
                onChange={store.updateSignupForm}
                value={store.signupForm.password}
                type="password"
                name="password"
            />
            <button type="submit">SignUp</button>
        </form>
    )
}

export default SignupForm