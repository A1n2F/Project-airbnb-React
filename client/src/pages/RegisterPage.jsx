import axios from "axios"

import { useState } from "react"
import { Link } from "react-router-dom"

export const RegisterPage = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function registerUser(event) {
        event.preventDefault()

        try {
            await axios.post("/register", {
                name,
                email,
                password
            })
            
            alert("Registration successful. Now you can log in")
        } catch (error) {
            alert("Registration failed. Please try again later.", error)            
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center font-semibold mb-4">Register</h1>

                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="John Doe" 
                        value={name} 
                        onChange={event => setName(event.target.value)}
                    />

                    <input 
                        type="email" 
                        name="email" 
                        placeholder="your@email.com" 
                        value={email} 
                        onChange={event => setEmail(event.target.value)}
                    />

                    <input 
                        type="password" 
                        name="password" 
                        placeholder="********"  
                        value={password} 
                        onChange={event => setPassword(event.target.value)}
                    />

                    <button className="primary mt-4">Register</button>

                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link to={"/login"} className="underline text-black hover:text-primary transition-all">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}