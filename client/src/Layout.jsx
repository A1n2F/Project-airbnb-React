import { Outlet } from "react-router-dom"
import { Header } from "./components/Header"

export const Layout = () => {
    return (
        <div className="px-8 py-4 flex flex-col min-h-screen">
            <Header />

            <Outlet />
        </div>
    )
}