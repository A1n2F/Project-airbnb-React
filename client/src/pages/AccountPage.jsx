import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom"
import axios from "axios"

export const AccountPage = () => {
    const [redirect, setRedirect] = useState(null)
    const {ready, user, setUser} = useContext(UserContext)

    let {subpage} = useParams()

    if(subpage === undefined) {
        subpage = "profile"
    }

    async function logout() {
        await axios.post("/logout")
        setRedirect("/")
        setUser(null)
    }

    if(!ready) {
        return "Loading..."
    }

    if(ready && !user && !redirect) {
        return (
            <Navigate to={"/login"} />
        )
    }

    function linkClasses(type=null) {
        let classes = "px-6 py-2"

        if(type === subpage) {
            classes += " bg-primary text-white rounded-full"
        }

        return classes
    }
    
    if(redirect) {
        return (
            <Navigate to={redirect} />
        )
    }

    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                <Link to={"/account"} className={linkClasses("profile")}>My profile</Link>
                <Link to={"/account/bookings"} className={linkClasses("bookings")}>My bookings</Link>
                <Link to={"/account/places"} className={linkClasses("places")}>My accommodations</Link>
            </nav>

            {subpage === "profile" && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email}) <br />
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
        </div>
    )
}