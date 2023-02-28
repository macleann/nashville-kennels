import { useContext, useEffect } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"
import { Link, useNavigate } from "react-router-dom"

export const LocationList = () => {
    const { locations, getLocations } = useContext(LocationContext)
    const navigate = useNavigate()

    useEffect(() => {
        getLocations()
    }, [])

    return <>
        <h2>Locations</h2>
        <button onClick={
            () => navigate("/locations/add")
        }>
            Add Location
        </button>
        <section className="locations">
        {
            locations.map(location => {
            return <Link to={`/locations/detail/${location.id}`} key={`location--${location.id}`} className="location">{location.name}</Link>
            })
        }
        </section>
    </>
}