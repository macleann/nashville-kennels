import { createContext, useState } from "react";

export const EmployeeContext = createContext()

export const EmployeeProvider = (props) => {
    const [employees, setEmployees] = useState([])

    const getEmployees = () => {
        return fetch(`http://localhost:8088/employees?_expand=location`)
            .then(response => response.json())
            .then(setEmployees)
    }

    const addEmployee = (employeeObj) => {
        return fetch(`http://localhost:8088/employees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeObj)
        })
            .then(getEmployees)
    }

    return (
        <EmployeeContext.Provider value={ {employees, getEmployees, addEmployee} }>
            {props.children}
        </EmployeeContext.Provider>
    )
}