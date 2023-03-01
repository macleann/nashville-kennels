import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Employee.css"
import { EmployeeContext } from "./EmployeeProvider"

export const EmployeeDetail = () => {
    const { employees, getEmployeeById } = useContext(EmployeeContext)
    const { employeeId } = useParams()
    const [employee, setEmployee] = useState({ location: {} })
    const navigate = useNavigate()

    useEffect(() => {
        getEmployeeById(employeeId)
            .then(employee => setEmployee(employee))
    }, [employeeId])

    return <>
        <div className="employee">
            <button onClick={() => navigate(`/employees/edit/${employee.id}`)}>
                Edit Employee
            </button>
            <header className="employee__header line__item">
                { employee.name }
            </header>
            <footer className="employee__footer line__item">
                Works at { employee.location.name }
            </footer>
        </div>
    </>
}