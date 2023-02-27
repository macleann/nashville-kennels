import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LocationContext } from "../location/LocationProvider"
import { EmployeeContext } from "./EmployeeProvider"

export const EmployeeForm = () => {
    const { addEmployee } = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)

    const [employee, setEmployee] = useState({
        name: "",
        locationId: 0
    })

    const navigate = useNavigate()

    useEffect(() => {
        getLocations()
    }, [])

    const handleControlledInputChange = (evt) => {
        const newEmployee = {...employee}
        newEmployee[evt.target.id] = evt.target.value
        setEmployee(newEmployee)
    }

    const handleClickSaveEmployee = (evt) => {
        evt.preventDefault()

        const locationId = parseInt(employee.locationId)

        if (locationId === 0) {
            window.alert("Please select a location")
        } else {
            const newEmployee = {
                name: employee.name,
                locationId: locationId
            }

            addEmployee(newEmployee)
                .then(() => navigate("/employees"))
        }
    }

    return (
        <form className="employeeForm">
          <h2 className="employeeForm__title">New Employee</h2>
          <fieldset>
            <div className="form-group">
              <label htmlFor="name">Employee name:</label>
              <input type="text" id="name" required autoFocus className="form-control" placeholder="Employee name" value={employee.name} onChange={handleControlledInputChange} />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="location">Assign to location: </label>
              <select name="locationId" id="locationId" className="form-control" value={employee.locationId} onChange={handleControlledInputChange}>
                <option value="0">Select a location</option>
                {locations.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
          <button className="btn btn-primary" onClick={handleClickSaveEmployee}>
            Hire Employee
              </button>
        </form>
      )
}