import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LocationContext } from "./LocationProvider"

export const LocationForm = () => {
    const { addLocation } = useContext(LocationContext)

    const [location, setLocation] = useState({
        name: "",
        address: ""
    })

    const navigate = useNavigate()

    const handleControlledInputChange = (evt) => {
        const newLocation = {...location}
        newLocation[evt.target.id] = evt.target.value
        setLocation(newLocation)
    }

    const handleClickSaveLocation = (evt) => {
        evt.preventDefault()

        const newLocation = {
            name: location.name,
            address: location.address
        }

        addLocation(newLocation)
            .then(() => navigate("/locations"))
    }

    return (
        <form className="locationForm">
          <h2 className="locationForm__title">New Location</h2>
          <fieldset>
            <div className="form-group">
              <label htmlFor="name">Location name:</label>
              <input type="text" id="name" required autoFocus className="form-control" placeholder="Location name" value={location.name} onChange={handleControlledInputChange} />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="name">Location address:</label>
              <input type="text" id="address" required autoFocus className="form-control" placeholder="Location address" value={location.address} onChange={handleControlledInputChange} />
            </div>
          </fieldset>
          <button className="btn btn-primary" onClick={handleClickSaveLocation}>
            Add Location
              </button>
        </form>
      )
}