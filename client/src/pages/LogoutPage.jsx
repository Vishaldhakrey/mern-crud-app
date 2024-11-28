import React, { useEffect } from 'react'
import authStore from '../stores/AuthStore'

const LogoutPage = () => {

    const store = authStore();

    useEffect(()=> {
        store.logout()
    }, [])
    
    return (
        <div>
            <h1>You are now Logged out</h1>
        </div>
    )
}

export default LogoutPage