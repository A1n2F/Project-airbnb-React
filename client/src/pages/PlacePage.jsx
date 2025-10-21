import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { BookingWidget } from "../components/BookingWidget"
import { PlaceGallery } from "../components/PlaceGallery"
import { AddressLink } from "../components/AddressLink"

export const PlacePage = () => {
    const {id} = useParams()
    const [place, setPlace] = useState(null)

    useEffect(() => {
        if(!id) {
            return
        }

        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data)
        })
    }, [id])

    if(!place) {
        return ""
    }

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl">{place.title}</h1>
                
                <AddressLink>{place.address}</AddressLink>

                <PlaceGallery place={place} />
            </div>
            
            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr] max-w-7xl mx-auto">
                <div>
                    <div className="my-4">
                        <h2 className="text-2xl font-semibold">Description</h2>
                        {place.description}
                    </div>
                    Check-in: {place.checkIn}<br/>
                    Check-out: {place.checkOut}<br/>
                    Max number of guests: {place.maxGuests}
                </div>

                <div>
                    <BookingWidget place={place} />
                </div>
            </div>

            <div className="bg-white -mx-8 px-8 py-8 border-t border-gray-300">
                <div className="max-w-7xl mx-auto">
                    <div>
                        <h2 className="text-2xl font-semibold">Extra info</h2>
                    </div>
                    <div className="mb-4 mt-2 text-gray-700 leading-5">{place.extraInfo}</div>
                </div>
            </div>

        </div>
    )
}