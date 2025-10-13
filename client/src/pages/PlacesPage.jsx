import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Perks } from "../components/Perks"
import axios from "axios"
import { PhotosUploader } from "../components/PhotosUploader"

export const PlacesPage = () => {
    const {action} = useParams()
    const [title, setTitle] = useState("")
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")
    const [addedPhotos, setAddedPhotos] = useState("")
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState("")
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [maxGuests, setMaxGuests] = useState(1)

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    return (
        <div className="max-w-5xl mx-auto">
            {action !== "new" && (
                <div className="text-center">
                    <Link to={"/account/places/new"} className="inline-flex gap-1 bg-primary text-white px-6 py-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                        Add new place
                    </Link>
                </div>
            )}

            {action === "new" && (
                <div>
                    <form>
                        {preInput("Title", "Title your place. Should be short and catchy as in advertisement.")}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apt" />

                        {preInput("Address", "Address to this place.")}
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />

                        {preInput("Photos", "More = better.")}
                        
                        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                        {preInput("Description", "Description of the place.")}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />

                        {preInput("Perks", "Select all the perks of your place.")}
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            <Perks selected={perks} onChange={setPerks} />
                        </div>

                        {preInput("Extra info", "House rules, etc.")}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

                        {preInput("Check in&out times", "Add check in and out times, remember to have some time window for cleaning the room between guests.")}
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div>
                                <h3 className="mt-2 -mb-1">Check in time</h3>
                                <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="14" />
                            </div>

                            <div>
                                <h3 className="mt-2 -mb-1">Check out time</h3>
                                <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="11" />
                            </div>

                            <div>
                                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                                <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} />
                            </div>
                        </div>
                        
                        <button className="primary my-4">Save</button>
                    </form>
                </div>
            )}
        </div>
    )
}