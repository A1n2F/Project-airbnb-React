import { Link } from "react-router-dom"
import { AccountNav } from "../components/AccountNav"
import { useEffect, useState } from "react"
import axios from "axios"

export const PlacesPage = () => {
    const [places, setPlaces] = useState([])

    useEffect(() => {
        axios.get("/places").then(({data}) => {
            setPlaces(data)
        })
    }, [])

    return (
        <div className="max-w-5xl mx-auto">
            <AccountNav />

            <div className="text-center">
                <Link to={"/account/places/new"} className="inline-flex gap-1 bg-primary text-white px-6 py-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    Add new place
                </Link>

                <div className="">
                    {places.length > 0 && places.map(place => (
                        <div>
                            {place.title}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}