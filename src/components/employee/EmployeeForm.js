import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LocationContext } from "../location/LocationProvider";
import { EmployeeContext } from "./EmployeeProvider";

export const EmployeeForm = () => {
  const { addEmployee, getEmployeeById, updateEmployee } =
    useContext(EmployeeContext);
  const { locations, getLocations } = useContext(LocationContext);
  const [employee, setEmployee] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { employeeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getLocations().then(() => {
      if (employeeId) {
        getEmployeeById(employeeId).then((employee) => {
          setEmployee(employee);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  const handleControlledInputChange = (evt) => {
    const newEmployee = { ...employee };
    newEmployee[evt.target.id] = evt.target.value;
    setEmployee(newEmployee);
  };

  const handleClickSaveEmployee = (evt) => {
    evt.preventDefault();

    if (parseInt(employee.locationId) === 0) {
      window.alert("Please select a location");
    } else {
      setIsLoading(true);
      if (employeeId) {
        updateEmployee({
          id: employee.id,
          name: employee.name,
          locationId: parseInt(employee.locationId),
        }).then(() => navigate(`/employees/detail/${employee.id}`));
      } else {
        const newEmployee = {
          name: employee.name,
          locationId: parseInt(employee.locationId),
        };

        addEmployee(newEmployee).then(() => navigate("/employees"));
      }
    }
  };

  return (
    <form className="employeeForm">
      {employeeId ? (
        <h2 className="employeeForm__title">Update {employee.name}</h2>
      ) : (
        <h2 className="employeeForm__title">New Employee</h2>
      )}
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Employee name:</label>
          <input
            type="text"
            id="name"
            required
            autoFocus
            className="form-control"
            placeholder="Employee name"
            value={employee.name}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Assign to location: </label>
          <select
            name="locationId"
            id="locationId"
            className="form-control"
            value={employee.locationId}
            onChange={handleControlledInputChange}
          >
            <option value="0">Select a location</option>
            {locations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button
        className="btn btn-primary"
        disabled={isLoading}
        onClick={(evt) => {
          evt.preventDefault();
          handleClickSaveEmployee(evt);
        }}
      >
        {employeeId ? <>Save Employee</> : <>Hire Employee</>}
      </button>
    </form>
  );
};
