import {create} from "zustand"
import axios from 'axios'

const authStore = create((set) => ({

    loggedIn: null,

    loginForm: {
        email: "",
        password: "",
    },

    signupForm: {
        email: "",
        password: "",
    }, 

    updateSignupForm: (e) => {
        const {name, value} = e.target

        set(state => {
            return{ 
                signupForm: {
                    ...state.signupForm,
                    [name]: value,
                },
            };
        })
    },

    updateLoginForm: (e) => {
        const {name, value} = e.target

        set(state => {
            return{ 
                loginForm: {
                    ...state.loginForm,
                    [name]: value,
                },
            };
        })
    },
    login: async(e) => {

        try {
            const {loginForm} = authStore.getState();
    
            const res = await axios.post("/user/login", loginForm)
            
            set({loggedIn: true,
                loginForm:{
                    email: '',
                    password: '',
                }})

        } catch (error) {
            console.log(error)
        }
    },

    checkAuth: async() => {
        try {
            await axios.get('/check-auth')
            set({loggedIn: true})
        } catch (error) {
            set({loggedIn: false})
        }
    },

    signup: async() =>{
    
        try {
            const { signupForm } = authStore.getState()
    
            const res = await axios.post("/user/signup", signupForm)
    
            set({
                signupForm:{
                    email: '',
                    password: '',
                },
            })
        } catch (error) {
            console.log(error)
        }
    },
    
    logout: async() => {

        await axios.get('/user/logout')
        set({loggedIn: false})
    }
}))

export default authStore