import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { LocationContext } from "./LocationProvider"

export const LocationForm = () => {
    const { addLocation, getLocationById, updateLocation } = useContext(LocationContext)
    const [location, setLocation] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { locationId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      if (locationId) {
        getLocationById(locationId)
          .then(location => {
            setLocation(location)
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
      }
    }, [])

    const handleControlledInputChange = (evt) => {
        const newLocation = {...location}
        newLocation[evt.target.id] = evt.target.value
        setLocation(newLocation)
    }

    const handleClickSaveLocation = (evt) => {
        evt.preventDefault()
        setIsLoading(true)
        
        if (locationId) {
          updateLocation({
            id: location.id,
            name: location.name,
            address: location.address
          })
            .then(() => navigate(`/locations/detail/${location.id}`))
        } else {
          const newLocation = {
              name: location.name,
              address: location.address
          }

          addLocation(newLocation)
            .then(() => navigate("/locations"))
        }
    }

    return (
        <form className="locationForm">
          {
            locationId ?
            <h2 className="locationForm__title">Update {location.name} Location</h2> :
            <h2 className="locationForm__title">New Location</h2>
          }
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
          <button className="btn btn-primary"
            disabled={isLoading}
            onClick={(evt) => {
              evt.preventDefault()
              handleClickSaveLocation(evt)
          }}>
            {
              locationId ?
              <>Update Location</> :
              <>Add Location</>
            }
          </button>
        </form>
      )
}