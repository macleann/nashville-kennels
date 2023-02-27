import { useContext, useEffect } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"
import { useNavigate } from "react-router-dom"

export const EmployeeList = () => {
    const { employees, getEmployees } = useContext(EmployeeContext)
    const navigate = useNavigate()

    useEffect(() => {
        getEmployees()
    }, [])

    return <>
        <h2>Employees</h2>
        <button onClick={
            () => navigate("/employees/hire")
        }>
            Hire Employee
        </button>
        <section className="employees">
        {
            employees.map(employee => {
            return (
                <div className="employee" key={`employee--${employee.id}`}>
                    <header className="employee__header line__item">
                        { employee.name }
                    </header>
                    <footer className="employee__footer line__item">
                        Works at { employee.location.name }
                    </footer>
                </div>
            )
            })
        }
        </section>
    </>
}