import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Location.css"
import { LocationContext } from "./LocationProvider"

export const LocationDetail = () => {
    const { locations, getLocationById } = useContext(LocationContext)
    const { locationId } = useParams()
    const [location, setLocation] = useState({ employees: [], animals: [] })
    const navigate = useNavigate()

    useEffect(() => {
        getLocationById(locationId)
            .then(location => setLocation(location))
    }, [locationId])

    return <>
        <div className="location">
            <button onClick={() => navigate(`/locations/edit/${location.id}`)}>
                Edit Location
            </button>
            <div className="location__name line__item">
                { location.name }
            </div>
            <div className="location__address line__item">
                { location.address }
            </div>
            <div className="location__employees line__item">
                Employees:
                <ul>
                    {
                        location.employees.map(employee => <li key={`employee--${employee.id}`}>{employee.name}</li>)
                    }
                </ul>
            </div>
            <div className="location__animals line__item">
                Animals in care:
                <ul>
                    {
                        location.animals.map(animal => <li key={`animal--${animal.id}`}>{animal.name}, <i>{animal.breed}</i></li>)
                    }
                </ul>
            </div>
        </div>
    </>
}