import { Link } from "react-router-dom"

export const RegisterPage = () => {
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center font-semibold mb-4">Register</h1>

                <form className="max-w-md mx-auto">
                    <input type="text" name="name" placeholder="John Doe" />
                    <input type="email" name="email" placeholder="your@email.com" />
                    <input type="password" name="password" placeholder="********" />

                    <button className="primary mt-4">Login</button>

                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link to={"/login"} className="underline text-black hover:text-primary transition-all">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}