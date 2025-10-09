import { Link } from "react-router-dom"

export const LoginPage = () => {
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center font-semibold mb-4">Login</h1>

                <form className="max-w-md mx-auto">
                    <input type="email" name="email" placeholder="your@email.com" />
                    <input type="password" name="password" placeholder="********" />

                    <button className="primary mt-4">Login</button>

                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet? <Link to={"/register"} className="underline text-black hover:text-primary transition-all">Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}