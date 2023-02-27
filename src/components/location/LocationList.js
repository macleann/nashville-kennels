import { useContext, useEffect } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"
import { useNavigate } from "react-router-dom"

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
            return (
                <div className="location" key={`location--${location.id}`}>
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
            )
            })
        }
        </section>
    </>
}