import axios from "axios"
import { useContext } from "react"
import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { UserContext } from "../UserContext.jsx"

export const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)

    const {setUser} = useContext(UserContext)
    
    async function handleLoginSubmit(event) {
        event.preventDefault()

        try {
            const {data} = await axios.post("/login", {email, password})
            setUser(data)
            alert("Login successful.")
            
            setRedirect(true)
        } catch (error) {
            alert("Login failed.", error)
        }
    }

    if (redirect) {
        return <Navigate to={"/"} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center font-semibold mb-4">Login</h1>

                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
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

                    <button className="primary mt-4">Login</button>

                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet? <Link to={"/register"} className="underline text-black hover:text-primary transition-all">Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}